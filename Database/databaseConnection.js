const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit:8,
    multipleStatements:true,
    host:'us-cdbr-iron-east-05.cleardb.net',
    user:'bb708863be87b7',
    database:'heroku_c00af6dccc11356',
    password:'be1d8c43'
});

module.exports = pool.promise();