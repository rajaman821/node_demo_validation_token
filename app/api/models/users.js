const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: Boolean,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// hash user password before saving into database
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("User", UserSchema);
