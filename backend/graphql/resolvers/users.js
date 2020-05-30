const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/constants");
const validateSignUp = require("../../validation/signUp");
const validateSignIn = require("../../validation/signIn");

module.exports = {
  signIn: (args) => {
    const { errors, isValid } = validateSignIn(args);
    if (!isValid) {
      return { success: false, token: null, errors };
    }
    const email = args.email;
    const password = args.password;
    return User.findOne({
      email,
    })
      .then((user) => {
        if (!user) {
          return {
            success: false,
            token: null,
            errors: { email: "Email not found" },
          };
        }
        return user;
      })
      .then((user) => {
        return bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              address: user.address,
              phone: user.phone,
              admin: user.admin,
            };
            return {
              success: true,
              token:
                "Bearer " +
                jwt.sign(payload, keys.secretOrKey, {
                  expiresIn: 31556926,
                }),
              errors,
            };
          } else {
            return {
              success: false,
              token: null,
              errors: { password: "Password incorrect" },
            };
          }
        });
      });
  },

  signUp: (args) => {
    const { errors, isValid } = validateSignUp(args);
    if (!isValid) {
      return { success: false, errors };
    }
    return User.findOne({ email: args.userInput.email })
      .then((existingUser) => {
        if (existingUser) {
          return {
            success: false,
            errors: { email: "User exists already." },
          };
        }
      })
      .then(() => {
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        new User({
          firstname: args.userInput.firstname,
          lastname: args.userInput.lastname,
          email: args.userInput.email,
          address: args.userInput.address,
          password: hashedPassword,
          confirmPassword: args.userInput.confirmPassword,
          phone: args.userInput.phone,
          admin: false,
        }).save();
        return { success: true, errors };
      });
  },
};
