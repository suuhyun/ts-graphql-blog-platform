import prisma from "../../models/prisma";
import { handlePrismaError } from "../../errors/prismaErrorHandler";
import { handleAuthError } from "../../errors/authErrorHandler";
import {
  comparePasswords,
  createTokens,
  hashPassword,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../auth/auth";
import { UserInput } from "../../generated/graphql";
import { access } from "fs";
import { log } from "console";

export class AuthService {
  async logout(id: number) {
    try {
      await prisma.user.update({
        where: { id },
        data: { refreshToken: null },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
  async createUser(user: UserInput) {
    try {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
      const createdUser = await prisma.user.create({
        data: {
          ...user,
          likedComments: { create: [] },
          comments: { create: [] },
          posts: { create: [] },
          likedPosts: { create: [] },
        },
      });
      return createdUser;
    } catch (error: any) {
      throw handlePrismaError(error);
    }
  }

  async login(loginUser: { email: string; password: string }) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: loginUser.email },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = comparePasswords(loginUser.password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }
      const { accessToken, refreshToken } = createTokens(user.id);
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  async refreshToken(refreshToken: string) {
    try {
      console.log({refreshToken})
      const user = await prisma.user.findFirst({
        where: { refreshToken: refreshToken },
      });
      const payload = verifyRefreshToken(refreshToken);
      if (!user || typeof payload === "string" || !payload.id) {
        throw new Error("Invalid refresh token");
      }
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = createTokens(
        user.id
      );
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });
      return { newAccessToken, newRefreshToken, user };
    } catch (error) {
      throw handleAuthError(error);
    }
  }
}
