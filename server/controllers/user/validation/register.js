//
// Validation for user registration
//

const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegistInput(input) {
  let errors = {};

  ['name', 'email', 'password', 'password2'].forEach(s => {
    if (isEmpty(input[s])) input[s] = "";
  });

  // name
  if (Validator.isEmpty(input.name)) {
    errors.name = "Name is required";
  } else if (!Validator.isLength(input.name, { min: 2 })) {
    errors.name = "Name must be >1 character";
  }

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

  // password2
  if (Validator.isEmpty(input.password2)) {
    errors.password2 = "password2 is required";
  } else if (!Validator.equals(input.password, input.password2)) {
    errors.password2 = "Passwords do not match";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
}