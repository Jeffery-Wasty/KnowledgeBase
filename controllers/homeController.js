const profileModel = require('../models/profileModel');
let discPostModel = require('../models/discussionAndPostModel');
const discussionModal = require('../models/discussionAndPostModel');
const msgModel = require('../models/msgModel');

exports.homePage = async (req, res) => {
  //always reset to page 1 for discussions returning home
  req.session.page = 0;
  let id = req.session.userId;
  let userData, discussionsData, topicsData;
  let postCount, likeCount, msgsCount;

  try {
    let user = await profileModel.findUser(id);
    let discussions = await discPostModel.getDiscussionByPage(req.session.page);
    let topics = await discPostModel.getTopics();
    let user_discussions = await discussionModal.getUsersDiscussions(id);
    let likes = await profileModel.fetchLikes(id);
    let conversations = await msgModel.get_user_conversations(id)

    postCount = user_discussions[0][0].length;
    likeCount = likes[0].length;
    msgsCount = conversations[0][0].length;
    userData = user[0][0];
    discussionsData = discussions[0][0];
    topicsData = topics[0][0];

    res.render('homePage', {
      pageTitle: 'Home Page',
      userCSS: true,
      discCSS: true,
      header: true,
      sideCSS: true,
      noPosts: postCount,
      noLikes: likeCount,
      noMsg: msgsCount, //Replace with actual count fetch like above.
      UserData: userData,
      discussions: discussionsData,
      topics: topicsData
    });
  } catch (error) {
    console.log(error);
    //if any of the awaiting data failed to be fetched, go back to login page
    res.redirect('/notLoggedIn');
  }
};

exports.homePageForUser = async (req, res) => {
  //always reset to page 1 for discussions returning home
  req.session.page = 0;
  let id = req.session.userId;
  let userData, discussionsData, topicsData;
  let postCount, likeCount, msgsCount;

  try {
    let user = await profileModel.findUser(id);
    let topics = await discPostModel.getTopics();
    let user_discussions = await discussionModal.getUsersDiscussions(id);
    let likes = await profileModel.fetchLikes(id);
    let conversations = await msgModel.get_user_conversations(id)


    postCount = user_discussions[0][0].length;
    likeCount = likes[0].length;
    msgsCount = conversations[0][0].length;
    userData = user[0][0];
    discussionsData = user_discussions[0][0];
    topicsData = topics[0][0];

    res.render('userHomePage', {
      pageTitle: 'Home Page',
      userCSS: true,
      discCSS: true,
      header: true,
      sideCSS: true,
      noPosts: postCount,
      noLikes: likeCount,
      noMsg: msgsCount,
      UserData: userData,
      discussions: discussionsData,
      topics: topicsData
    });
  } catch (error) {
    console.log(error);
    //if any of the awaiting data failed to be fetched, go back to login page
    res.redirect('/notLoggedIn');
  }
};

exports.discussionPagination = async (req, res) => {
  req.session.page = req.session.page + 3;
  let id = req.session.userId;
  let userData, discussionsData, topicsData;
  let postCount, likeCount, msgsCount;

  try {
    let user = await profileModel.findUser(id);
    let discussions = await discPostModel.getDiscussionByPage(req.session.page);
    let user_discussions = await discussionModal.getUsersDiscussions(id);
    let topics = await discPostModel.getTopics();
    let likes = await profileModel.fetchLikes(id);
    let conversations = await msgModel.get_user_conversations(id)

    userData = user[0][0];
    postCount = user_discussions[0][0].length;
    likeCount = likes[0].length;
    msgsCount = conversations[0][0].length;
    discussionsData = discussions[0][0];
    topicsData = topics[0][0];

    res.render('homePage', {
      pageTitle: 'Home Page',
      userCSS: true,
      discCSS: true,
      header: true,
      sideCSS: true,
      noPosts: postCount,
      noLikes: likeCount,
      noMsg: msgsCount,
      UserData: userData,
      discussions: discussionsData,
      topics: topicsData
    });
  } catch (error) {
    console.log(error);
    //if any of the awaiting data failed to be fetched, go back to login page
    res.redirect('/notLoggedIn');
  }
};

exports.sendEdit = async (req, res) => {
  profileModel.editUser(req.body, req.session.userId);
  res.redirect('/homePage');
};
