import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // Local backend schema (keeps codegen aligned with repo)
  schema: '../../assets-management-backend/src/graphql-gql/schema.graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
