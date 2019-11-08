const pool = require('./databaseConnection.js');
var fs = require('fs');
const util = require('util');


/*
 *
 *
 *  ANY CHANGES TO THIS CODE SHOULD BE REFLECTED IN THE SQL FILES IN THIS FOLDER
 * 
 * 
 */


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
    await pool.promise().query((await util.promisify(fs.readFile)('./Database/dummyData.sql')).toString());
}
exports.addDummyData = addDummyData;

async function deleteAllTables(){
    await pool.promise().query(
        'DROP TABLE IF EXISTS MESSAGES;'
        + 'DROP TABLE IF EXISTS CONVERSATIONS;'
        + 'DROP TABLE IF EXISTS POSTS;'
        + 'DROP TABLE IF EXISTS DISCUSSIONS;'
        + 'DROP TABLE IF EXISTS TOPICS;'
        + 'DROP TABLE IF EXISTS USERS;');
}
exports.deleteAllTables = deleteAllTables;

async function resetDatabase(){
    await pool.promise().query((await util.promisify(fs.readFile)('./Database/resetDatabase.sql')).toString());
    await pool.promise().query((await util.promisify(fs.readFile)('./Database/resetStoredProcedures.sql')).toString());
}
exports.resetDatabase = resetDatabase;

async function dropTable(table){
    pool.promise().query(
        'DROP TABLE IF EXISTS ' + table + ';');
}
exports.dropTable = dropTable;

async function createUsersTable(){
    await pool.promise().query(
        'CREATE TABLE IF NOT EXISTS USERS ('
            + 'ID int NOT NULL, '
            + 'USERNAME varchar(255) NOT NULL UNIQUE, '
            + 'PASSWORD varchar(255) NOT NULL,  '
            + 'FIRST_NAME varchar(255) NOT NULL,  '
            + 'LAST_NAME varchar(255) NOT NULL,  '
            + 'EMAIL varchar(255) NOT NULL, '
            + 'PROFILE_IMAGE_URL varchar(255) NOT NULL,  '
            + 'COUNTRY varchar(255) NOT NULL,  '
            + 'DATE_OF_BIRTH DATETIME NOT NULL,  '
            + 'LIKES int NOT NULL,  '
            + 'ABOUT varchar(255) NOT NULL, '
            + 'PRIMARY KEY (ID)'
        + ');');
}
exports.createUsersTable = createUsersTable;

async function createTopicsTable(){
    await pool.promise().query(
        'CREATE TABLE IF NOT EXISTS TOPICS ('
            + 'ID int NOT NULL, '
            + 'TOPIC varchar(255) NOT NULL, '
            + 'PRIMARY KEY (ID)'
        + ');');
}
exports.createTopicsTable = createTopicsTable;

async function createDiscussionsTable(){
    await pool.promise().query(
        'CREATE TABLE IF NOT EXISTS DISCUSSIONS ('
            + 'ID int NOT NULL, '
            + 'TOPIC_ID int NOT NULL, '
            + 'USER_ID int NOT NULL, '
            + 'TITLE varchar(255) NOT NULL, '
            + 'DATE DATE NOT NULL, '
            + 'BODY varchar(255) NOT NULL, '
            + 'PRIMARY KEY (ID),'
            + 'FOREIGN KEY (TOPIC_ID) REFERENCES TOPICS(ID),'
            + 'FOREIGN KEY (USER_ID) REFERENCES USERS(ID)'
        + ');');
}
exports.createDiscussionsTable = createDiscussionsTable;

async function createPostsTable(){
    await pool.promise().query(
        'CREATE TABLE IF NOT EXISTS POSTS ('
            + 'ID int NOT NULL, '
            + 'DISCUSSION_ID int NOT NULL, '
            + 'USER_ID int NOT NULL, '
            + 'POST_BODY varchar(255) NOT NULL, '
            + 'PRIMARY KEY (ID),'
            + 'FOREIGN KEY (DISCUSSION_ID) REFERENCES DISCUSSIONS(ID),'
            + 'FOREIGN KEY (USER_ID) REFERENCES USERS(ID)'
        + ');');
}
exports.createPostsTable = createPostsTable;

async function createConversationsTable(){
    await pool.promise().query(
        'CREATE TABLE IF NOT EXISTS CONVERSATIONS ('
            + 'ID int NOT NULL, '
            + 'USER_ID_1 int NOT NULL, '
            + 'USER_ID_2 int NOT NULL, '
            + 'DATE DATE NOT NULL, '
            + 'SUBJECT varchar(255) NOT NULL, '
            + 'PRIMARY KEY (ID),'
            + 'FOREIGN KEY (USER_ID_1) REFERENCES USERS(ID),'
            + 'FOREIGN KEY (USER_ID_2) REFERENCES USERS(ID)'
        + ');');
}
exports.createConversationsTable = createPostsTable;

async function createMessagesTable(){
    await pool.promise().query(
        'CREATE TABLE IF NOT EXISTS MESSAGES ('
            + 'ID int NOT NULL, '
            + 'CONVERSATION_ID int NOT NULL, '
            + 'USER_ID int NOT NULL, '
            + 'DATE_TIME DATETIME NOT NULL, '
            + 'MESSAGE_BODY varchar(255) NOT NULL, '
            + 'PRIMARY KEY (ID),'
            + 'FOREIGN KEY (CONVERSATION_ID) REFERENCES CONVERSATIONS(ID),'
            + 'FOREIGN KEY (USER_ID) REFERENCES USERS(ID)'
        + ');');
}
exports.createMessagesTable = createMessagesTable;