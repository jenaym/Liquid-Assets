//
// Validation for user inventory inputs
//

const Validator = require("validator");
const isEmpty = require("../user/validation/isEmpty");

module.exports = function validateLoginInput(input, checkUserId = "userId") {
  let errors = {};

  ["brandStyle", "sizeML"].forEach(s => {
    if (isEmpty(input[s])) input[s] = "";
  });
  if ("userId" in input) {
    ["userId"].forEach(s => {
      if (isEmpty(input[s])) input[s] = "";
    });  
  }

  // brandStyle
  // --> checking against a db query result
  if (Validator.isEmpty(input.brandStyle, { ignore_whitespace: true })) {
    errors.brandStyle = "Invalid Brand/Style (required)";
  }

  // sizeML / bottleSize
  // --> checking against a db query result
  if (Validator.isEmpty(input.sizeML)) {
    errors.bottleSize = "Invalid bottle size (required)";
  } else if (typeof input.sizeML === "string" && !Validator.isNumeric(input.sizeML)) {
    errors.bottleSize = "Invalid bottle size (required)";
  } //else if (typeof input.sizeML !== "number") {
  //  errors.bottleSize = "Invalid bottle size";
  //}

  console.log("VALIDATE INPUT", input);
  // userId
  // hijack "brandStyle" for the error msg
  if (checkUserId) {
    if (typeof input[checkUserId] === "string") {
      if (Validator.isEmpty(input[checkUserId])) {
        errors[checkUserId] = "Please login first";
      } else if (!Validator.isNumeric(input[checkUserId])) {
        errors[checkUserId] = "Invalid user ID - Please login";
      }
    } else if (typeof input[checkUserId] !== "number") {
      errors[checkUserId] = "Invalid user ID - Please login";
    }  
  }

  // return {
  //   errors,
  //   isValid: isEmpty(errors)
  // };
  const errObj = {
    errors,
    isValid: isEmpty(errors)
  }
  console.log("VALIDATE RESULT", errObj);

  // return new Promise((resolve, reject) => {
  //   if (errObj.isValid) resolve(errObj)
  //   else reject(errObj)
  // });
  return errObj;
}