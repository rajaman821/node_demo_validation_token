const userModel = require("../models/users");
const authModel = require("../models/auth");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

var token;
module.exports = {
  register: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      if (err) next(err);
      else {
        if (userInfo) {
          res.status(400).json({
            status: "error",
            message: "User already exist!!!",
            data: null,
          });
        } else {
          userModel.create(
            {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              phone: req.body.phone,
              status: 1,
            },
            function (err, result) {
              if (err) next(err);
              else
                res.json({
                  status: "success",
                  message: "User added successfully!!!",
                  data: null,
                });
            }
          );
        }
      }
    });
  },
  login: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          crypto.randomBytes(48, function (err, buffer) {
            token = buffer.toString("hex");
            authModel.create(
              {
                user_id: userInfo._id,
                token: token,
              },
              function (err, result) {
                if (err) next(err);
                else
                  res.json({
                    status: "success",
                    message: "user found!!!",
                    data: { user: userInfo, token: token },
                  });
              }
            );
          });          
        } else {
          res.status(400).json({
            status: "error",
            message: "Invalid email/password!!!",
            data: null,
          });
        }
      }
    });
  },
  getUserDetails: function (req, res, next) {
    userModel.findById(req.params.user_id, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "User found!!!",
          data: userInfo,
        });
      }
    });
  },
  logout: function (req, res, next) {
    authModel.findOne({ user_id:req.body.user_id, token: req.headers["authorization"] }, (err, userInfo) => {
      if (err) next(err);
    else{
      if(userInfo){
        authModel.findByIdAndRemove(userInfo._id, (err, data)=>{
          if (err) next(err);
          else res.json({
            status: "success",
            message: "Logout Successful!!!",
            data: userInfo,
          });
        })
      }
      else res.status(400).json({
        status: "error",
        message: "Invalid details!!!",
        data: null,
      });
    }
    })
  },
};
