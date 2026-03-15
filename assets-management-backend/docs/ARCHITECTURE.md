# Clean Architecture – GraphQL + Drizzle

## Recommended folder structure

```
src/
├── application/                 # Use-cases (business logic)
│   └── assets/
│       ├── getAssets.ts
│       ├── createAsset.ts
│       ├── updateAsset.ts
│       ├── deleteAsset.ts
│       └── index.ts
│
├── db/                          # Data access (repositories / Drizzle)
│   ├── client.ts
│   ├── schema.ts
│   └── assets/
│       ├── types.ts
│       ├── queries/
│       │   ├── getAssets.ts
│       │   ├── getAssetById.ts
│       │   └── index.ts
│       └── mutations/
│           ├── createAsset.ts
│           ├── updateAssetById.ts
│           ├── deleteAssetById.ts
│           ├── deleteAndArchiveAsset.ts
│           ├── ensureCategory.ts
│           └── index.ts
│
├── graphql-gql/                 # API (GraphQL)
│   ├── schema.ts               # Single typeDefs (or merged from schema/modules)
│   ├── resolvers/
│   │   ├── index.ts            # mergeResolvers([rootResolvers, assetResolvers, ...])
│   │   ├── queries.ts         # Root Query (non-asset fields)
│   │   ├── mutations.ts       # Root Mutation (non-asset fields)
│   │   └── domains/
│   │       └── assets/
│   │           ├── index.ts   # assetResolvers (Query.assets, Mutation.createAsset, Asset)
│   │           ├── queries/
│   │           │   ├── getAssets.ts
│   │           │   └── getAsset.ts
│   │           └── mutations/
│   │               ├── createAsset.ts
│   │               ├── updateAsset.ts
│   │               └── deleteAsset.ts
│   └── schema/
│       └── modules/           # Optional: modular typeDefs for mergeTypeDefs
│           └── assetTypeDefs.ts
│
└── app/
    └── api/
        └── graphql/
            └── route.ts       # makeExecutableSchema({ typeDefs, resolvers })
```

## Layers

| Layer        | Role                | Examples                          |
|-------------|---------------------|-----------------------------------|
| **API**     | HTTP/GraphQL entry  | Resolvers, typeDefs, route.ts    |
| **Application** | Use-cases / orchestration | getAssetsUseCase, createAssetUseCase |
| **Data**    | DB access           | db/assets/queries, db/assets/mutations |

Resolvers only call application use-cases (or db for simple reads). Use-cases call db and contain rules (e.g. office normalization, category resolution, archive vs delete).

## Schema stitching with @graphql-tools/merge

- **Resolvers**: `mergeResolvers([rootResolvers, assetResolvers, …])` in `resolvers/index.ts`. Domain resolvers export `{ Query: { assets, asset }, Mutation: { createAsset, updateAsset, deleteAsset }, Asset: { … } }`.
- **TypeDefs**: To split the schema, define modules that use `extend type Query` / `extend type Mutation` and a base schema that only declares `type Query { }` and `type Mutation { }`. Then:

```ts
import { mergeTypeDefs } from "@graphql-tools/merge";
import { baseTypeDefs } from "./schema/base";
import { assetTypeDefs } from "./schema/modules/assetTypeDefs";

const typeDefs = mergeTypeDefs([baseTypeDefs, assetTypeDefs]);
```

See `graphql-gql/schema/modules/assetTypeDefs.example.ts` for the shape of one module.
