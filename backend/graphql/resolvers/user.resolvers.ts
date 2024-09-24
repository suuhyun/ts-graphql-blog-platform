import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user/user.service";
import { AuthService } from "../../services/user/auth.service";
import { CommentService } from "../../services/comment.service";
import { User, UserInput } from "../../generated/graphql";

const userService = UserService.getInstance();
const authService = new AuthService();
const postService = PostService.getInstance();
const commentService = CommentService.getInstance();

export const userResolvers = {
  Query: {
    users: () => userService.getAllUsers(),
    user: (_: any, args: { id: number }) => userService.getUserById(args.id),
  },
  Mutation: {
    createUser: async (parent: any, args: { user: UserInput }) =>
      authService.createUser(args.user),
    login: async (
      parent: any,
      args: { email: string; password: string },
      context: any
    ) => {
      const { user, accessToken, refreshToken } = await authService.login(
        args.email,
        args.password
      );
      console.log({refreshToken})
      context.res.cookie("access-token", accessToken, {
        httpOnly: true,
        sameSite: "Strict",
      });
      context.res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
      });
      return user;
    },
    logout: async (parent: any, args: { id: number }, context: any) => {
      authService.logout(args.id);
      context.res.clearCookie("access-token");
      context.res.clearCookie("refresh-token");
      return true;
    },
    refreshToken: async (
      parent: any,
      args: { refreshToken: string },
      context: any
    ) => {
      const { accessToken, refreshToken } = await authService.refreshToken(
        args.refreshToken
      );
      context.res.cookie("access-token", accessToken, {
        httpOnly: true,
        sameSite: "Strict",
      });
      context.res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
      });
      return { accessToken };
    },
    updateUser: async (
      parent: any,
      args: { id: number; user: UserInput },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      return userService.updateUser(args.id, args.user);
    },
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
