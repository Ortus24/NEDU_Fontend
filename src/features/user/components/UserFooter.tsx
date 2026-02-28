import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../shared/components/Logo";
import { Mail, MapPin, Phone, Trophy } from "lucide-react";

export function UserFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-background-dark flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary opacity-90">
              <Logo />
              <h1 className="text-xl font-bold tracking-tight">NEDU</h1>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Nền tảng kết nối gia sư và học viên hàng đầu Việt Nam. Chất lượng
              và uy tín là ưu tiên hàng đầu của chúng tôi.
            </p>
            <div className="flex gap-4 pt-2">
              <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary cursor-pointer transition-colors shadow-sm">
                <Trophy
                  size={24}
                  strokeWidth={2}
                  className="text-yellow-600 dark:text-yellow-500 transition-transform hover:rotate-12"
                />
              </span>
              <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary cursor-pointer transition-colors shadow-sm">
                <Mail
                  size={24}
                  strokeWidth={2}
                  className="text-blue-600 dark:text-blue-500 transition-transform hover:rotate-12"
                />
              </span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-800 dark:text-slate-200">
              Dành cho học viên
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li>
                <Link
                  className="hover:text-primary transition-colors hover:underline"
                  to="/tutor"
                >
                  Tìm gia sư / Đặt lịch
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors hover:underline"
                  href="#"
                >
                  Lộ trình mẫu
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors hover:underline"
                  href="#"
                >
                  Đánh giá gia sư
                </a>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-800 dark:text-slate-200">
              Dành cho gia sư
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li>
                <a
                  className="hover:text-primary transition-colors hover:underline"
                  href="#"
                >
                  Đăng ký trở thành gia sư
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors hover:underline"
                  href="#"
                >
                  Quản lý lớp học
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors hover:underline"
                  href="#"
                >
                  Chia sẻ kinh nghiệm
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-800 dark:text-slate-200">
              Việt Nam
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-3">
                <Mail
                  size={24}
                  strokeWidth={2}
                  className="text-blue-600 dark:text-blue-500 transition-transform hover:rotate-12"
                />{" "}
                contact@nedu.vn
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={24}
                  strokeWidth={2}
                  className="text-blue-600 dark:text-blue-500 transition-transform hover:rotate-12"
                />{" "}
                1900 1234
              </li>
              <li className="flex items-start gap-3 mt-2 text-xs leading-relaxed">
                <MapPin
                  size={36}
                  strokeWidth={2}
                  className="text-blue-600 dark:text-blue-500 transition-transform hover:rotate-12"
                />{" "}
                ĐH FPT, Khu Công Nghệ Cao Hòa Lạc, Thạch Thất, TP. Hà Nội
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center text-xs text-slate-400 font-medium">
            © 2024 NEDU Education / Tutoring Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 font-medium">
            <a className="hover:text-primary transition-colors" href="#">
              Về chúng tôi
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Chính sách bảo mật
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
