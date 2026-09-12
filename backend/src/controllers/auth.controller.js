const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inscription d'une nouvelle Clinique et de son Admin principal
async function registerClinicAndAdmin(req, res) {
  try {
    const { clinicName, adminName, email, password, phone, address } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (prisma) => {
      const clinic = await prisma.clinic.create({
        data: {
          name: clinicName,
          phone,
          address,
          subscriptionStatus: 'TRIAL'
        }
      });

      const user = await prisma.user.create({
        data: {
          name: adminName,
          email,
          passwordHash
        }
      });

      await prisma.userClinic.create({
        data: {
          userId: user.id,
          clinicId: clinic.id,
          role: 'ADMIN_CLINIC'
        }
      });

      return { clinic, user };
    });

    res.status(201).json({ 
      success: true, 
      message: "Clinique et compte administrateur créés avec succès !",
      data: result 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Connexion d'un utilisateur (Login)
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        clinics: {
          include: { clinic: true }
        }
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    if (user.clinics.length === 0) {
      return res.status(403).json({ error: "Aucun établissement rattaché à ce compte." });
    }

    const activeClinicConnection = user.clinics[0];
    
    if (activeClinicConnection.clinic.subscriptionStatus === 'SUSPENDED') {
      return res.status(403).json({ error: "L'abonnement de cette clinique est suspendu." });
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        clinicId: activeClinicConnection.clinicId, 
        role: activeClinicConnection.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: activeClinicConnection.role,
        clinic: activeClinicConnection.clinic
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { registerClinicAndAdmin, login };
