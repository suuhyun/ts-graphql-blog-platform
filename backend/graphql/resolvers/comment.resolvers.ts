import { CommentService } from "../../services/comment.service";
import { UserService } from "../../services/user.service";
import { PostService } from "../../services/post.service";
import { Comment } from "../../generated/graphql";

const commentService = CommentService.getInstance();
const userService = UserService.getInstance();
const postService = PostService.getInstance();

export const commentResolvers = {
  Query: {
    comments: () => commentService.getAllComments(), // Fetch all comments
    comment: (args: { id: string }) => commentService.getCommentById(parseInt(args.id)), // Fetch specific comment
  },
  
  Comment: {
    author: (parent: Comment) => userService.getUserById(parent.authorId),
    post: (parent: Comment) => postService.getPostById(parent.postId),
    likes: (parent: Comment) => userService.getCommentLikers(parent.id),
  },
};
