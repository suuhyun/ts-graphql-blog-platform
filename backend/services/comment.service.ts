import prisma from "../models/prisma";

export class CommentService {
  private static instance: CommentService;

  // can't create instance outside
  private constructor() {}

  static getInstance() {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  async getAllComments() {
    const comments = await prisma.comment.findMany();
    return comments || [];
  }

  async getCommentById(id: number) {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  }

  async getCommentsByUserId(userId: number) {
    const comments = await prisma.comment.findMany({
      where: { authorId: userId },
    });
    return comments || [];
  }

  async getLikedComments(userId: number) {
    const likedComments = await prisma.comment.findMany({
      where: { likes: { some: { id: userId } } },
    });
    return likedComments || [];
  }
}
