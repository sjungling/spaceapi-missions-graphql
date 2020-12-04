import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "./merge-packages";
import { dataSources } from "./data-sources";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  playground: true,
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
