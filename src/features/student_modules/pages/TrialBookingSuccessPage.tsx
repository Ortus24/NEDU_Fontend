import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, BadgeCheck, Calendar, Video, Mail, BellRing, Headphones, Star, Check, History, Briefcase, Globe } from "lucide-react";

export default function TrialBookingSuccessPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full py-8">
      {/* Left Sidebar: Progress & Tutor Info */}
      <aside className="lg:col-span-4 flex flex-col gap-6 hidden lg:flex">
        {/* Tutor Mini-Profile */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <img
              alt="Tutor Profile"
              className="h-20 w-20 rounded-xl object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL9LAG2N3UjPhV1nTtUZc-sAkyUrprCnOBdI0eZU_D0plhEyU-jAftXZFz1C5QDEpUul6G5E6lKEuBcQixhVj-xFTxFjwM-yy1p1z6FLcs-lVSdK1JM9LyTgZH0TaCxrggxvdNTOy-OxLQtiQnoOjmrACd4mydt917-MfV8mxZBy9Qqy8GICvQVSdvbdS-NyYq3tsgmhXfjvGdTCBUo2u_uHIkBSWbP05LQprN-zT9FMQNXE6gaBa9XNvZFRDJxfBJt9q6Zp3GUT1o"
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Cô Minh Anh</h2>
              <div className="flex items-center gap-1 text-amber-500 mt-1">
                <Star size={16} className="fill-amber-500 text-amber-500" />
                <span className="text-sm font-medium text-slate-700">4.9 (124 đánh giá)</span>
              </div>
              <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                IELTS Specialist
              </span>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-500 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <History size={18} className="text-indigo-500" />
              <span>8.5 IELTS Overall (Speaking 9.0)</span>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase size={18} className="text-indigo-500" />
              <span>5 năm kinh nghiệm giảng dạy</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-indigo-500" />
              <span>Tiếng Việt, Tiếng Anh</span>
            </div>
          </div>
        </div>

        {/* Flow Indicators */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              <Check size={16} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-indigo-600">Chọn Lịch Hẹn</span>
              <span className="text-xs text-slate-500">Ngày & Giờ phù hợp</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              <Check size={16} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-indigo-600">Mục Tiêu Học Tập</span>
              <span className="text-xs text-slate-500">Thông tin bổ trợ cho gia sư</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-indigo-600">Xác Nhận</span>
              <span className="text-xs text-slate-500">Kiểm tra & Gửi yêu cầu</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:col-span-8 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          {/* Success Card */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm text-center relative overflow-hidden">
            {/* Subtle decorative background gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/20 via-indigo-600 to-indigo-600/20"></div>
            
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full">
              <CheckCircle size={48} className="text-indigo-600" strokeWidth={2} />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Đặt lịch thành công!</h1>
            
            <p className="text-base text-slate-500 mb-8 max-w-md mx-auto">
              Gia sư Cô Minh Anh đã nhận được yêu cầu của bạn. Vui lòng kiểm tra email và lịch học để chuẩn bị tốt nhất.
            </p>

            {/* Summary Card (The Bento Layout Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Gia sư</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-200">
                    <img
                      alt="Cô Minh Anh"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzCGJe1MJM6yXV8Sxj4UL74U1LIlD1OJmRFGuX7gM8A8h8tF3mSvYMRGRnsoS5XmvEyog2TvHhODvYyCiXvGWj_d090f3tJrfFrfNMOlDFsSi7eHjD9AOa4v6hbZMQdt-Wfdz7Cj9v3ptcRDE5iBitxIItAH4z2OY8Iv4T3zWq0tcuWT7TwRcgMKgfFCKq6ZCNcdhseQoLcdVGVGYN9EDVpGxbAIruiaWNksxAmJ_8SwvQ6cEo8Cx-kruE54oBzsLYWotnXpFcTdRM"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Cô Minh Anh</p>
                    <p className="text-sm text-slate-500">Tiếng Anh</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Thời gian</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 border border-slate-200">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">19:00 - 20:00</p>
                    <p className="text-sm text-slate-500">Thứ 7, 26/10/2024</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-1 md:col-span-2">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Nền tảng học tập</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-sky-600 border border-slate-200">
                      <Video size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Google Meet</p>
                      <p className="text-sm text-slate-500">Link sẽ được gửi trước buổi học 5 phút</p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-[11px] font-bold">
                      Sắp diễn ra
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/progress"
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 order-1 sm:order-2 flex items-center justify-center"
              >
                Xem lộ trình học
              </Link>
              <Link
                to="/"
                className="bg-transparent text-indigo-600 border border-indigo-600/30 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-indigo-50 active:scale-95 transition-all duration-200 order-2 sm:order-1 flex items-center justify-center"
              >
                Về trang chủ
              </Link>
            </div>
          </div>

          {/* Secondary Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-2">
              <Mail className="text-indigo-600 bg-indigo-50 p-1.5 rounded-lg w-8 h-8 shrink-0" />
              <div>
                <h5 className="text-sm font-bold text-slate-900">Email xác nhận</h5>
                <p className="text-xs text-slate-500 mt-0.5">Một email chi tiết đã được gửi đến hòm thư của bạn.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BellRing className="text-indigo-600 bg-indigo-50 p-1.5 rounded-lg w-8 h-8 shrink-0" />
              <div>
                <h5 className="text-sm font-bold text-slate-900">Nhắc nhở học tập</h5>
                <p className="text-xs text-slate-500 mt-0.5">Hệ thống sẽ thông báo qua ứng dụng 30 phút trước buổi học.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Headphones className="text-indigo-600 bg-indigo-50 p-1.5 rounded-lg w-8 h-8 shrink-0" />
              <div>
                <h5 className="text-sm font-bold text-slate-900">Cần hỗ trợ?</h5>
                <p className="text-xs text-slate-500 mt-0.5">Liên hệ hotline 1900-xxxx nếu bạn gặp vấn đề kỹ thuật.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
