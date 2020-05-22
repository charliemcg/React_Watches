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

  createWatch: (args, req) => {
    return new Watch({
      brand: args.watchInput.brand,
      model: args.watchInput.model,
      case: args.watchInput.case,
      bracelet: args.watchInput.bracelet,
      dial: args.watchInput.dial,
      diameter: args.watchInput.diameter,
      movement: args.watchInput.movement,
      price: args.watchInput.price,
      description: args.watchInput.description,
      inStock: args.watchInput.inStock,
      image: args.watchInput.image,
    }).save();
  },
};
