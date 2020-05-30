const Watch = require("../../models/Watch");
const validateWatch = require("../../validation/createWatch");

const { transformWatch } = require("./merge");

module.exports = {
  watches: ({ watchBrand }) => {
    return Watch.find({ brand: watchBrand })
      .then((watches) => {
        return watches.map((watch) => {
          return transformWatch(watch);
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  watch: ({ watchId }) => {
    return Watch.findOne({ _id: watchId })
      .then((watch) => {
        return transformWatch(watch);
      })
      .catch((err) => {
        console.log(`Error getting watch ${watch}`);
      });
  },

  createWatch: (args) => {
    const { errors, isValid } = validateWatch(args);
    if (!isValid) {
      return { success: false, errors };
    }
    return new Watch({
      brand: args.watchInput.brand,
      model: args.watchInput.model,
      houseing: args.watchInput.housing,
      bracelet: args.watchInput.bracelet,
      dial: args.watchInput.dial,
      diameter: args.watchInput.diameter,
      movement: args.watchInput.movement,
      price: args.watchInput.price,
      //TODO remove the lorem ipsum
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis diam lectus, in cursus nunc tempus at. Curabitur vitae porttitor odio, vitae auctor turpis. Nam varius nisi ut sapien suscipit rutrum. Sed tempor iaculis mauris, sed ullamcorper ante. Donec eu vestibulum nunc. Praesent sit amet semper nisi. Cras maximus, tellus et vestibulum tempus, velit tellus auctor turpis, sit amet ultricies turpis metus vitae dolor.",
      inStock: args.watchInput.inStock,
      image: args.watchInput.image,
    })
      .save()
      .then((res) => {
        return { success: true, errors };
      });
  },
};
