let express = require('express');
let cookieParser = require('cookie-parser');
let mysql = require("mysql")
let app = express();
let cors = require('cors');
const util = require("util");

let bodyParser = require('body-parser');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let con = mysql.createConnection({
  host: "mysql.metropolia.fi",
  user: "samulu",
  password: "HJVfRJZwutq89vs",
  database: "samulu"
});
const query = util.promisify(con.query).bind(con);

app.get("/api/ideas", function(req,res){
  let sql = "SELECT * FROM idea_db";

  (async () => {
    try {
      const result = await query(sql);
      res.send(result);
    }
    catch (err) {
      console.log("Database error!"+ err);
    }
  })()
})

app.get("/", function(req, res){
  res.send("pöö")
})

app.post("/api/votes", urlencodedParser, function (req, res) {

  let post = req.query.post;

  if (post != null) {
    let sql = "UPDATE idea_db SET upvotes = upvotes +1 "
    + "WHERE id = ?";

    (async () => {
      try {
        await query(sql, [post]);
        res.send("POST successful ");
      } catch (err) {
        console.log("Upvoting was not successful! " + err);
        res.send("POST was not successful " + err);
      }
    })()
  }
})

app.post("/api/postIdea", urlencodedParser, function (req, res) {
  console.log("body: %j", req.body);
  let jsonObj = req.body;

  if (jsonObj != null) {
    let sql = "INSERT INTO idea_db (title, description, author, upvotes)"
        + " VALUES (?, ?, ?, 0)";
    (async () => {
      try {
        const result = await query(sql, [jsonObj.title, jsonObj.description, jsonObj.author, jsonObj.upvotes]);
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
  console.log( req.query.id);
  let id = req.query.id;
  if (id != null) {
    let sql = "DELETE FROM idea_db WHERE id=?";
    (async () => {
      try {
        await query(sql, [id]);
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

