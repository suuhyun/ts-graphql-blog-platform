import { CommentInput, UpdateCommentInput } from "../generated/graphql";
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
    try {
      const comments = await prisma.comment.findMany();
      return comments || [];
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error("Could not fetch comments");
    }
  }

  async getCommentById(id: number) {
    try {
      const comment = await prisma.comment.findUnique({ where: { id } });
      if (!comment) {
        throw new Error("Comment not found");
      }
      return comment;
    } catch (error) {
      console.error(`Error fetching comment with id ${id}:`, error);
      throw new Error("Could not fetch comment");
    }
  }

  async getCommentsByUserId(userId: number) {
    try {
      const comments = await prisma.comment.findMany({
        where: { authorId: userId },
      });
      return comments || [];
    } catch (error) {
      console.error(
        `Error fetching comments by user with id ${userId}:`,
        error
      );
      throw new Error("Could not fetch comments");
    }
  }

  async getCommentsByPostId(postId: number) {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId },
      });
      return comments || [];
    } catch (error) {
      console.error(
        `Error fetching comments by post with id ${postId}:`,
        error
      );
      throw new Error("Could not fetch comments");
    }
  }

  async getLikedComments(userId: number) {
    try {
      const likedComments = await prisma.comment.findMany({
        where: { likes: { some: { id: userId } } },
      });
      return likedComments || [];
    } catch (error) {
      console.error("Error fetching liked comments:", error);
      throw new Error("Could not fetch liked comments");
    }
  }

  async createComment(postId: number, userId: number, comment: CommentInput) {
    try {
      console.log(postId, userId, comment);
      const newComment = await prisma.comment.create({
        data: {
          body: comment.body,
          authorId: userId,
          postId: postId,
        //   post: { connect: { id: postId } },
        },
        include: {
          post: true,
          author: true,
        },
      });
      return newComment;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw new Error("Could not create comment");
    }
  }

  async updateComment(commentId: number, comment: UpdateCommentInput) {
    try {
      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: {
          body: comment.body ?? "",
          updatedAt: new Date(),
        },
      });
      return updatedComment;
    } catch (error) {
      console.error(`Error updating comment with id ${commentId}:`, error);
      throw new Error("Could not update comment");
    }
  }

  async deleteComment(id: number) {
    try {
      const deletedComment = await prisma.comment.delete({ where: { id } });
      return deletedComment;
    } catch (error) {
      console.error(`Error deleting comment with id ${id}:`, error);
      throw new Error("Could not delete comment");
    }
  }
}
