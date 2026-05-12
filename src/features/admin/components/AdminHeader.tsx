import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, User, KeyRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ sidebarCollapsed }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    {
      id: 1,
      type: "kyc",
      message: "Hồ sơ gia sư mới: Nguyễn Thị Lan Anh đang chờ duyệt",
      time: "5 phút trước",
      unread: true,
    },
    {
      id: 2,
      type: "dispute",
      message: "Tranh chấp DSP-001 vừa được tạo bởi học sinh Đinh Văn Bình",
      time: "30 phút trước",
      unread: true,
    },
    {
      id: 3,
      type: "payout",
      message: "Gia sư Lê Văn Khoa yêu cầu giải ngân 1,350,000đ",
      time: "2 giờ trước",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const notifTypeColor: Record<string, string> = {
    kyc: "bg-blue-500",
    dispute: "bg-red-500",
    payout: "bg-green-500",
  };

  return (
    <header
      className={`
        fixed top-0 right-0 h-16 bg-white border-b border-slate-200 z-30
        flex items-center justify-between px-6
        transition-all duration-300
        ${sidebarCollapsed ? "left-[72px]" : "left-[256px]"}
      `}
    >
      {/* Search */}
      <div className="relative w-80 max-w-full">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Tìm kiếm user, giao dịch, ticket..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder-slate-400 text-slate-700"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setDropdownOpen(false);
            }}
            className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-800 transition-all"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <p className="font-semibold text-slate-800 text-sm">Thông báo</p>
                <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                  Đánh dấu tất cả đã đọc
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0 ${
                      notif.unread ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notifTypeColor[notif.type]}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 leading-snug">
                          {notif.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                      </div>
                      {notif.unread && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">SA</span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-none">
                Super Admin
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">admin@nedu.vn</p>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs text-slate-500">Đang đăng nhập với</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  admin@nedu.vn
                </p>
              </div>
              <div className="py-1.5">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <User size={15} className="text-slate-400" />
                  Hồ sơ của tôi
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <KeyRound size={15} className="text-slate-400" />
                  Đổi mật khẩu
                </button>
              </div>
              <div className="border-t border-slate-100 py-1.5">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
