import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // Backend-ийн схемүүдийг унших зам
  schema: 'apps/team1-backend/src/graphql-yoga/typeDefs/*.ts',

  generates: {
    // BACKEND: Resolvers-ийн төрлүүдийг үүсгэх
    'apps/team1-backend/src/graphql-yoga/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        // САЯНЫ ҮҮСГЭСЭН context.ts ФАЙЛТАЙ ХОЛБОХ ХЭСЭГ:
        contextType: 'apps/team1-backend/src/graphql-yoga/context#Context',
      },
    },

    // FRONTEND: team1-frontend
    'apps/team1-frontend/src/graphql/__generated__/': {
      preset: 'client',
      documents: 'apps/team1-frontend/src/**/*.tsx',
      plugins: [],
    },

    // DASHBOARD: team1-dashboard
    'apps/team1-dashboard/src/graphql/__generated__/': {
      preset: 'client',
      documents: 'apps/team1-dashboard/src/**/*.tsx',
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
