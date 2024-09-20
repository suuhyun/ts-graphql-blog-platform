import { PostService } from "../../services/post.service";

const postService = new PostService();

export const postResolvers = {
  Query: {
    posts: () => postService.getAllPosts(),
    post: (args: { id: string }) => postService.getPostById(args.id),
  },
};
