const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController2');

// Authentication endpoint
router.post('/auth', authenticationController.authenticateUser);

module.exports = router;
