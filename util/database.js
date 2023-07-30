// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-practice',
//     password: '246810'
// });

// module.exports = pool.promise();


//using sequelize

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-practice', 'root', '246810', {
    dialect : 'mysql',
    host: 'localhost'
});

module.exports = sequelize;