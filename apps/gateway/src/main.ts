/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { resolvers } from './graphql/resolvers';

const typeDefs = gql(readFileSync('schema.gql', 'utf8'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function start() {
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

start();
