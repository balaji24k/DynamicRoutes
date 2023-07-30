const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-practice',
    password: '246810'
});

module.exports = pool.promise();