let discPostModel = require('../models/discussionAndPostModel');
/*
exports.addDisucssion = async (req, res) => {
    console.log("addPost")
    res.redirect(301,'/')
    //res.render('artists', {artist: true, pageTitle: 'Artists'});
    //res.send(await artistModel.getArtists(req.query.name));
    //res.render('leaderboard');
    //discPostModel.execute()
}
*/

exports.getRoot = (req, res) => {
    //console.log((await discPostModel.getAllDiscussions())[0][0]);
    //return(await discPostModel.getTopics())
    discPostModel.getTopics().then(([data,metadata])=>{
        let topics = data[0];
        //[0] = table, [0][0] = table, row, [0][0][0] = id
        discPostModel.getAllDiscussions().then(([data,metadata])=>{
            let discussions = data[0];
            //console.log(discussions);
            res.render('main-layout', {dicussions: discussions, topics: topics})
        })
    });

}

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
    //TODO fix re-rendering of main layout do conditionals or something else
    await discPostModel.getPostsForDiscussion(req.body.discussionID).then(([data,metadata])=>{
        let posts = data[0];
        discPostModel.getDiscussion(req.body.discussionID).then(([data, metadata])=>{
            let discussion = data[0];
            res.render('discussionAndPostView', {posts: posts, discussions: discussion, discCSS: true})
        })
    })
}
exports.createDiscussion = async (req, res) => {
    await discPostModel.createDiscussion(req.session.userId, req.body.topicID, req.body.discussionSubject, req.body.discussionBody)
    res.redirect(301, '/homePage')
}
exports.createPost = async (req, res) => {
    console.log(req.session.userId, req.body.discussionID, req.body.postBody);
    await discPostModel.createPost(req.session.userId, req.body.discussionID, req.body.postBody);
    //res.render('/getPostsForDiscussion');
}
