import { create } from "zustand";

export const useEventStore = create((set) => ({
  searchKey: "",
  setSearchKey: (key) => set({ searchKey: key }),
}));
