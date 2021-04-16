const mysql = require('mysql2');
const util = require("util");


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'AppleSeed90!',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database')
);
db.connect()
db.query = util.promisify(db.query);

module.exports = db;