import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  generates: {
    './src/graphql/generated.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true,
      },
    },
  },
};

export default config;
