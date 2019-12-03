const profileModel = require('../models/profileModel');

//from '/'. First thing user needs to do is to login and/or signup to set req.session.userId
exports.loginPage = (req, res) => {
    res.render('loginPage');
}

//from anywhere if req.session.userId was undefined, ridrectLogin brings it back to loginPage
exports.notLoggedIn = (req, res) => {
    res.render('loginPage', { err:'Login First'});
}
//from POST /signup.  Creates user and then login right away to set session id for registration
exports.signUp = (req, res) => {
    const user = req.body;
    if(req.body.password === req.body.confirm_pass) {
        profileModel.createUser(user)
            .then(()=> {
                //create user in db and login in right away to set req.session.userId
                profileModel.login(user)
                    .then(([data, fieldData]) => {
                        if (data[0] && data[0][0] && data[0][0].ID) {
                            req.session.userId = data[0][0].ID
                        }
                        res.redirect(301, `/registerPage`);
                    })
            })
            .catch((err)=>{
                console.log(err)
                res.redirect(403, '/');
            })
    } else {
        res.render('loginPage', { err: "Password Did not match"})
    }
}
//from POST /login. Finds user in db via email/password, if user exists, set session id, else display "wrong pass or email"
exports.login = (req, res) => {
    profileModel.login(req.body)
        .then( ([data,fieldData]) => {
            if (data[0] && data[0][0] && data[0][0].ID) {
                // SET REQ.SESSION.USERID AS CURRENT USER
                req.session.userId = data[0][0].ID;
                //IF DATABASE HAS USER AND MATCHING PASSOWRD, IMPLEMENT REDIRECT TO /mainPage/:id
                res.redirect('/homePage');
            } else {
                res.render('loginPage', {layout: 'signUp', err: 'Wrong password or email'})
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.homePage = (req, res) => {
    //can access userId from session to make calls to db.  Can also store any states into session via req.session.anything = anything we want
    res.render('homePage', {layout: 'signUp'});
}

exports.registerPage = (req, res) => {
    res.render('registerPage', {layout: 'signUp'});
}
//from POST /register.  Updates user info to complete registeration.
exports.register = (req, res) => {
    profileModel.registerUser(req.body, req.session.userId)
        .then(() => {
            res.redirect(301, '/homePage');
        })
        .catch((err) => {
            console.log(err)
        })
}