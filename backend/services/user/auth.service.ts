import prisma from "../../models/prisma";
import { handlePrismaError } from "../../errors/prismaErrorHandler";
import { handleAuthError } from "../../errors/authErrorHandler";
import { comparePasswords, createTokens } from "../../auth/auth";
import { UserInput, AuthPayload } from "../../generated/graphql";

export class AuthService {
  async createUser(user: UserInput): Promise<AuthPayload> {
    try {
      const createdUser = await prisma.user.create({
        data: {
          ...user,
          likedComments: { create: [] },
          comments: { create: [] },
          posts: { create: [] },
          likedPosts: { create: [] },
        },
      });

      const tokens = createTokens(createdUser.id);
      return {
        user: {
          ...createdUser,
          comments: [],
          likedComments: [],
          likedPosts: [],
          posts: [],
        },
        ...tokens,
      };
    } catch (error: any) {
      throw handlePrismaError(error);
    }
  }
  
  async login(email: string, password: string): Promise<AuthPayload> {
    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = comparePasswords(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }
      const { accessToken, refreshToken } = createTokens(user.id);
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
      return {
        user: {
          ...user,
          comments: [],
          likedComments: [],
          likedPosts: [],
          posts: [],
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw handleAuthError(error);
    }
  }
}
