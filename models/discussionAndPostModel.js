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
    console.log('CALL GET_POSTS_FOR_DISCUSSION('+ discussionID +')');
    return(db.query('CALL GET_POSTS_FOR_DISCUSSION('+ discussionID +')'));
}

exports.createDiscussion = async (userID, topicID, discussionBody, discussionSubject) => {
    return(db.query('CALL CREATE_DISCUSSION(' + userID + ',' + topicID + ',\'' + discussionBody + '\',\''+ discussionSubject + '\')'));
}

exports.createPost = async () => {

    return(db.query('CALL CREATE_POST(1,0, A very short  POST body'));
}


exports.test = async function test(){
    let tables = db.query('SHOW TABLES');
    console.log(tables[0]);
    db.query((await util.promisify(fs.readFile)('./Database/testStoredProcedures.sql')).toString());
    console.log('Example call of stored procedure: ');
    console.log(db.query('CALL GET_TOPICS(NULL);'));
    console.log('Example call of stored procedure with double indexing to 0: ');
    console.log((db.query('CALL GET_TOPICS(NULL);'))[0][0]);
    console.log('Example call of stored procedure with column extraction: ');
    let data = db.query('CALL GET_TOPICS(NULL);')
    console.log('ID: ' + data[0][0][0].ID + ', Topic: ' + data[0][0][0].TOPIC);
}


async function addDummyData(){
    return(db.query((await util.promisify(fs.readFile)('./Database/dummyData.sql')).toString()));
}
/*
module.exports = {
    getTopics: getTopics,
    getTopic : getTopic,
    getAllDiscussions: getAllDiscussions,
    getAllDiscussionsWithSearch: getAllDiscussionsWithSearch,
    getPostsForDiscussion: getPostsForDiscussion,
    createPost: createPost,
    createDiscussion: createDiscussion
}*/