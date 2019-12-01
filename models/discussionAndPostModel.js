const db = require('../Database/databaseConnection.js');
var fs = require('fs');
const util = require('util');
//Get topics can be called without id for whole table or with id for specific, whole table for drop down to create discussion
//with id for getting that discussions topic or by searching

exports.getTopics = async () => {
    return(db.query('CALL GET_TOPICS(NULL);'));
}
exports.getTopic = async () => {
    //CALL GET_TOPICS(ID);
    return(db.query('CALL GET_TOPICS(id);'));
}

exports.getDiscussion = async (discussionID) =>{
    return(db.query('CALL GET_DISCUSSION('+ discussionID +')'));
}

exports.getAllDiscussions = async () => {
    //CALL GET_ALL_DISCUSSIONS()
    return(db.query('CALL GET_ALL_DISCUSSIONS();'))
}

exports.getAllDiscussionsWithSearch = async () => {
    //CALL GET_DISCUSSIONS_WITH_SEARCH(NULL, 'hello');, NULL = TOPIC, 'helo' = USER INPUT
    //First param = NULL = search by string, second param null = search by topic
    return(db.query('CALL GET_TOPICS(NULL);'))
}

exports.getPostsForDiscussion = async (discussionID) => {
    return(db.query('CALL GET_POSTS_FOR_DISCUSSION('+ discussionID +')'));
}

exports.createDiscussion = async (userID, topicID, discussionBody, discussionSubject) => {
    return(db.query('CALL CREATE_DISCUSSION(' + userID + ',' + topicID + ',\'' + discussionBody + '\',\''+ discussionSubject + '\')'));
}

exports.createPost = async (userID, discussionID, postBody) => {
    return(db.query('CALL CREATE_POST(' + userID + ',' + discussionID + ',\'' + postBody +'\')'));
}

exports.getDiscussionByPage = (page) => {
    return(db.query(`CALL GET_DISCUSSIONS(${page}, 3)`));
}