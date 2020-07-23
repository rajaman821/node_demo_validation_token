const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");
const authModel = require("../app/api/models/auth");
const validator = require('./validation');
const validate = require('./error');

router.post("/register", validator('basicInfo'), validate, userController.register);
router.post("/login", validator('loginnfo'), validate, userController.login);
router.get("/:user_id", validateUser, userController.getUserDetails);
router.post("/logout", validateUser, userController.logout);

//User Token Validate
function validateUser(req, res, next) {
  authModel.findOne({ user_id:req.body.user_id, token: req.headers["authorization"] }, (err, userInfo) => {
    if (err) next(err);
    else{
      if(userInfo){
        next();
      }
      else res.status(401).json({ status: "error", message: "Unauthorized User!!", data: null });
    }
  })
}

module.exports = router;
