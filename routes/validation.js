const { check } = require("express-validator");

const validationRules = (method) => {
  switch (method) {
    case "basicInfo": {
      return [
        check("username")
          .not()
          .isEmpty()
          .withMessage("Username is required.")
          .isString()
          .withMessage("Invalid Username"),
        check("email")
          .not()
          .isEmpty()
          .withMessage("Email is required.")
          .isString()
          .withMessage("Invalid Email"),
        check("phone")
          .not()
          .isEmpty()
          .withMessage("Phone required.")
          .isNumeric()
          .withMessage("Invalid Phone."),
        check("password")
          .not()
          .isEmpty()
          .withMessage("Password required.")
      ];
    }
    
    case "loginnfo": {
        return [
          check("email")
            .not()
            .isEmpty()
            .withMessage("Email is required.")
            .isString()
            .withMessage("Invalid Email"),
          check("password")
            .not()
            .isEmpty()
            .withMessage("Password required.")
        ];
      }

    default: {
      return [];
    }
  }
};

module.exports = validationRules;
