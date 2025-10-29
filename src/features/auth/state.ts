import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  displayName: string;
  roomName: string;
  login: (payload: { displayName: string; roomName: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  displayName: "",
  roomName: "",
  login: ({ displayName, roomName }) => set({ isAuthenticated: true, displayName, roomName }),
  logout: () => set({ isAuthenticated: false, displayName: "", roomName: "" })
}));
