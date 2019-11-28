const profileModel = require('../models/profileModel');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel.js');

exports.serveProfile = (req, res) => {
  let userData;
  let id = req.params.id;
  let numPost;

  let user = profileModel.findUser(id);

  user.then(data => {
    console.log(data);

    // userData = {
    //   id: rows[0].ID,
    //   fname: rows[0].FIRST_NAME,
    //   lname: rows[0].LAST_NAME,
    //   country: rows[0].COUNTRY,
    //   about: rows[0].ABOUT,
    //   imageUrl: rows[0].PROFILE_IMAGE_URL
    // };
  });

  //   userData = {
  //     ID: '123',
  //     FIRST_NAME: 'Kevin',
  //     LAST_NAME: 'Hudson',
  //     COUNTRY: 'Canada',
  //     ABOUT: 'Team lead | Part time singer | Full time dad',
  //     PROFILE_IMAGE_URL: 'https://randomuser.me/api/portraits/med/men/1.jpg'
  //   };
  //   res.render('profile', {
  //     pageTitle: 'User Profile',
  //     userCSS: true,
  //     header: true,
  //     UserData: userData
  //   });
};
