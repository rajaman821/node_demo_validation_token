const express = require("express");
const users = require("./routes/users");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("./config/database");
const cors = require('cors');

// app.set("secretKey", "nodeRestApi");

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

//CORS
app.use(cors());

//Body Parser for JSON
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.json({ Success: "Server running successfully!!" });
});

//User Route Setting
app.use("/users", users);

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(3000, function () {
  console.log("Node server listening on port 3000");
});
