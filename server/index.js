const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "10042002",
  database: "language_center",
});

db.connect(function (err) {
  err ? console.log(err) : console.log(db);
});

app.get("/api/list", (req, res) => {
  var sql = "SELECT * FROM language_center.course";
  db.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ myList: results });
    console.log(results)
  });
});

app.get("/api/class-list", (req, res) => {
  var sql = "SELECT * FROM language_center.class";
  db.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ myList: results });
    console.log(results);
  });
});


app.listen(4000, () => {
  console.log("running on port 4000");
});
