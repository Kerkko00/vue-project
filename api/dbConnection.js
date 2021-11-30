var mysql = require('mysql');
let con = mysql.createConnection({
    host: "mysql.metropolia.fi",
    user: "samulu",
    password: "HJVfRJZwutq89vs",
    database: "samulu"
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
module.exports = con;