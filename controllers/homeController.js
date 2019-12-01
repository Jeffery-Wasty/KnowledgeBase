const profileModel = require('../models/profileModel');
let discPostModel = require('../models/discussionAndPostModel');

exports.homePage = async (req, res) => {
    //always reset to page 1 for discussions returning home
    req.session.page = 0;
    let id = req.session.userId;
    let userData, discussionsData, topicsData;
    try {
        let user = await profileModel.findUser(id);
        let discussions = await discPostModel.getDiscussionByPage(req.session.page);
        let topics = await discPostModel.getTopics();
        
        userData = user[0][0];
        discussionsData = discussions[0][0];
        topicsData = topics[0][0];
        res.render('homePage', {
            pageTitle: 'Home Page',
                userCSS: true,
                discCSS: true,
                header: true,
                sideCSS: true,
                UserData: userData,
                discussions: discussionsData,
                topics: topicsData
        });
    } catch(error){
        console.log(error)
        //if any of the awaiting data failed to be fetched, go back to login page
        res.redirect('/notLoggedIn')
    }
}

exports.discussionPagination = async (req,res) => {
    req.session.page = req.session.page + 3;
    let id = req.session.userId;
    let userData, discussionsData, topicsData;
    try {
        let user = await profileModel.findUser(id);
        let discussions = await discPostModel.getDiscussionByPage(req.session.page);
        let topics = await discPostModel.getTopics();
        
        userData = user[0][0];
        discussionsData = discussions[0][0];
        topicsData = topics[0][0]
        
        res.render('homePage', {
            pageTitle: 'Home Page',
                userCSS: true,
                discCSS: true,
                header: true,
                sideCSS: true,
                UserData: userData,
                discussions: discussionsData,
                topics: topicsData
        });
    } catch(error){
        console.log(error)
        //if any of the awaiting data failed to be fetched, go back to login page
        res.redirect('/notLoggedIn')
    }
}
