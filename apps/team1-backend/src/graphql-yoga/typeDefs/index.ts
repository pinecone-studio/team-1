import { assetTypeDefs } from './asset';
import { employeeTypeDefs } from './employee';

const baseTypeDefs = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseTypeDefs, employeeTypeDefs, assetTypeDefs].join(
  '\n',
);
