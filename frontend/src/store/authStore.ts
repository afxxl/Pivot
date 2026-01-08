import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "../api/auth.api";
import { storage } from "../utils/storage";

interface AuthState {
  user: User | null;
  token: string | null;
  subdomain: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string, subdomain: string) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      token: null,
      subdomain: null,
      isAuthenticated: false,

      setAuth: (user, token, subdomain) => {
        storage.setToken(token);
        storage.setUser(user);
        storage.setSubdomain(subdomain);

        set(
          {
            user,
            token,
            subdomain,
            isAuthenticated: true,
          },
          false,
          "auth/setAuth",
        );
      },

      logout: () => {
        storage.clear();

        set(
          {
            user: null,
            token: null,
            subdomain: null,
            isAuthenticated: false,
          },
          false,
          "auth/logout",
        );
      },

      initAuth: () => {
        const token = storage.getToken();
        const user = storage.getUser();
        const subdomain = storage.getSubdomain();

        if (token && user && subdomain) {
          set(
            {
              user,
              token,
              subdomain,
              isAuthenticated: true,
            },
            false,
            "auth/initAuth",
          );
        }
      },
    }),
    {
      name: "AuthStore", // 👈 appears in Redux DevTools dropdown
    },
  ),
);
