import mutationResolvers from "./mutations";
import queryResolvers from "./queries";

const resolvers = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
};

export default resolvers;
