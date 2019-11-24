const pool = require('../Database/databaseConnection.js');
var fs = require('fs');
const util = require('util');
//Get topics can be called without id for whole table or with id for specific, whole table for drop down to create discussion
//with id for getting that discussions topic or by searching

exports.getTopics = async () => {
    return(await pool.promise().query('CALL GET_TOPICS(NULL);'));
}
exports.getTopic = async () => {
    //CALL GET_TOPICS(ID);
    return(await pool.promise().query('CALL GET_TOPICS(id);'));
}

exports.getAllDiscussions = async () => {
    //CALL GET_ALL_DISCUSSIONS()
    return(await pool.promise().query('CALL GET_ALL_DISCUSSIONS();'))
}

exports.getAllDiscussionsWithSearch = async () => {
    //CALL GET_DISCUSSIONS_WITH_SEARCH(NULL, 'hello');, NULL = TOPIC, 'helo' = USER INPUT
    //First param = NULL = search by string, second param null = search by topic
    return(await pool.promise().query('CALL GET_TOPICS(NULL);'))
}

exports.getPostsForDiscussion = async () => {
    //CALL GET_POSTS_FOR_DISCUSSION(1), 1 = DISCUSSION_ID
    return(await pool.promise().query('CALL GET_POSTS_FOR_DISCUSSION(ID);'))
}

exports.createDiscussion = async () => {
    /*
    CALL CREATE_DISCUSSION(1, 0, 'A ridiculously awesome title', 'A very short body');
SET @USER_ID = 1;
SET @TOPIC_ID = 0;
SET @TITLE = 'A ridiculously awesome title';
SET @BODY = 'A very short body';*/
    return(await pool.promise().query('CALL CREATE_DISCUSSION(1,0,\'A ridiculously awesome title for Oliver\\\'s test\', \'A very short body\');'));
}

exports.createPost = async () => {
    /*
    CALL CREATE_POST(1, 1, 'A random sadhlgashdglasdjg post body');

SET @USER_ID = 1;
SET @DISCUSSION_ID = 1;
SET @POST_BODY = 'A random sadhlgashdglasdjg post body';
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM POSTS), (SELECT MAX(ID) + 1 FROM POSTS), 0));*/
    return(await pool.promise().query('CALL CREATE_POST(1,0, A very short  POST body'));
}


exports.test = async function test(){
    let tables = await pool.promise().query('SHOW TABLES');
    console.log(tables[0]);
    await pool.promise().query((await util.promisify(fs.readFile)('./Database/testStoredProcedures.sql')).toString());
    console.log('Example call of stored procedure: ');
    console.log(await pool.promise().query('CALL GET_TOPICS(NULL);'));
    console.log('Example call of stored procedure with double indexing to 0: ');
    console.log((await pool.promise().query('CALL GET_TOPICS(NULL);'))[0][0]);
    console.log('Example call of stored procedure with column extraction: ');
    let data = await pool.promise().query('CALL GET_TOPICS(NULL);')
    console.log('ID: ' + data[0][0][0].ID + ', Topic: ' + data[0][0][0].TOPIC);
}


async function addDummyData(){
    return(await pool.promise().query((await util.promisify(fs.readFile)('./Database/dummyData.sql')).toString()));
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