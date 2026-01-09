import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";
import TeamMembers from "./pages/admin/TeamMembers";
import InviteMember from "./pages/admin/InviteMembers";
import CompanyProfile from "./pages/admin/CompanyProfile";
import Projects from "./pages/admin/Projects";
import Analytics from "./pages/admin/Analytics";
import AcceptInvite from "./pages/auth/AcceptInvite";
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<CompanyProfile />} />
          <Route path="/admin/members" element={<TeamMembers />} />
          <Route path="/admin/members/invite" element={<InviteMember />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/accept-invite" element={<AcceptInvite />} />
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/" element={<div>Home - Coming Soon </div>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
