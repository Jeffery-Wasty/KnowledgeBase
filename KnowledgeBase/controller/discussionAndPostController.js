let db = require('../model/discussionAndPostModel');
/*
exports.addDisucssion = async (req, res) => {
    console.log("addPost")
    res.redirect(301,'/')
    //res.render('artists', {artist: true, pageTitle: 'Artists'});
    //res.send(await artistModel.getArtists(req.query.name));
    //res.render('leaderboard');
    //db.execute()
}
*/

exports.getRoot = async (req, res) => {
    console.log((await db.getAllDiscussions())[0][0]);
    //return(await db.getTopics())
    db.getTopics().then(([data,metadata])=>{
        console.log("IN get topics");
        let topics = data;
        db.getAllDiscussions().then(([data,metadata])=>{
            let discussions = data;
            console.log("In get discussions");
            res.render('main-layout', {dicussions: discussions, topics: topics})
        })
    });

}

exports.getTopics = async (req, res) => {

    db.getTopics()
    .then(([data, metadata]) => {
        res.render('main-layout.hbs')
    });
}

exports.getTopics = async (req, res) => {
    //res.render('viewname', {ex1: xx, ex2: yy})
    //res.send(await db.getTopics());
    //console.log("getTopicsCtrl");
    console.log(await db.getTopics())
    return(await db.getTopics());
    //return("john");
    //res.render('main-layout.hbs', {topics: await db.getTopics()});
}

exports.getTopic = async (req, res) => {
    //topic id
    //should also be render
    //res.send(await db.getTopic(req.body.id));
}

exports.getAllDiscussions = async (req, res) => {
    //should also be render
    //res.send(await db.getAllDiscussions());
}
exports.getAllDiscussionsWithSearch = async (req, res) => {
    //topic, search, both are optional
    //TODO how should i handle if topic or string search?
    //should also be render
    //res.send(await db.getAllDiscussionsWithSearch(req.body.topic, req.body.search));
}
exports.getPostsForDiscussion = async (req, res) => {
    //should also be render
    //res.send(await db.getPostsForDiscussion(req.body.id))
}
exports.createDiscussion = async (req, res) => {
    //user id, topic id, discussion subject, discussion body
    res.send(await db.createDiscussion(req.body.userID, req.body.topicID, req.body.subject, req.body.body))
    //res.redirect?
}
exports.createPost = async (req, res) => {
    //user id, discussion id, post body
    res.send(await db.createPost(req.body.userID, req.body.discussionID, req.body.body))
    //res.redirect?
}
