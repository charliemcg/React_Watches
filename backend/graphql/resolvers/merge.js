const Watch = require("../../models/Watch");

const transformUser = (user) => {
  return {
    ...user._doc,
    _id: user.id,
  };
};

const transformWatch = (watch) => {
  return {
    ...watch._doc,
    _id: watch.id,
  };
};

exports.transformWatch = transformWatch;
exports.transformUser = transformUser;
