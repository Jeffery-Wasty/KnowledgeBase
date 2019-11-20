const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
//const profileController = require('../controllers/profileController');

//Session token verification (still testing it to work)
// verify = (req, res, next) => {
//     const token = req.headers['session-token'];
//     console.log(req.header);
//     if (!token) return res.status(401).send('Access Denied, login first')
    
//     try {
//         console.log(token)
//         const verified = jwt.verify(token, 'secret_thing');
//         req.user=verified;
//         next();
//     } catch (err) {
//         res.status(400).send('Invalid Token')
//     }
// }

/**Login and Sign Up routes**/
router.get('/', authController.loginPage);
router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.get('/registerPage/:id', authController.registerPage);
router.post('/register', authController.register)

//router.get('/:id', profileController.serve);

module.exports = router;