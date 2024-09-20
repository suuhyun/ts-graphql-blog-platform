import prisma from "../models/prisma";

export class PostService {
  async getAllPosts() {
    return prisma.post.findMany();
  }

  async getPostById(id: string) {
    return prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
  }
}
