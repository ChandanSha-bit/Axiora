import { create } from "zustand";
import { persist } from "zustand/middleware";

// INDUSTRIAL RULE: Define Types/Interfaces first
// This makes the code self-documenting and prevents bugs.
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  subscriptionTier: string;
  energy: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateEnergy: (newEnergy: number) => void;
}

// create(): This is the main function to build a store.
// persist(): This middleware saves the "auth-storage" to the browser.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      // setAuth: Used after a successful Login or Register
      setAuth: (user, token) => set({ user, token }),

      // logout: Clears everything
      logout: () => set({ user: null, token: null }),

      // updateEnergy: Used when a user spends or buys neural energy
      updateEnergy: (newEnergy) => 
        set((state) => ({
          user: state.user ? { ...state.user, energy: newEnergy } : null
        })),
    }),
    {
      name: "atlas-auth-storage", // Unique key in localStorage
    }
  )
);
