const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

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
