const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/constants").connectionString;
const graphqlHttp = require("express-graphql");

const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers/index");
const passport = require("passport");
const users = require("./routes/api/users");
const watches = require("./routes/api/watches");

const app = express();

//setting 5mb upload image to allow for product images
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "5mb",
  })
);

app.use(bodyParser.json({ limit: "5mb" }));

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
app.use(passport.initialize());
// require("./config/passport")(passport);
// app.use("/api/users", users);
// app.use("/api/watches", watches);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
