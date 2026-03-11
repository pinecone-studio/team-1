export const assetTypeDefs = /* GraphQL */ `
  type Asset {
    id: ID!
    assetTag: String!
    category: String!
  }

  extend type Query {
    assets: [Asset!]!
  }

  input CreateAssetInput {
    assetTag: String!
    category: String!
  }

  extend type Mutation {
    # ЗӨВ: Талбаруудыг тодорхой бичих эсвэл input ашиглах
    createAsset(input: CreateAssetInput!): Asset!
  }
`;
