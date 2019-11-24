const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'us-cdbr-iron-east-05.cleardb.net',
    user:'b19af1173a0ac7',
    database:'heroku_b25eeafa4bd74c5',
    password:'be36f133'
});
module.exports = pool;
