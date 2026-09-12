const express = require('express');
const router = express.Router();
const { registerClinicAndAdmin, login } = require('../controllers/auth.controller');

router.post('/register-clinic', registerClinicAndAdmin);
router.post('/login', login);

module.exports = router;
