const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const msgController = require('../controllers/msgController');
const profileController = require('../controllers/profileController');
const disccussionController = require('../controllers/discussionAndPostController');
const homeController = require('../controllers/homeController');
const searchController = require('../controllers/searchController');

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
//Middleware to logout when logout button clicked
const logout = (req, res) => {
  if (req.session.userId) {
    req.session.userId = undefined;
  }
  res.redirect('/');
};

router.get('/', authController.loginPage);
router.get('/notLoggedIn', authController.notLoggedIn);
router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.get('/registerPage', redirectLogin, authController.registerPage);
router.post('/register', authController.register);

//router.get('/:id', profileController.serve);

/**Home Page routes **/
router.get('/homePage', redirectLogin, homeController.homePage);
router.post('/logout', logout);
router.get('/search', searchController.searchWithString);
router.post('/searchByTopic', searchController.searchWithTopic);
router.post(
  '/discussionPagination',
  redirectLogin,
  homeController.discussionPagination
);

/**Profile **/
router.get('/profile/:id', redirectLogin, profileController.serveProfile);
router.get('/profile/:id/edit', redirectLogin, profileController.editProfile);
router.post(
  '/profile/:id',
  redirectLogin,
  profileController.increaseAndServeProfile
);

/**Post and Discussion Routes **/
router.post(
  '/getPostsForDiscussion',
  disccussionController.getPostsForDiscussion
);
router.post('/createDiscussion', disccussionController.createDiscussion);
router.post('/createPost', disccussionController.createPost);

/** Live messaging  **/
router.get('/messagePage', redirectLogin, msgController.messagePage);
router.post('/conversation/start', msgController.startConversation);
router.get('/conversationPage', redirectLogin, msgController.conversationPage);
router.get('/messages/get', redirectLogin, msgController.getMessages);
router.post('/message/send', msgController.sendMessage);

module.exports = router;
