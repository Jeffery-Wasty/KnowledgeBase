const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const msgController = require('../controllers/msgController');
const profileController = require('../controllers/profileController');

//redirectLogin Middleware
//if user is not logged in (!req.session.userId), all routes using this middleware will redirect user to login
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/notLoggedIn');
    //res.render('loginPage', {layout: 'signUp',err: 'Login First'})
  } else {
    next();
  }
};

/**Login and Sign Up routes**/
router.get('/', authController.loginPage);
router.get('/notLoggedIn', authController.notLoggedIn);
router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.get('/registerPage', redirectLogin, authController.registerPage);
router.post('/register', authController.register);
//router.get('/:id', profileController.serve);

router.get('/messagePage', redirectLogin, msgController.messagePage);
router.post('/conversation/start', msgController.startConversation);
router.get('/conversationPage', redirectLogin, msgController.conversationPage);
router.get('/messages/get', redirectLogin, msgController.getMessages);
router.post('/message/send', msgController.sendMessage);

router.get('/homePage/:id', profileController.serveProfile);
router.get('/profile/posts/:id', profileController.profileAllPosts);

module.exports = router;
