const Watch = require("../../models/Watch");

const { transformWatch } = require("./merge");

module.exports = {
  watches: (args, req) => {
    return Watch.find({ brand: args.watchBrand })
      .then((watches) => {
        return watches.map((watch) => {
          return transformWatch(watch);
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  watch: (args, req) => {
    return Watch.findOne({ _id: args.watchId }).then((watch) => {
      return transformWatch(watch);
    });
  },
};
