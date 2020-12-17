import { ApolloServer } from "apollo-server-micro";
import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import { typeDefs, resolvers } from "./merge-packages";
import { dataSources } from "./data-sources/";
import cors from "micro-cors";
const corsHandler = cors({
  allowMethods: ["OPTIONS", "POST", "GET"],
  allowHeaders: ["*"],
});

const apolloServer = new ApolloServer({
  schema: buildFederatedSchema({ typeDefs, resolvers }),
  dataSources,
  playground: true,
  introspection: true,
  cacheControl: {
    defaultMaxAge: 300,
  },
  plugins: [ApolloServerPluginInlineTrace()],
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
