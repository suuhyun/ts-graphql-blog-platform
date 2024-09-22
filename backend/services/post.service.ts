import { PostInput, UpdatePostInput } from "../generated/graphql";
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
    try {
      const posts = await prisma.post.findMany();
      return posts || [];
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Could not fetch posts");
    }
  }

  async getPostById(id: number) {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      console.error(`Error fetching post with id ${id}:`, error);
      throw new Error("Could not fetch post");
    }
  }

  async getPostsByUserId(userId: number) {
    try {
      const posts = await prisma.post.findMany({
        where: { authorId: userId },
      });
      return posts || [];
    } catch (error) {
      console.error(`Error fetching posts by user with id ${userId}:`, error);
      throw new Error("Could not fetch posts");
    }
  }

  async getLikedPosts(userId: number) {
    try {
      const likedPosts = await prisma.post.findMany({
        where: { likes: { some: { id: userId } } },
      });
      return likedPosts || [];
    } catch (error) {
      console.error("Error fetching liked posts:", error);
      throw new Error("Could not fetch liked posts");
    }
  }

  async createPost(userId: number, post: PostInput) {
    try {
      const createdPost = await prisma.post.create({
        data: {
          authorId: userId,
          ...post,
        },
        include: {
          author: true,
        },
      });
      return createdPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Could not create post");
    }
  }

  async updatePost(postId: number, post: UpdatePostInput) {
    try {
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title: post.title ?? "",
          content: post.content ?? "",
          updatedAt: new Date(),
        },
      });
      return updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Could not update post");
    }
  }

  async deletePost(postId: number) {
    try {
      const deletedPost = prisma.post.delete({
        where: { id: postId },
      });
      return deletedPost;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Could not delete post");
    }
  }
}
