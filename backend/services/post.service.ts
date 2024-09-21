import { PostInput } from "../generated/graphql";
import prisma from "../models/prisma";

export class PostService {
  private static instance: PostService;

  // can't create instance outside
  private constructor() {}

  static getInstance() {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance;
  }

  async getAllPosts() {
    const posts = await prisma.post.findMany();
    return posts || [];
  }

  async getPostById(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }

  async getPostsByUserId(userId: number) {
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
    });
    return posts || [];
  }

  async getLikedPosts(userId: number) {
    const likedPosts = await prisma.post.findMany({
      where: { likes: { some: { id: userId } } },
    });
    return likedPosts || [];
  }

  async createPost(post: PostInput) {
    console.log(post)
    const createdPost = await prisma.post.create({
      data: {
        authorId: post.authorId,
        content: post.content,
        title: post.title,
      },
    });
    return createdPost;
  }
}
