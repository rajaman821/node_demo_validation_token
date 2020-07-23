const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).send({
    status: "error",
    message: errors.errors[0].msg,
    data: null,
  });
};

module.exports = validate;
