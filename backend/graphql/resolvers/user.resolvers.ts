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
    user: (_: any, args: { id: number }) => userService.getUserById(args.id),
  },
  Mutation: {
    createUser: async (parent: any, args: { user: UserInput }) =>
      userService.createUser(args.user),
    updateUser: async (parent: any, args: { id: number; user: UserInput }) =>
      userService.updateUser(args.id, args.user),
    deleteUser: async (parent: any, args: { id: number }) =>
      userService.deleteUser(args.id),
    toggleLikePost: async (
      parent: any,
      args: { userId: number; postId: number }
    ) => userService.toggleLikePost(args.userId, args.postId),
    toggleLikeComment: async (
      parent: any,
      args: { userId: number; commentId: number }
    ) => userService.toggleLikeComment(args.userId, args.commentId),
  },
  User: {
    posts: (parent: User) => postService.getPostsByUserId(parent.id),
    comments: (parent: User) => commentService.getCommentsByUserId(parent.id),
    likedPosts: (parent: User) => postService.getLikedPosts(parent.id),
    likedComments: (parent: User) => commentService.getLikedComments(parent.id),
  },
};
