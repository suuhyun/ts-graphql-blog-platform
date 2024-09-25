import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: User) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  setCurrentUser: (user: User) =>
    set({ currentUser: user, isAuthenticated: true }),
  logoutUser: () => set({ currentUser: null, isAuthenticated: false }),
}));
