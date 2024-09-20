const { ApolloServer, gql } = require("apollo-server");
import dotenv from "dotenv";

dotenv.config();

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer();

server.listen({ port: process.env.PORT }).then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`);
});
