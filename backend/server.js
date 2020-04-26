const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const watches = require("./routes/api/watches");

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "5mb",
  })
);
app.use(bodyParser.json({ limit: "5mb" }));
const db = require("./config/constants").connectionString;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/watches", watches);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
