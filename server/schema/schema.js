const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
];

const authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    // id: { type: GraphQLString },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return authors.find((x) => x.id === parent.id);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    // id: { type: GraphQLString },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter((x) => x.id == parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.find((x) => x.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find((x) => x.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
