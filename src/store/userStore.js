import { create } from "zustand";

export const useUserStore = create((set) => ({

  userDetails: {},
  updateUser: (newUser) => set({ userDetails: newUser }),

}));
