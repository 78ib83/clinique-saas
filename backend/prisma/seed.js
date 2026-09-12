const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Créer une clinique de test
  const clinic = await prisma.clinic.create({
    data: {
      name: 'Clinique Centrale de Bamako',
      phone: '+22300000000',
      address: 'Avenue de l\'Indépendance',
      subscriptionStatus: 'ACTIVE'
    }
  });

  // Créer l'utilisateur admin rattaché à cette clinique
  const user = await prisma.user.create({
    data: {
      name: 'Dr. Ibrahima',
      email: 'admin@clinique.com',
      passwordHash: hashedPassword,
      clinics: {
        create: {
          clinicId: clinic.id,
          role: 'ADMIN_CLINIC'
        }
      }
    }
  });

  console.log('Données de test injectées avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });