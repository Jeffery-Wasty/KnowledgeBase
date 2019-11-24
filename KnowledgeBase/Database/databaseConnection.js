const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit:8,
    multipleStatements:true,
    host:'us-cdbr-iron-east-05.cleardb.net',
    user:'b19af1173a0ac7',
    database:'heroku_b25eeafa4bd74c5',
    password:'be36f133'
});

module.exports = pool;
