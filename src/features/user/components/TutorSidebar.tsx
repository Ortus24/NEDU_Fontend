import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  School,
  CalendarDays,
  CreditCard,
  Settings,
  HelpCircle,
  Plus,
} from "lucide-react";

const NAV_ITEMS = [
  {
    icon: <LayoutDashboard size={18} />,
    label: "Overview",
    to: "/tutor/dashboard",
  },
  { icon: <School size={18} />, label: "Classes", to: "/tutor/classes" },
  {
    icon: <CalendarDays size={18} />,
    label: "Schedule",
    to: "/tutor/schedule",
  },
  { icon: <CreditCard size={18} />, label: "Finances", to: "/tutor/finances" },
];

interface TutorSidebarProps {
  name?: string;
  role?: string;
  avatar?: string;
}

export default function TutorSidebar({
  name = "Nguyễn Minh",
  role = "Senior Tutor",
  avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuATq70Z77Ngio6chV6lIOvd0BboQz3VyMrkewr6gt1VKiPt2W8f2ib1_6c0WXffwa7t3JGtGjyYJTkKZyWiNmg_XBjA6pRInYr3cY9IF-0RHxJBDnRIH87lmCeqYGhwgJikBlvQUG-kRY31rASpMWdXBgHJOASc2WCaqsuC2l13cJFaJ8hdJu_BOXItTBhC9vI7cGZv72gufYl1gcV5HABbpJrhq3BE0LfINfVgkHA3OlKugU6Gwe8SVBjG4ktd2n0kz9yCGFWqhYbS",
}: TutorSidebarProps) {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 shrink-0 fixed left-0 top-16 bottom-0 bg-white border-r border-slate-100 flex flex-col py-6 shadow-sm z-30 overflow-y-auto">
      {/* Main nav */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
                isActive
                  ? "bg-primary/10 text-primary font-bold border-r-4 border-primary"
                  : "text-slate-500 hover:text-primary hover:bg-slate-100"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pt-4 border-t border-slate-100 space-y-3">
        <Link
          to="/tutor/classes"
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/30"
        >
          <Plus size={16} />
          Thêm lớp mới
        </Link>

        <Link
          to="#"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-primary hover:bg-slate-100 transition-all"
        >
          <Settings size={18} />
          Settings
        </Link>

        <Link
          to="#"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-primary hover:bg-slate-100 transition-all"
        >
          <HelpCircle size={18} />
          Support
        </Link>

        {/* Profile chip */}
        <div className="flex items-center gap-3 px-3 py-3 bg-slate-50 rounded-xl mt-2">
          <img
            src={avatar}
            alt={name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">{name}</p>
            <p className="text-xs text-slate-400 truncate">{role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
