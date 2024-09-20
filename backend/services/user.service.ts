import prisma from "../models/prisma";

export class UserService {
  async getAllUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  }
}
