let mysql = require('mysql');

/**
 * Connection object for database connection.
 * @type {Connection}
 */
let con = mysql.createConnection({
    host: "mysql.metropolia.fi",
    user: "samulu",
    password: "HJVfRJZwutq89vs",
    database: "samulu"
});

/**
 * Connects to database.
 */
con.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
module.exports = con;