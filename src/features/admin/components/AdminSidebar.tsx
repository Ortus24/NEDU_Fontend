import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ShieldCheck,
  Wallet,
  MessageSquareWarning,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BookOpen,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  pendingKycCount?: number;
  pendingDisputeCount?: number;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed,
  onToggle,
  pendingKycCount = 3,
  pendingDisputeCount = 2,
}) => {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Tổng quan",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "students",
      label: "Học sinh",
      path: "/admin/students",
      icon: <Users size={20} />,
    },
    {
      id: "tutors",
      label: "Gia sư",
      path: "/admin/tutors",
      icon: <GraduationCap size={20} />,
    },
    {
      id: "kyc",
      label: "Duyệt hồ sơ eKYC",
      path: "/admin/kyc",
      icon: <ShieldCheck size={20} />,
      badge: pendingKycCount,
    },
    {
      id: "finance",
      label: "Tài chính",
      path: "/admin/finance",
      icon: <Wallet size={20} />,
    },
    {
      id: "disputes",
      label: "Tranh chấp",
      path: "/admin/disputes",
      icon: <MessageSquareWarning size={20} />,
      badge: pendingDisputeCount,
    },
    {
      id: "settings",
      label: "Cài đặt nền tảng",
      path: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-slate-900 flex flex-col z-40
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-[256px]"}
      `}
    >
      {/* Logo */}
      <div
        className={`
          flex items-center h-16 px-4 border-b border-slate-700/50 shrink-0
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
            <BookOpen size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-white font-bold text-lg leading-none tracking-wide">
                NEDU
              </p>
              <p className="text-slate-400 text-[10px] font-medium tracking-widest uppercase mt-0.5">
                Admin Portal
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `
              group flex items-center gap-3 px-3 py-2.5 rounded-xl
              transition-all duration-200 relative
              ${collapsed ? "justify-center" : ""}
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }
            `
            }
          >
            {({ isActive }) => (
              <>
                <span className={`shrink-0 ${isActive ? "text-white" : ""}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="text-sm font-medium truncate flex-1">
                    {item.label}
                  </span>
                )}
                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                      isActive
                        ? "bg-white text-blue-600"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
                {/* Tooltip khi collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-slate-700">
                    {item.label}
                    {item.badge && item.badge > 0 ? ` (${item.badge})` : ""}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 space-y-2 shrink-0">
        <div className="border-t border-slate-700/50 pt-3">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-slate-400 hover:bg-red-500/10 hover:text-red-400
              transition-all duration-200 group
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium">Đăng xuất</span>
            )}
            {collapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-slate-700">
                Đăng xuất
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-20 w-7 h-7 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 shadow-md"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
};

export default AdminSidebar;
