import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { useAuthStore } from "@/store/authStore";
import {
    Home,
    Building2,
    Users,
    FolderKanban,
    BarChart3,
    LogOut,
} from "lucide-react";

interface AdminLayoutProps {
    children: ReactNode;
}

interface SidebarItemProps {
    to: string;
    icon: ReactNode;
    label: string;
}

const SidebarItem = ({ to, icon, label }: SidebarItemProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-purple-100 hover:bg-white/5 hover:text-white"
                }`
            }
        >
            <span className="text-xl">{icon}</span>
            <span className="text-sm">{label}</span>
        </NavLink>
    );
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-[#562182] text-white flex flex-col shadow-xl">
                {/* Logo Section */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <Logo size="md" showText={false} />
                        <div>
                            <h1 className="text-xl font-bold">PIVOT</h1>
                            <p className="text-xs text-purple-200">
                                {user?.company?.name || "Company"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <SidebarItem to="/admin/dashboard" icon={<Home />} label="Dashboard" />
                    <SidebarItem
                        to="/admin/profile"
                        icon={<Building2 />}
                        label="Company Profile"
                    />
                    <SidebarItem to="/admin/members" icon={<Users />} label="Team Members" />
                    <SidebarItem
                        to="/admin/projects"
                        icon={<FolderKanban />}
                        label="Projects"
                    />
                    <SidebarItem
                        to="/admin/analytics"
                        icon={<BarChart3 />}
                        label="Analytics"
                    />
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center font-semibold text-white">
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-purple-200 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
};
