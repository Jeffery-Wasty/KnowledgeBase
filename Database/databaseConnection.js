const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit:8,
    multipleStatements:true,
    host:'us-cdbr-iron-east-05.cleardb.net',
    user:'b8f623fe265c8b',
    database:'heroku_802f7c08cf3f1c6',
    password:'282117ad'
});

module.exports = pool;
