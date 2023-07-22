import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
    qqq: Int
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
    qqq: () => {
      console.log("qqqq");
      return 1234;
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
