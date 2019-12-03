let discPostModel = require('../models/discussionAndPostModel');

exports.getTopics = async (req, res) => {
    return(await discPostModel.getTopics());
}
exports.getPostsForDiscussion = async (req, res) => {
    let discussionID = req.query.discussionID;
    await discPostModel.getPostsForDiscussion(discussionID).then(([data,metadata])=>{
        let posts = data[0];
        discPostModel.getDiscussion(discussionID).then(([data, metadata])=>{
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
    await discPostModel.createPost(req.session.userId, req.body.discussionID, req.body.postBody).then(([data, metadata])=> {
        res.redirect(301, '/discussionAndPostView?discussionID=' +req.body.discussionID)
    })
}

exports.reloadDiscussions = async (req, res) => {
    let discussionID = req.query.discussionID;
    await discPostModel.getPostsForDiscussion(discussionID).then(([data,metadata])=>{
        let posts = data[0];
        discPostModel.getDiscussion(discussionID).then(([data, metadata])=>{
            let discussion = data[0];
            res.render('discussionAndPostView', {posts: posts, discussions: discussion, discCSS: true})
        })
    })
}
