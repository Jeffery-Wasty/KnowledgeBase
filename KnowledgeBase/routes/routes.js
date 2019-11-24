let express = require('express');
let router = express.Router();
const ctrl = require('../controller/discussionAndPostController');

router.get('/', ctrl.getRoot);
router.get('/getTopics', ctrl.getTopics);
router.get('/getTopic', ctrl.getTopic);
router.get('/getAllDiscussions', ctrl.getAllDiscussions);
router.get('/getAllDiscussionsWithSearch', ctrl.getAllDiscussionsWithSearch);
router.post('/getPostsForDiscussion', ctrl.getPostsForDiscussion);
router.post('/createDiscussion', ctrl.createDiscussion);

router.post('/createPost', ctrl.createPost);


module.exports = router;