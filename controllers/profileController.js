const profileModel = require('../models/profileModel');
const discussionModal = require('../models/discussionAndPostModel');
let discPostModel = require('../models/discussionAndPostModel');

exports.serveProfile = async (req, res) => {
  let id = req.params.id;
  let sessionId = req.session.userId;
  let postCount, likeCount;
  let userData, likeData, discussionsData;
  let alreadyLiked, canLike;

  let user = await profileModel.findUser(id);
  let posts = await discussionModal.getUsersDiscussions(id);
  let likes = await profileModel.fetchLikes(id);
  let fetchLiked = await profileModel.fetchAlreadyLiked(id, sessionId);
  let discussions = await discPostModel.getUsersDiscussions(id);

  userData = user[0][0];
  postCount = posts[0][0].length;
  likeCount = likes[0].length;
  discussionsData = discussions[0][0];

  likeData = {
    LIKE_COUNT: likeCount
  };

  alreadyLiked = fetchLiked[0].length > 0;
  canLike = !(id == sessionId || alreadyLiked);

  res.render('profile', {
    pageTitle: 'User Profile',
    userCSS: true,
    discCSS: true,
    header: true,
    postCount: postCount,
    discussions: discussionsData,
    UserData: userData,
    likeSingular: likeCount == 1,
    canLike: canLike,
    likes: likeData
  });
};

exports.increaseAndServeProfile = async (req, res) => {
  let id = req.params.id;
  let sessionId = req.session.userId;
  let postCount, likeCount;
  let userData, likeData, discussionsData;
  let alreadyLiked, canLike;

  let user = await profileModel.findUser(id);
  let posts = await discussionModal.getUsersDiscussions(id);
  let discussions = await discPostModel.getUsersDiscussions(id);
  await profileModel.saveLikes(id, sessionId);
  let likes = await profileModel.fetchLikes(id);
  let fetchLiked = await profileModel.fetchAlreadyLiked(id, sessionId);

  userData = user[0][0];
  postCount = posts[0][0].length;
  likeCount = likes[0].length;
  discussionsData = discussions[0][0];

  likeData = {
    LIKE_COUNT: likeCount
  };

  alreadyLiked = fetchLiked[0].length > 0;
  canLike = !(id == sessionId || alreadyLiked);

  res.render('profile', {
    pageTitle: 'User Profile',
    userCSS: true,
    discCSS: true,
    header: true,
    postCount: postCount,
    discussions: discussionsData,
    UserData: userData,
    likeSingular: likeCount == 1,
    canLike: canLike,
    likes: likeData
  });
};

exports.editProfile = (req, res) => {
  let userData;
  let discussionData;
  let postCount;
  let likeData;

  let id = req.params.id;
  let sessionId = req.session.userId;
  let user = profileModel.findUser(id);
  let posts = discussionModal.getUsersDiscussions(id);
  let likes = profileModel.fetchLikes(id);

  user.then(data => {
    userData = {
      ID: data[0][0].ID,
      FIRST_NAME: data[0][0].FIRST_NAME,
      LAST_NAME: data[0][0].LAST_NAME,
      COUNTRY: data[0][0].COUNTRY,
      ABOUT: data[0][0].ABOUT,
      PROFILE_IMAGE_URL: data[0][0].PROFILE_IMAGE_URL
    };
    posts.then(p_data => {
      discussionData = {};
      postCount = p_data[0].length;

      for (let data in p_data[0]) {
        discussionData[data] = p_data[0][data];
      }
      likes.then(l_data => {
        let likeCount = l_data[0].length;
        likeData = {
          LIKE_COUNT: likeCount
        };
        profileModel.fetchAlreadyLiked(id, sessionId).then(a_l_data => {
          let alreadyLiked = a_l_data[0].length > 0;
          let canLike = !(id == sessionId || alreadyLiked);

          res.render('editProfile', {
            pageTitle: 'User Profile',
            userCSS: true,
            discCSS: true,
            header: true,
            sideCSS: true,
            postCount: postCount,
            discussions: discussionData,
            UserData: userData,
            likeSingular: likeCount == 1,
            canLike: canLike,
            likes: likeData
          });
        });
      });
    });
  });
};

exports.profileAllPosts = (req, res) => {
  let userData;
  let id = req.params.id;
  let user = profileModel.findUser(id);

  user.then(data => {
    userData = {
      ID: data[0][0].ID,
      FIRST_NAME: data[0][0].FIRST_NAME,
      LAST_NAME: data[0][0].LAST_NAME,
      PROFILE_IMAGE_URL: data[0][0].PROFILE_IMAGE_URL,
      ABOUT: data[0][0].ABOUT
    };
    res.render('home', {
      UserData: userData,
      Posts: data,
      userCSS: true,
      header: true,
      sideCSS: true,
      userValidated: true
    });
  });
};
