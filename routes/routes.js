const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');

router.get('/homePage/:id', profileController.serveProfile);

module.exports = router;
