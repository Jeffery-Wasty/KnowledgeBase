const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 8,
  multipleStatements: true,
  host: 'localhost',
  user: 'root',
  database: 'local_db',
  password: 'Gyhtgy123'
});

module.exports = pool.promise();
