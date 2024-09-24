import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user/user.service";
import { AuthService } from "../../services/user/auth.service";
import { CommentService } from "../../services/comment.service";
import { LoginUserInput, User, UserInput } from "../../generated/graphql";
import { GraphQLError } from "graphql";

const userService = UserService.getInstance();
const authService = new AuthService();
const postService = PostService.getInstance();
const commentService = CommentService.getInstance();

export const userResolvers = {
  Query: {
    users: async () => userService.getAllUsers(),
    user: async (_: any, args: { id: number }) =>
      userService.getUserById(args.id),
  },
  Mutation: {
    createUser: async (parent: any, args: { user: UserInput }) =>
      authService.createUser(args.user),
    login: async (
      parent: any,
      args: { loginUser: LoginUserInput },
      context: any
    ) => {
      const { user, accessToken, refreshToken } = await authService.login(
        args.loginUser
      );
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
    logout: async (parent: any, args: any, context: any) => {
      await authService.logout(context.user.id);
      context.res.clearCookie("access-token");
      context.res.clearCookie("refresh-token");
      return true;
    },
    refreshToken: async (parent: any, args: any, context: any) => {
      const userRefreshToken = context.req.cookies["refresh-token"];
      console.log({userRefreshToken})
      const { newAccessToken, newRefreshToken, user } =
        await authService.refreshToken(userRefreshToken);
      context.res.cookie("access-token", newAccessToken, {
        httpOnly: true,
        sameSite: "Strict",
      });
      context.res.cookie("refresh-token", newRefreshToken, {
        httpOnly: true,
        sameSite: "Strict",
      });
      return user;
    },
    updateUser: async (
      parent: any,
      args: { user: UserInput },
      context: any
    ) => {
      console.log({user: context.user})
      if (!context.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      console.log(context.user.id)
      return userService.updateUser(context.user.id, args.user);
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
