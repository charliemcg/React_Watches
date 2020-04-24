const express = require("express");
const router = express.Router();
const Watch = require("../../models/Watch");

router.get("/:brand", (req, res) => {
  console.log(req.params);
  // Watch.find({ brand: req.body.brand }).then((watches) => {
  Watch.find({ brand: req.params.brand }).then((watches) => {
    // Watch.find({ brand: "Rolex" }).then((watches) => {
    if (!watches) {
      return res.status(404).json({ watchesnotfound: "Watches not found" });
    }
    res.json(watches);
    console.log(`Found watches: ${watches}`);
  });
});

module.exports = router;
