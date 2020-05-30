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

//GET model
router.get("/:brand/:_id", (req, res) => {
  Watch.findOne({ brand: req.params.brand, _id: req.params._id })
    .then((watch) => {
      if (!watch) {
        return res.status(404).json({ watchnotfound: "Watch not found" });
      }
      res.json(watch);
    })
    .catch(function () {
      return res.status(404).json({ watchnotfound: "Watch not found" });
    });
});

//GET all models of brand
router.get("/:brand", (req, res) => {
  Watch.find({ brand: req.params.brand }).then((watches) => {
    if (!watches) {
      return res.status(404).json({ watchesnotfound: "Watches not found" });
    }
    res.json(watches);
  });
});

//POST new watch
router.post("/newWatch", upload.single("image"), (req, res) => {
  const {
    brand,
    model,
    housing,
    bracelet,
    dial,
    diameter,
    movement,
    complications,
    price,
    description,
    inStock,
    image,
  } = req.body;
  Watch.findOne({ model: brand }).then((watch) => {
    if (watch) {
      return res.status(400).json({ watch: "Watch already exists" });
    } else {
      const newWatch = new Watch({
        brand,
        model,
        case: housing,
        bracelet,
        dial,
        diameter,
        movement,
        complications,
        price,
        //TODO remove lorem ipsum from before rolling out to production
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis diam lectus, in cursus nunc tempus at. Curabitur vitae porttitor odio, vitae auctor turpis. Nam varius nisi ut sapien suscipit rutrum. Sed tempor iaculis mauris, sed ullamcorper ante. Donec eu vestibulum nunc. Praesent sit amet semper nisi. Cras maximus, tellus et vestibulum tempus, velit tellus auctor turpis, sit amet ultricies turpis metus vitae dolor.",
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
