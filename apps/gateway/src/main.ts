// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */

// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import { readFileSync } from 'fs';
// import gql from 'graphql-tag';
// import { resolvers } from './graphql/resolvers';

// const typeDefs = gql(readFileSync('schema.gql', 'utf8'));

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   csrfPrevention: false,
// });

// async function start() {
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });

//   console.log(`🚀  Server ready at: ${url}`);
// }

// start();
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema });

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
