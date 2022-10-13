import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "./merge-packages";
import { dataSources } from "./data-sources/";
import cors from "micro-cors";
import { buildSubgraphSchema } from "@apollo/subgraph";
const corsHandler = cors({
  allowMethods: ["OPTIONS", "POST", "GET"],
  allowHeaders: ["*"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default corsHandler(async (req, res) => {
  const apolloServer = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    dataSources,
    apollo: {
      graphId: "spaceapi",
      graphVariant: "main",
    },
  });
  await apolloServer.start();
  const handler = apolloServer.createHandler({ path: "/api/graphql" });

  req.method === "OPTIONS" ? res.end() : handler(req, res);
});
