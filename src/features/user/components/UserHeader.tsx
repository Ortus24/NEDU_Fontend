import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../shared/components/Logo";
import { Search, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { logoutApi } from "../../auth/api";
import { AuthUser } from "../../auth/types";

export function UserHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    await logoutApi();
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary transition-all"
            >
              <Logo />
              <h1 className="text-2xl font-bold tracking-tight">NEDU</h1>
            </Link>

            {/* Search Bar - Hidden on small screens */}
            <div className="relative hidden lg:block w-80">
              <Search
                size={20}
                className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                strokeWidth={2}
              />
              <input
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm focus:outline-none"
                placeholder="Tìm kiếm gia sư, khóa học..."
                type="text"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link
                className="text-sm font-semibold hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
                to="/tutor"
              >
                Tìm gia sư
              </Link>
              <Link
                className="text-sm font-semibold hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
                to="/about"
              >
                Về chúng tôi
              </Link>
              <Link
                className="text-sm font-semibold hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
                to="/faq"
              >
                FAQ
              </Link>
            </div>

            <div className="flex items-center gap-3 ml-2 lg:ml-6 border-l border-slate-200 dark:border-slate-700 pl-4 lg:pl-6 relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors"
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserIcon size={16} />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hidden sm:block max-w-[120px] truncate">
                      {user.fullName || user.email}
                    </span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <p className="text-xs text-slate-500">Đăng nhập với</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                          {user.email}
                        </p>
                      </div>
                      
                      {user.role === "TUTOR" && (
                        <Link
                          to="/tutor/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 w-full text-left transition-colors"
                        >
                          Dashboard Gia sư
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-colors"
                      >
                        <LogOut size={16} />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
