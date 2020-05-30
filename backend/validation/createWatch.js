const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateWatch(watch) {
  let {
    brand,
    model,
    housing,
    bracelet,
    dial,
    diameter,
    movement,
    price,
    description,
    inStock,
    image,
  } = watch.watchInput;
  let errors = {};
  brand = !isEmpty(brand) ? brand : "";
  model = !isEmpty(model) ? model : "";
  housing = !isEmpty(housing) ? housing : "";
  bracelet = !isEmpty(bracelet) ? bracelet : "";
  dial = !isEmpty(dial) ? dial : "";
  diameter = !isEmpty(diameter) ? diameter : "";
  movement = !isEmpty(movement) ? movement : "";
  price = !isEmpty(price) ? price : "";
  description = !isEmpty(description) ? description : "";
  inStock = !isEmpty(inStock) ? inStock : "";
  image = !isEmpty(image) ? image : "";

  if (Validator.isEmpty(brand)) {
    errors.brand = "Brand is required";
  }
  if (Validator.isEmpty(model)) {
    errors.model = "Model is required";
  }
  if (Validator.isEmpty(housing)) {
    errors.housing = "Housing is required";
  }
  if (Validator.isEmpty(bracelet)) {
    errors.bracelet = "Bracelet is required";
  }
  if (Validator.isEmpty(dial)) {
    errors.dial = "Dial is required";
  }
  if (Validator.isEmpty(diameter)) {
    errors.diameter = "Diameter is required";
  }
  if (Validator.isEmpty(movement)) {
    errors.movement = "Movement is required";
  }
  if (Validator.isEmpty(price)) {
    errors.price = "Price is required";
  }
  //TODO Verify that file is an image
  if (Validator.isEmpty(image)) {
    errors.image = "Image is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
