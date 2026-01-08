import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const subdomain = localStorage.getItem("subdomain");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (import.meta.env.DEV && subdomain) {
    config.headers["X-Company-Subdomain"] = subdomain;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const hasToken = localStorage.getItem("token");
      const isLoginPage = window.location.pathname === "/login";

      // Only redirect if user was authenticated or not on login page
      if (hasToken || !isLoginPage) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("subdomain");

        // Only redirect if not already on login page
        if (!isLoginPage) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
