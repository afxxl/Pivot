import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Logo } from "@/components/shared/Logo";
import { Home, ClipboardList, FolderKanban, Clock, LogOut } from "lucide-react";
export const MemberLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    const SidebarItem = ({
        icon: Icon,
        label,
        path,
    }: {
        icon: any;
        label: string;
        path: string;
    }) => {
        const isActive = location.pathname === path;
        return (
            <button
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                        ? "bg-blue-700 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700/50"
                    }`}
            >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
            </button>
        );
    };
    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-blue-600 text-white flex flex-col shadow-xl">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <Logo size="md" showText={false} variant="light" />
                        <div>
                            <h1 className="text-xl font-bold">PIVOT</h1>
                            <p className="text-xs text-blue-200">
                                {user?.firstName} {user?.lastName}
                            </p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <SidebarItem icon={Home} label="Dashboard" path="/member/dashboard" />
                    <SidebarItem icon={ClipboardList} label="My Tasks" path="/member/tasks" />
                    <SidebarItem icon={FolderKanban} label="Projects" path="/member/projects" />
                    <SidebarItem icon={Clock} label="Time Tracking" path="/member/time-tracking" />
                </nav>
                <div className="p-4 border-t border-white/10">
                    <div className="mb-3 px-4 py-2 bg-blue-700/50 rounded-lg">
                        <p className="text-xs text-blue-200">Signed in as</p>
                        <p className="text-sm font-semibold truncate">{user?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700/50 transition-all"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};
