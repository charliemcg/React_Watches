const watchesResolver = require("./watches");
const usersResolver = require("./users");

const rootResolver = {
  ...watchesResolver,
  ...usersResolver,
};

module.exports = rootResolver;
