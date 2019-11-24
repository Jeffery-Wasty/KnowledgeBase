let express = require('express');
let router = express.Router();
const ctrl = require('../controller/discussionAndPostController');

//router.post('/addPost', dnpController.addPost);

//router.post('/addDiscussion', dnpController.addDiscussion);

//router.get('/searchByTopic', dnpController.searchByTopic);
/*
router.get('/createDB', function(req,res){
    console.log("in routes")
    dnpController.createDB()}
    );*/

//router.post('/test', dnpController.test());

router.get('/', ctrl.getRoot);
router.get('/getTopics', ctrl.getTopics);
router.get('/getTopic', ctrl.getTopic);
router.get('/getAllDiscussions', ctrl.getAllDiscussions);
router.get('/getAllDiscussionsWithSearch', ctrl.getAllDiscussionsWithSearch);
router.get('/getPostsForDiscussion', ctrl.getPostsForDiscussion);
router.post('/createDiscussion', ctrl.createDiscussion);

router.post('/createPost', ctrl.createPost);


module.exports = router;