import { postResolvers } from "./post.resolvers";
import { userResolvers } from "./user.resolvers";
import { commentResolvers } from "./comment.resolvers";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...commentResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...userResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
  Post: {
    ...postResolvers.Post,
  },
  Comment: {
    ...commentResolvers.Comment,
  },
};

export default resolvers;
