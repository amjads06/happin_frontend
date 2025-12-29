import { create } from "zustand";

export const useUserStore = create((set) => ({

  userDetails: {},
  updateUser: (newUser) => set({ userDetails: newUser }),

}));

export const useBookingDetails = create((set) => ({
  bookingDetails: null,

  setBookingDetails: (details) =>
    set({ bookingDetails: details }),

  clearBookingDetails: () =>
    set({ bookingDetails: null }),
}));