import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  User,
  TrendingUp,
  CreditCard,
  Bell,
  Settings,
  GraduationCap,
  LogOut,
  ChevronDown
} from "lucide-react";

export default function StudentPortalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    // { to: "/dashboard", label: "Tổng quan", icon: <LayoutDashboard size={18} /> },
    { to: "/courses", label: "Khóa học", icon: <GraduationCap size={18} /> },
    { to: "/tutor", label: "Gia sư", icon: <User size={18} /> },
    { to: "/learning-progress", label: "Tiến trình", icon: <TrendingUp size={18} /> },
    { to: "/billing", label: "Thanh toán", icon: <CreditCard size={18} /> },
  ];

  // Logic đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Thêm logic xóa token/session ở đây nếu cần
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tight">NEDU</Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-1 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${location.pathname === item.to
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Thông báo">
                <Bell size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Cài đặt">
                <Settings size={20} />
              </button>
            </div>


            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-1 group cursor-pointer"
              >
                <div className="text-right hidden md:block">
                  <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-none">Nguyễn Thành An</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">Học viên Pro</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-indigo-100 border-2 border-indigo-200 group-hover:border-indigo-400 overflow-hidden shadow-sm transition-all">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=nedu-main" alt="Avatar" />
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 py-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1 md:hidden">
                    <p className="text-sm font-bold text-slate-900">Nguyễn Thành An</p>
                    <p className="text-[10px] text-slate-400">Học viên Pro</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <User size={18} />
                    Hồ sơ của tôi
                  </Link>



                  <div className="h-px bg-slate-100 my-1 mx-2"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={18} />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ─────────────────────────────────────────────── */}
      <main className="flex-grow pt-24 pb-28 w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <Outlet />
      </main>

      {/* ── Mobile Bottom Nav ─────────────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-slate-200 px-4 py-3 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === item.to ? "text-indigo-600" : "text-slate-400"
              }`}
          >
            {React.cloneElement(item.icon as React.ReactElement<{ size?: number; fill?: string }>, {
              size: 20,
              fill: location.pathname === item.to ? "currentColor" : "none"
            })}
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
