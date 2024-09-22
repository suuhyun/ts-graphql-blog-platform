import { UserInput, User, UpdateUserInput } from "../generated/graphql";
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
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Could not fetch users");
    }
  }

  async getUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw new Error("Could not fetch user");
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

  async getPostLikers(postId: number) {
    try {
      const likers = await prisma.user.findMany({
        where: { likedPosts: { some: { id: postId } } },
      });
      return likers || [];
    } catch (error) {
      console.error("Error fetching post likers:", error);
      throw new Error("Could not fetch post likers");
    }
  }

  async getCommentLikers(commentId: number) {
    try {
      const likers = await prisma.user.findMany({
        where: { likedComments: { some: { id: commentId } } },
      });
      return likers || [];
    } catch (error) {
      console.error("Error fetching comment likers:", error);
      throw new Error("Could not fetch comment likers");
    }
  }

  async createUser(user: UserInput) {
    try {
      const newUser = {
        ...user,
        likedComments: { create: [] },
        comments: { create: [] },
        posts: { create: [] },
        likedPosts: { create: [] },
      };
      const createdUser = await prisma.user.create({
        data: newUser,
      });
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Could not create user");
    }
  }

  async updateUser(userId: number, user: UpdateUserInput) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username: user.username ?? undefined,
          email: user.email ?? undefined,
          firstName: user.firstName ?? undefined,
          lastName: user.lastName ?? undefined,
        },
      });
      console.log(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Could not update user");
    }
  }

  async deleteUser(userId: number) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Could not delete user");
    }
  }

  async toggleLike(
    userId: number,
    relationField: 'likedPosts' | 'likedComments',
    entityId: number
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          [relationField]: {
            where: { id: entityId },
          },
        },
      });
  
      const alreadyLiked = user && user[relationField].length > 0;
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          [relationField]: alreadyLiked
            ? { disconnect: { id: entityId } }
            : { connect: { id: entityId } },
        },
      });
  
      return updatedUser;
    } catch (error) {
      console.error(`Error toggling like on ${relationField}:`, error);
      throw new Error(`Could not toggle like on ${relationField}`);
    }
  }
  
  async toggleLikePost(userId: number, postId: number) {
    return this.toggleLike(userId, 'likedPosts', postId);
  }

  async toggleLikeComment(userId: number, commentId: number) {
    return this.toggleLike(userId, 'likedComments', commentId);
  }
}
