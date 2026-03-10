import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs/*.ts',
  generates: {
    'src/graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#GraphQLContext',
        useIndexSignature: true,
        enumsAsTypes: true,
        inputMaybeValue: 'T | undefined',
        mappers: {
          Employee: '../../db/schema#Employee as EmployeeModel',
        },
      },
    },
  },
};

export default config;
