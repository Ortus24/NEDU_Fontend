import React from "react";
import { Link } from "react-router-dom";

export function UserHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">
                school
              </span>
              <h1 className="text-2xl font-bold tracking-tight">NEDU</h1>
            </Link>

            {/* Search Bar - Hidden on small screens */}
            <div className="relative hidden lg:block w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
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
              <a
                className="text-sm font-semibold hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
                href="#"
              >
                Lớp học mới
              </a>
              <a
                className="text-sm font-semibold hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
                href="#"
              >
                Trở thành gia sư
              </a>
            </div>

            <div className="flex items-center gap-3 ml-2 lg:ml-6 border-l border-slate-200 dark:border-slate-700 pl-4 lg:pl-6">
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
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
