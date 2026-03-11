export const assetTypeDefs = /* GraphQL */ `
  type Asset {
    id: ID!
    assetTag: String!
    category: String!
  }

  type Query {
    assets: [Asset!]!
  }

  type Mutation {
    createAsset(id: ID!, assetTag: String!, ...): Asset!
  }
`;
