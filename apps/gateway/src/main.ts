import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  context: ({ request }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    // Pass the token into the context
    return { token };
  },
});

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
  console.info('Connected to ' + process.env.GATEWAY_API_SDK_URL);
});
