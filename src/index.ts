import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { verifyToken } from "./firebase.js";

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected");

    return startStandaloneServer(server, {
      listen: { port: Number.parseInt(process.env.PORT) || 4000 },

      context: async ({ req }) => {
        const token = req.headers.authorization || "";

        await verifyToken(token.split(" ")[1]);
      },
    });
  })
  .then(({ url }) => console.log(`Server ready at ${url}`));
