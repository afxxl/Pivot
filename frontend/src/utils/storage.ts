import type { User } from "../api/auth.api";

export const storage = {
  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  removeToken: () => {
    return localStorage.removeItem("token");
  },

  setUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem("user");
  },

  setSubdomain: (subdomain: string) => {
    localStorage.setItem("subdomain", subdomain);
  },

  getSubdomain: (): string | null => {
    return localStorage.getItem("subdomain");
  },

  removeSubdmain: () => {
    localStorage.removeItem("subdomain");
  },

  clear: () => {
    localStorage.clear();
  },
};
