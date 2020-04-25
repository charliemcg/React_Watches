const express = require("express");
const router = express.Router();
const Watch = require("../../models/Watch");

router.get("/:brand", (req, res) => {
  Watch.find({ brand: req.params.brand }).then((watches) => {
    if (!watches) {
      return res.status(404).json({ watchesnotfound: "Watches not found" });
    }
    res.json(watches);
  });
});

module.exports = router;
