var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(express.static("public"));
app.use(cors());

var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  }
});
var upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/fileUpload", upload.single("image"), (req, res, next) => {
  res.send(JSON.stringify({ status: "ok" }));
});
app.get("/list", (req, res) => {
  const testFolder = "./public/";
  const fs = require("fs");

  fs.readdir(testFolder, (err, files) => {
    let arr = [];
    files.forEach(file => {
      console.log(file);
      arr.push(file);
    });
    res.send(JSON.stringify({ status: "ok", data: arr }));
  });
});
module.exports = app;
