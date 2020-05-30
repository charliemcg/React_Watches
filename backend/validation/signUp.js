const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSignUp(data) {
  let {
    firstname,
    lastname,
    email,
    password,
    password2,
    address,
    phone,
  } = data.userInput;
  let errors = {};
  if (Validator.isEmpty(firstname)) {
    errors.firstname = "First name is required";
  }
  if (Validator.isEmpty(lastname)) {
    errors.lastname = "Last name is required";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(password2)) {
    errors.password2 = "Confirm password is required";
  }
  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }
  if (Validator.isEmpty(address)) {
    errors.address = "Address field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
