import { Post, PostInput } from "../../generated/graphql";
import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user.service";

const postService = PostService.getInstance();
const userService = UserService.getInstance();

export const postResolvers = {
  Query: {
    posts: () => postService.getAllPosts(),
    post: (args: { id: string }) => postService.getPostById(parseInt(args.id)),
  },
  Mutation: {
    createPost: (parent: any, args: {post: PostInput}) => postService.createPost(args.post),
  },
  Post: {
    likes: (parent: Post) => userService.getPostLikers(parent.id),
  }
};
