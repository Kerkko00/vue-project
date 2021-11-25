let express = require('express');
let cookieParser = require('cookie-parser');
let mysql = require("mysql")
let app = express();
let cors = require('cors');
const util = require("util");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));

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
      let string = JSON.stringify(result);
      //let alteredResult = '{"numOfRows":'+result.length+',"rows":'+string+'}';
      res.send(string);
    }
    catch (err) {
      console.log("Database error!"+ err);
    }
  })()
})

app.get("/", function(req, res){
  res.send("pöö")
})



let server = app.listen(3000, "localhost", function () {
  let host = server.address().address
  let port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});

