/**
 * Example modular typeDefs for schema stitching.
 * Use with mergeTypeDefs([baseTypeDefs, assetTypeDefs]) once the main schema
 * is split into a base (without Asset and without assets/createAsset/updateAsset/deleteAsset).
 */
export const assetTypeDefs = /* GraphQL */ `
  type Asset {
    id: ID!
    assetTag: String!
    category: String!
    serialNumber: String!
    status: String!
    purchaseDate: Float
    purchaseCost: Float
    currentBookValue: Float
    locationId: String
    assignedTo: String
    imageUrl: String
    createdAt: Float!
    updatedAt: Float!
    deletedAt: Float
  }

  input AssetCreateInput {
    assetTag: String!
    category: String!
    serialNumber: String!
    status: String
    purchaseDate: Float
    purchaseCost: Float
    currentBookValue: Float
    locationId: String
    assignedTo: String
    imageUrl: String
    deletedAt: Float
  }

  input AssetUpdateInput {
    assetTag: String
    category: String
    serialNumber: String
    status: String
    purchaseDate: Float
    purchaseCost: Float
    currentBookValue: Float
    locationId: String
    assignedTo: String
    imageUrl: String
    deletedAt: Float
  }

  extend type Query {
    assets(office: String, categoryIds: [ID!], subCategoryIds: [ID!]): [Asset!]!
    asset(id: ID!): Asset
  }

  extend type Mutation {
    createAsset(input: AssetCreateInput!): Asset!
    updateAsset(id: ID!, input: AssetUpdateInput!): Asset
    deleteAsset(id: ID!): Boolean!
  }
`;
