const profileModel = require('../models/profileModel');

exports.loginPage = (req, res) => {
    res.render('loginPage', {layout: 'signUp'});
}

exports.signUp = (req, res) => {
    const user = req.body;
    if(req.body.password === req.body.confirm_pass) {
        //using random int as ID
        user.id = Math.floor(Math.random()*100000000)
        profileModel.createUser(user)
            .then(()=> {
                //pass user.id to /register to insert more data into that user using id
                res.redirect(301, `/registerPage/${user.id}`);
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
        .then( ([data, fieldData]) => {
            if (data[0] && req.body.password === data[0].PASSWORD) {
                //IF DATABASE HAS USER AND MATCHING PASSOWRD, IMPLEMENT REDIRECT TO /mainPage/:id
                res.render('loginPage', {layout: 'signUp', user: data[0], wrongPass: 'Logged in'});
            } else {
                res.render('loginPage', {layout: 'signUp', wrongPass: 'Wrong password'})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    // check login credentials with database, redirect to home if successful
}

exports.registerPage = (req, res) => {
    res.render('registerPage', {layout: 'signUp', id: req.params.id});
}

exports.register = (req, res) => {
    profileModel.registerUser(req.body)
        .then(() => {
            res.redirect(301, '/');
        })
        .catch((err) => {
            console.log(err)
        })
}