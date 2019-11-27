const profileModel = require('../models/profileModel');

exports.loginPage = (req, res) => {
    res.render('loginPage', {layout: 'signUp'});
}

exports.notLoggedIn = (req, res) => {
    res.render('loginPage', {layout: 'signUp', err:'Login First'});
}

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
        res.render('loginPage', {layout: 'signUp', err: "Password Did not match"})
    }
}

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
    res.render('homePage', {layout: 'signUp'});
}

exports.registerPage = (req, res) => {
    res.render('registerPage', {layout: 'signUp'});
}

exports.register = (req, res) => {
    profileModel.registerUser(req.body, req.session.userId)
        .then(() => {
            res.redirect(301, '/homePage');
        })
        .catch((err) => {
            console.log(err)
        })
}