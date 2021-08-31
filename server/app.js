const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

//Database connection
mongoose.connect(process.env.CONNECTION_DB, (err) => {
  if (err) {
    console.log();
  } else {
    console.log("Database is connected");
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(1000, () => {
  console.log("Server is listening at 1000.");
});
