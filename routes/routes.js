const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//const profileController = require('../controllers/profileController');

/**Login and Sign Up routes**/
router.get('/', authController.loginPage);
router.post('/signUp', authController.signUp);
router.post('login', authController.login);
router.get('/register', authController.register);

//router.get('/:id', profileController.serve);

module.exports = router;