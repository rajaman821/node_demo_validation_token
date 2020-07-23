//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/ongraph";

mongoose
  .connect(mongoDB)
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error(err.message));
mongoose.Promise = global.Promise;

module.exports = mongoose;
