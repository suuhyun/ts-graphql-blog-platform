import { Prisma } from "@prisma/client";

export const handlePrismaError = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const targetField = (error.meta as { target: string[] })?.target?.[0];
      if (targetField === "email") {
        throw new Error("Email is already in use");
      } else if (targetField === "username") {
        throw new Error("Username is already in use");
      }
    }
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new Error("Failed to initialize Prisma Client");
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new Error("Invalid input data provided");
  }

  return new Error("An unexpected error occurred");
};
