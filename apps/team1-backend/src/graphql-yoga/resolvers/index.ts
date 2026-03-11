import { employeeResolvers } from './employee';
import { assetResolvers } from './asset';

export const resolvers = {
  Query: {
    ...employeeResolvers.Query,
    ...assetResolvers.Query,
  },
  Mutation: {
    ...employeeResolvers.Mutation,
    ...assetResolvers.Mutation,
  },
};
