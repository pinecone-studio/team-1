import { Mutation } from "./mutations/index";
import { Query } from "./queries/index";
import { typeResolvers } from "./types";

export const resolvers = {
  Query,
  Mutation,
  ...typeResolvers,
};
