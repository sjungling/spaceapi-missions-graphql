import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "./merge-packages";
import { dataSources } from "./data-sources";
import cors from "micro-cors";
const corsHandler = cors({
  allowMethods: ["OPTIONS", "POST", "GET"],
  allowHeaders: ["*"],
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  playground: true,
  introspection: true,
  cacheControl: {
    defaultMaxAge: 300,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" });
export default corsHandler((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
);
