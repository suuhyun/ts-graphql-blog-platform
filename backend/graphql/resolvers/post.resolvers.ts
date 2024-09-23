import { Post, PostInput, UpdatePostInput } from "../../generated/graphql";
import { CommentService } from "../../services/comment.service";
import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user/user.service";

const postService = PostService.getInstance();
const userService = UserService.getInstance();
const commentService = CommentService.getInstance();

export const postResolvers = {
  Query: {
    posts: () => postService.getAllPosts(),
    post: (parent: any, args: { id: number }) => postService.getPostById(args.id),
  },
  Mutation: {
    createPost: (parent: any, args: { userId: number; post: PostInput }) =>
      postService.createPost(args.userId, args.post),
    updatePost: (parent: any, args: { id: number; post: UpdatePostInput }) =>
      postService.updatePost(args.id, args.post),
    deletePost: (parent: any, args: { id: number }) =>
      postService.deletePost(args.id),
  },
  Post: {
    likes: (parent: Post) => userService.getPostLikers(parent.id),
    author: (parent: Post) => userService.getUserById(parent.authorId),
    comments: (parent: Post) => commentService.getCommentsByPostId(parent.id),
  },
};
