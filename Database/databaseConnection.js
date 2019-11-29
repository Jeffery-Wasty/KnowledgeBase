const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 8,
    multipleStatements: true,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.DB_NAME,
    password: process.env.MYSQL_PASSWORD,
});

module.exports = pool.promise();