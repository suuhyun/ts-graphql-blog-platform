import { UserService } from "../../services/user.service";

const userService = new UserService();

export const userResolvers = {
  Query: {
    users: () => userService.getAllUsers(),
    user: (args: { id: string }) => userService.getUserById(args.id),
  },
};
