import type { CodegenConfig } from '@graphql-codegen/cli';
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';

const config: CodegenConfig = {
  schema: '**/schema.ts',
  generates: {
    codegen: defineConfig({
      add: {
        './types.generated.ts': {
          content: '/* eslint-disable @typescript-eslint/ban-types */',
        },
      },
    }),
  },
};

export default config;
