const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//redirectLogin Middleware
//if user is not logged in (!req.session.userId), all routes using this middleware will redirect user to login
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/notLoggedIn');
        //res.render('loginPage', {layout: 'signUp',err: 'Login First'})
    } else {
        next();
    }
}

/**Login and Sign Up routes**/
router.get('/', authController.loginPage);
router.get('/notLoggedIn', authController.notLoggedIn)
router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.get('/registerPage', redirectLogin, authController.registerPage);
router.post('/register', authController.register)
router.get('/homePage', redirectLogin, authController.homePage)

//router.get('/:id', profileController.serve);

module.exports = router;