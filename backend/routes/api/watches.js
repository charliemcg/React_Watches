const express = require("express");
const router = express.Router();
const Watch = require("../../models/Watch");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/:brand/:model", (req, res) => {
  Watch.findOne({ brand: req.params.brand, model: req.params.model }).then(
    (watch) => {
      if (!watch) {
        return res.status(404).json({ watchnotfound: "Watch not found" });
      }
      res.json(watch);
    }
  );
});

router.get("/:brand", (req, res) => {
  Watch.find({ brand: req.params.brand }).then((watches) => {
    if (!watches) {
      return res.status(404).json({ watchesnotfound: "Watches not found" });
    }
    res.json(watches);
  });
});

router.post("/newWatch", upload.single("image"), (req, res) => {
  const { brand, model, price, description, inStock, image } = req.body;
  Watch.findOne({ model: brand }).then((watch) => {
    if (watch) {
      return res.status(400).json({ watch: "Watch already exists" });
    } else {
      const newWatch = new Watch({
        brand,
        model,
        price,
        description,
        inStock,
        image,
      });
      newWatch
        .save()
        .then((watch) => res.json(watch))
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;
