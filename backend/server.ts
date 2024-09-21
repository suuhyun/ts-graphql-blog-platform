import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const PORT = process.env.SERVER_PORT 
const port = PORT ? parseInt(PORT) : 4000

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
