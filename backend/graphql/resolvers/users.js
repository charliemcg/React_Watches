const User = require("../../models/User");

const { transformUser } = require("./merge");

module.exports = {
  user: (args, req) => {
    return User.findOne({
      email: args.email,
      //   password: args.password,
    })
      .then((user) => {
        return transformUser(user);
      })
      .catch((err) => {
        throw err;
      });
  },
  createUser: (args, req) => {
    return new User({
      firstname: args.userInput.firstname,
      lastname: args.userInput.lastname,
      email: args.userInput.email,
      address: args.userInput.address,
      password: args.userInput.password,
      confirmPassword: args.userInput.confirmPassword,
      phone: args.userInput.phone,
      admin: false,
    }).save();
  },
};
