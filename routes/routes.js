const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');

router.get('/homePage/:id', profileController.serveProfile);
router.get('/profile/posts/:id', profileController.profileAllPosts);

module.exports = router;
