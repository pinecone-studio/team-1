import { assetResolvers } from './resolvers/asset';
import { mutationResolvers } from './resolvers/mutation';
import { queryResolvers } from './resolvers/query';
import { mutationTypeDefs } from './typeDefs/mutation';
import { queryTypeDefs } from './typeDefs/query';

export const typeDefs = [queryTypeDefs, mutationTypeDefs];

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Asset: assetResolvers,
};
