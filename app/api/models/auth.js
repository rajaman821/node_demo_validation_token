const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const AuthenticationSchema = new Schema(
  {
    user_id: {
      type: String,
      trim: true,
      required: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", AuthenticationSchema);
