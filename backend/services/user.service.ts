import { create } from "domain";
import { UserInput } from "../generated/graphql";
import prisma from "../models/prisma";

export class UserService {
  private static instance: UserService;

  // can't create instance outside
  private constructor() {}

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    console.log(users)
    return users || [];
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getCommentsByUserId(userId: number) {
    const comments = await prisma.comment.findMany({
      where: { authorId: userId },
    });
    return comments || [];
  }

  async getPostLikers(postId: number) {
    const likers = await prisma.user.findMany({
      where: { likedPosts: { some: { id: postId } } },
    });
    return likers || [];
  }

  async getCommentLikers(commentId: number) {
    const likers = await prisma.user.findMany({
      where: { likedComments: { some: { id: commentId } } },
    });
    return likers || [];
  }

  async createUser(user: UserInput) {
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user?.lastName,
        username: user.username,
      },
    });
    console.log(createdUser);
    return createdUser;
  }
}
