const profileModel = require('../models/profileModel');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel.js');

exports.serveProfile = (req, res) => {
  let userData;
  let id = req.params.id;
  let user = profileModel.findUser(id);

  user.then(data => {
    userData = {
      ID: data[0][0].ID,
      FIRST_NAME: data[0][0].FIRST_NAME,
      LAST_NAME: data[0][0].LAST_NAME,
      COUNTRY: data[0][0].COUNTRY,
      ABOUT: data[0][0].ABOUT,
      PROFILE_IMAGE_URL: data[0][0].PROFILE_IMAGE_URL
    };
    res.render('profile', {
      pageTitle: 'User Profile',
      userCSS: true,
      header: true,
      UserData: userData
    });
  });
};
