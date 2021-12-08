const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mysql = require("mysql")
const util = require("util");
const path = require('path');
const indexRouter = require('./router.js');
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

let urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', indexRouter);

let con = mysql.createConnection({
    host: "mysql.metropolia.fi",
    user: "samulu",
    password: "HJVfRJZwutq89vs",
    database: "samulu"
});
const query = util.promisify(con.query).bind(con);

function checkToken(req, res) {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return null;
    }

    try {
        const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'jfhkhfkerhgt4345jkfsdjkhf');

    return decoded;
    }catch(e){
        res.send("Wrong JWT")
    }
}

app.get("/api/ideas", function (req, res) {
    let sql = "SELECT * FROM idea_db";

    (async () => {
        try {
            const result = await query(sql);
            res.send(result);
        } catch (err) {
            console.log("Database error!" + err);
        }
    })()
})

app.get("/", function (req, res) {
    res.send("blank")
})

app.post("/api/votes", urlencodedParser, function (req, res) {
    let post = req.query.post;
    let decoded = checkToken(req, res)
    if (post != null && decoded != null) {
        //Get voters
        let voters = "";
        let voterssql = "SELECT voters FROM idea_db WHERE id=?";
        (async () => {
            try {
                let response = await query(voterssql, [post]);
                voters = response[0].voters.toString()
                console.log(response[0].voters.toString())
            } catch (err) {
                console.log("Upvoting was not successful! " + err);
            }

            //Check if voters contain decoded.user
            let votersArray = voters.split(',')
            if(votersArray[0] === "") {
                votersArray.shift()
            }
            console.log(votersArray)
            console.log("decoded id: " + decoded.id)

            if (!votersArray.includes(decoded.id.toString())) {

                votersArray.push(decoded.id.toString())
                voters = votersArray.toString()
                console.log("voter ids: " + voters)

                let sql = "UPDATE idea_db SET upvotes = upvotes +1, voters = ?"
                    + "WHERE id = ?";

                try {
                    console.log("id of the post: " + post + ", users who have voted: " + voters)
                    let q = await query(sql, [voters, post]);
                    console.log(q)
                    res.send("POST successful ");
                } catch (err) {
                    console.log("Upvoting was not successful! " + err);
                    res.send("POST was not successful " + err);
                }
            } else {
                res.send("User has voted already.");
            }
        })()
    }
})

app.post("/api/postIdea", urlencodedParser, function (req, res) {
    console.log("body: %j", req.body);
    let jsonObj = req.body;
    let decoded = checkToken(req, res)
    if (jsonObj != null && decoded != null) {
        let sql = "INSERT INTO idea_db (title, description, author, upvotes)"
            + " VALUES (?, ?, ?, 0)";
        (async () => {
            try {
                const result = await query(sql, [jsonObj.title, jsonObj.description, decoded.user, jsonObj.upvotes]);
                console.log(result)
                res.json(result.insertId)

            } catch (err) {
                console.log("Insertion into table was unsuccessful!" + err);
                res.sendStatus(400)
                res.send("POST was not succesful " + err);
            }
        })()
    }
})

app.delete("/api/deleteIdea", urlencodedParser, function (req, res) {
    console.log(req.query.id);
    let id = req.query.id;
    let decoded = checkToken(req, res)
    if (id != null && decoded != null) {
        let sql = "DELETE FROM idea_db WHERE id=? AND author = ?";
        (async () => {
            try {
                await query(sql, [id, decoded.user]);
                res.send("DELETE was successful")
            } catch (err) {
                console.log("Deletion into table was unsuccessful!" + err);
                res.send("DELETE was not succesful " + err);
            }
        })()
    }
})

let server = app.listen(3000, "localhost", function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

