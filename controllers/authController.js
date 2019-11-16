exports.loginPage = (req, res) => {
    res.render('login', {layout: 'signUp'});
}

exports.signUp = (req, res) => {
    //POST to user table with ID to add new user
    //redirect with user ID to register page to complete user registration
    res.redirect(301, '/register');
}

exports.login = (req, res) => {
    // check login credentials with database, redirect to home if successful
    res.redirect(301, '/homePage');
}

exports.register = (req, res) => {
    //get user ID from req.param to POST additional info for that user
    res.render('register', {layout: 'signUp'});
}