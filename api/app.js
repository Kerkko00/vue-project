let express = require('express');
let cookieParser = require('cookie-parser');
const port = 3000
let app = express();
let cors = require('cors');
app.use(cors());

app.get("/", function(req, res){
  res.send("pöö")
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

