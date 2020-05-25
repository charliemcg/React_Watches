const User = require("../../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/constants");
const validateSignUp = require("../../validation/signUp");
const validateSignIn = require("../../validation/signIn");
const isEmpty = require("is-empty");

const { transformUser } = require("./merge");

module.exports = {
  // user: (args, req) => {
  //   const { errors, isValid } = validateSignIn(args);
  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }
  //   const email = args.email;
  //   const password = args.password;
  //   return User.findOne({
  //     email,
  //   })
  //     .then((user) => {
  //       if (!user) {
  //         return res.status(404).json({ emailnotfound: "Email not found" });
  //       }
  //       return transformUser(user);
  //     })
  //     .then((user) => {
  //       bcrypt.compare(password, user.password).then((isMatch) => {
  //         if (isMatch) {
  //           const payload = {
  //             id: user.id,
  //             firstname: user.firstname,
  //             lastname: user.lastname,
  //             email: user.email,
  //             address: user.address,
  //             phone: user.phone,
  //             admin: user.admin,
  //           };
  //           jwt.sign(
  //             payload,
  //             keys.secretOrKey,
  //             {
  //               expiresIn: 31556926,
  //             },
  //             (err, token) => {
  //               console.log(`Got this far ${token}`);
  //               // res.json({
  //               //   success: true,
  //               //   token: "Bearer " + token,
  //               // });
  //               return { success: true, token: "Bearer " + token };
  //             }
  //           );
  //         } else {
  //           return res
  //             .status(400)
  //             .json({ passwordincorrect: "Password incorrect" });
  //         }
  //       });
  //     });
  // },
  user: ({ email, password }) => {
    return User.findOne({
      email,
    })
      .then((user) => {
        if (!user) {
          // return res.status(404).json({ emailnotfound: "Email not found" });
          throw new Error("User does not exist!");
        }
        // return transformUser(user);
        return user;
      })
      .then((user) => {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            throw new Error("Password is incorrect!");
          }
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            "somesupersecretkey",
            {
              expiresIn: "1h",
            }
          );
          return { userId: user.id, token: token, tokenExpiration: 1 };
          // const payload = {
          //   id: user.id,
          //   firstname: user.firstname,
          //   lastname: user.lastname,
          //   email: user.email,
          //   address: user.address,
          //   phone: user.phone,
          //   admin: user.admin,
          // };
          // jwt.sign(
          //   payload,
          //   keys.secretOrKey,
          //   {
          //     expiresIn: 31556926,
          //   },
          //   (err, token) => {
          //     console.log(`Got this far ${token}`);
          //     // res.json({
          //     //   success: true,
          //     //   token: "Bearer " + token,
          //     // });
          //     return { success: true, token: "Bearer " + token };
          //   }
          // );
        });
      });
  },
  createUser: (args, req) => {
    return (
      User.findOne({ email: args.userInput.email })
        .then((existingUser) => {
          if (existingUser) {
            throw new Error("User exists already.");
          }
        })
        .then(() => {
          return bcrypt.hash(args.userInput.password, 12);
        })
        .then((hashedPassword) => {
          const user = new User({
            firstname: args.userInput.firstname,
            lastname: args.userInput.lastname,
            email: args.userInput.email,
            address: args.userInput.address,
            password: hashedPassword,
            confirmPassword: args.userInput.confirmPassword,
            phone: args.userInput.phone,
            admin: false,
          });
          return user.save();
        })
        // .then((res) => {
        //   //super important to not return password
        //   return { ...res._doc, password: null, _id: res.id}
        // });
        .catch((err) => {
          throw err;
        })
    );
  },
};
