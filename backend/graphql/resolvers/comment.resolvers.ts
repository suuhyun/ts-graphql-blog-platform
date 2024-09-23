import { CommentService } from "../../services/comment.service";
import { UserService } from "../../services/user/user.service";
import { PostService } from "../../services/post.service";
import {
  Comment,
  CommentInput,
  UpdateCommentInput,
} from "../../generated/graphql";

const commentService = CommentService.getInstance();
const userService = UserService.getInstance();
const postService = PostService.getInstance();

export const commentResolvers = {
  Query: {
    comments: () => commentService.getAllComments(), // Fetch all comments
    comment: (parent: any, args: { id: number }) => commentService.getCommentById(args.id), // Fetch specific comment
  },
  Mutation: {
    createComment: (
      parent: any,
      args: { postId: number; userId: number; comment: CommentInput }
    ) => commentService.createComment(args.postId, args.userId, args.comment), // Create a comment
    updateComment: (
      parent: any,
      args: { id: number; comment: UpdateCommentInput }
    ) => commentService.updateComment(args.id, args.comment), // Update a comment
    deleteComment: (parent: any, args: { id: number }) =>
      commentService.deleteComment(args.id), // Delete a comment
  },
  Comment: {
    author: (parent: Comment) => userService.getUserById(parent.authorId),
    post: (parent: Comment) => postService.getPostById(parent.postId),
    likes: (parent: Comment) => userService.getCommentLikers(parent.id),
  },
};
