import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user.service";
import { CommentService } from "../../services/comment.service";
import { User, UserInput } from "../../generated/graphql";

const userService = UserService.getInstance();
const postService = PostService.getInstance();
const commentService = CommentService.getInstance();

export const userResolvers = {
  Query: {
    users: () => userService.getAllUsers(),
    user: (args: { id: string }) => userService.getUserById(parseInt(args.id)),
  },
  Mutation: {
    createUser: async (parent: any, args: { user: UserInput }) =>
      userService.createUser(args.user),
  },
  User: {
    posts: (parent: User) => postService.getPostsByUserId(parent.id),
    comments: (parent: User) => commentService.getCommentsByUserId(parent.id),
    likedPosts: (parent: User) => postService.getLikedPosts(parent.id),
    likedComments: (parent: User) => commentService.getLikedComments(parent.id),
  },
};
