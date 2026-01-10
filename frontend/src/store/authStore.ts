import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "../api/auth.api";
import type { SuperAdminUser } from "../api/superAdmin.api";
import { storage } from "../utils/storage";

type AuthUser = User | SuperAdminUser;

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  subdomain: string | null;
  isAuthenticated: boolean;

  setAuth: (user: AuthUser, token: string, subdomain?: string) => void;
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
        if (subdomain) {
          storage.setSubdomain(subdomain);
        }

        set(
          {
            user,
            token,
            subdomain: subdomain || null,
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

        // SuperAdmin can login without subdomain, regular users cannot
        const isSuperAdmin = user?.role === "super_admin";
        const hasRequiredData = token && user && (subdomain || isSuperAdmin);

        if (hasRequiredData) {
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
