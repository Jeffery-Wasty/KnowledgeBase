let discPostModel = require('../models/discussionAndPostModel');


exports.getTopics = async (req, res) => {

    discPostModel.getTopics()
    .then(([data, metadata]) => {
        res.render('main-layout.hbs')
    });
}

exports.getTopics = async (req, res) => {
    //res.render('viewname', {ex1: xx, ex2: yy})
    //res.send(await discPostModel.getTopics());
    //console.log("getTopicsCtrl");
    //console.log(await discPostModel.getTopics())
    return(await discPostModel.getTopics());
    //return("john");
    //res.render('main-layout.hbs', {topics: await discPostModel.getTopics()});
}

exports.getTopic = async (req, res) => {
    //topic id
    //should also be render
    //res.send(await discPostModel.getTopic(req.body.id));
}

exports.getAllDiscussions = async (req, res) => {
    //should also be render
    //res.send(await discPostModel.getAllDiscussions());
}
exports.getAllDiscussionsWithSearch = async (req, res) => {
    //topic, search, both are optional
    //TODO how should i handle if topic or string search?
    //should also be render
    //res.send(await discPostModel.getAllDiscussionsWithSearch(req.body.topic, req.body.search));
}
exports.getPostsForDiscussion = async (req, res) => {
    await discPostModel.getPostsForDiscussion(req.body.discussionID).then(([data,metadata])=>{
        let posts = data[0];
        discPostModel.getDiscussion(req.body.discussionID).then(([data, metadata])=>{
            let discussion = data[0];
            res.render('discussionAndPostView', {posts: posts, discussions: discussion, discCSS: true, header: true})
        })
    })
}
exports.createDiscussion = async (req, res) => {
    await discPostModel.createDiscussion(req.session.userId, req.body.topicID, req.body.discussionSubject, req.body.discussionBody)
    res.redirect(301, '/homePage')
}
exports.createPost = async (req, res) => {
    await discPostModel.createPost(req.session.userId, req.body.discussionID, req.body.postBody);
}
