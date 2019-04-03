//
// Validation for user login
//

const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(input) {
  let errors = {};

  ["email", "password"].forEach(s => {
    if (isEmpty(input[s])) input[s] = "";
  });

  // email
  if (Validator.isEmpty(input.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(input.email)) {
    errors.email = "Invalid email address";
  }

  // password
  if (Validator.isEmpty(input.password)) {
    errors.password = "password is required";
  } else if (!Validator.isLength(input.password, {
    min: 6,
    max: 30
  })) {
    errors.password = "Password must be at least 6 characters";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
}