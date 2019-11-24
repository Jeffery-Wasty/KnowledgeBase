const pool = require('./databaseConnection.js');
var fs = require('fs');
const util = require('util');


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
    console.log('Likes:');
    console.log((await pool.promise().query('SELECT * FROM USER_LIKES'))[0]);
}

async function addDummyData(){
    await pool.promise().query((await util.promisify(fs.readFile)('./Database/dummyData.sql')).toString());
}
exports.addDummyData = addDummyData;

async function resetDatabase(){
    await pool.promise().query((await util.promisify(fs.readFile)('./Database/resetDatabase.sql')).toString());
    await pool.promise().query((await util.promisify(fs.readFile)('./Database/resetStoredProcedures.sql')).toString());
}
exports.resetDatabase = resetDatabase;