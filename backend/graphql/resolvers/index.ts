import { postResolvers } from "./post.resolvers";
import { userResolvers } from "./user.resolvers";

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
    },
    User: {
        ...userResolvers.User,
    },
    Post: {
        ...postResolvers.Post,
    }
}

export default resolvers;
