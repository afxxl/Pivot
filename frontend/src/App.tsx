import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

// Route Protection
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";

// Layouts
import { AdminLayout } from "./components/layouts/AdminLayout";
import SuperAdminLayout from "./components/layouts/SuperAdminLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AcceptInvite from "./pages/auth/AcceptInvite";

// SuperAdmin Pages
import SuperAdminLogin from "./pages/superAdmin/SuperAdminLogin";
import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard";
import SuperAdminGetAllCompanies from "./pages/superAdmin/SuperAdminGetAllCompanies";
import SuperAdminCompanyDetails from "./pages/superAdmin/SuperAdminCompanyDetails";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import TeamMembers from "./pages/admin/TeamMembers";
import InviteMember from "./pages/admin/InviteMembers";
import CompanyProfile from "./pages/admin/CompanyProfile";
import Projects from "./pages/admin/Projects";
import Analytics from "./pages/admin/Analytics";

// Member Pages
import MemberDashboard from "./pages/member/MemberDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/accept-invite" element={<AcceptInvite />} />

          {/* SuperAdmin Routes - Nested with Layout */}
          <Route
            path="/super-admin/login"
            element={
              <PublicRoute>
                <SuperAdminLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <SuperAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="companies" element={<SuperAdminGetAllCompanies />} />
            <Route
              path="companies/:id"
              element={<SuperAdminCompanyDetails />}
            />
            <Route
              path="subscription-plans"
              element={<div>Subscription Plans - Coming Soon</div>}
            />
            <Route
              path="analytics"
              element={<div>Analytics - Coming Soon</div>}
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="members" element={<TeamMembers />} />
            <Route path="members/invite" element={<InviteMember />} />
            <Route path="projects" element={<Projects />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>

          {/* Member Routes */}
          <Route
            path="/member/dashboard"
            element={
              <ProtectedRoute allowedRoles={["member"]}>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
