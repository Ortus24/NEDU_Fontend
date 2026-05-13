import React, { useState } from "react";
import { Star, History, Briefcase, Globe, Calendar, List, HelpCircle, Clock, Video, ArrowRight } from "lucide-react";

export default function TrialBookingPage() {
  const [selectedTime, setSelectedTime] = useState<string>("09:30-4"); // Example selected time

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full">
      {/* Left Sidebar: Progress & Tutor Info */}
      <aside className="lg:col-span-4 flex flex-col gap-6">
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
                <Star size={16} fill="currentColor" />
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
              1
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-indigo-600">Chọn Lịch Hẹn</span>
              <span className="text-xs text-slate-500">Ngày &amp; Giờ phù hợp</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Mục Tiêu Học Tập</span>
              <span className="text-xs text-slate-500">Thông tin bổ trợ cho gia sư</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Xác Nhận</span>
              <span className="text-xs text-slate-500">Kiểm tra &amp; Gửi yêu cầu</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area: Booking Step 1 */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start md:items-center mb-8 flex-col md:flex-row gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-slate-900">Đăng ký học thử</h1>
              <p className="text-base text-slate-500">Vui lòng chọn thời gian bạn muốn bắt đầu buổi trải nghiệm.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 shrink-0">
              <button className="p-2 bg-white shadow-sm rounded-md text-slate-700">
                <Calendar size={20} />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-700">
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Weekly Calendar View */}
          <div className="-mx-8 px-8 md:mx-0 md:px-0 overflow-x-auto pb-4">
            <div className="grid grid-cols-7 gap-2 border-t border-slate-100 pt-8 min-w-[600px] md:min-w-0">
            {/* Week Header */}
            {[
              { day: "Th 2", date: "12" },
              { day: "Th 3", date: "13" },
              { day: "Th 4", date: "14", active: true },
              { day: "Th 5", date: "15" },
              { day: "Th 6", date: "16" },
              { day: "Th 7", date: "17" },
              { day: "CN", date: "18" },
            ].map((d, i) => (
              <div
                key={i}
                className={`text-center pb-4 border-b-2 ${
                  d.active ? "border-indigo-600" : "border-transparent border-b-slate-50"
                }`}
              >
                <span
                  className={`block text-xs uppercase tracking-wider font-bold mb-1 ${
                    d.active ? "text-indigo-600" : "text-slate-400"
                  }`}
                >
                  {d.day}
                </span>
                <span className={`text-lg font-bold ${d.active ? "text-indigo-600" : "text-slate-900"}`}>
                  {d.date}
                </span>
              </div>
            ))}

            {/* Availability Slots */}
            {/* Column 1 */}
            <div className="flex flex-col gap-2 pt-4">
              <button className="w-full py-2 px-1 text-xs border border-slate-100 rounded-lg text-slate-400 cursor-not-allowed bg-slate-50">
                08:00
              </button>
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                09:30
              </button>
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                11:00
              </button>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2 pt-4">
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                08:00
              </button>
              <button className="w-full py-2 px-1 text-xs border border-slate-100 rounded-lg text-slate-400 cursor-not-allowed bg-slate-50">
                09:30
              </button>
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                14:00
              </button>
            </div>

            {/* Column 3 (Current/Selected Day) */}
            <div className="flex flex-col gap-2 pt-4">
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                08:00
              </button>
              <button className="w-full py-2 px-1 text-xs bg-indigo-600 text-white rounded-lg font-bold ring-2 ring-indigo-600 ring-offset-2">
                09:30
              </button>
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                15:30
              </button>
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                17:00
              </button>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-2 pt-4">
              <button className="w-full py-2 px-1 text-xs border border-slate-100 rounded-lg text-slate-400 cursor-not-allowed bg-slate-50">
                08:00
              </button>
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                10:00
              </button>
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                16:00
              </button>
            </div>

            {/* Column 5 */}
            <div className="flex flex-col gap-2 pt-4">
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                09:00
              </button>
              <button className="w-full py-2 px-1 text-xs border border-indigo-100 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                11:00
              </button>
            </div>

            {/* Column 6 */}
            <div className="flex flex-col gap-2 pt-4">
              <button className="w-full py-2 px-1 text-xs border border-slate-100 rounded-lg text-slate-400 cursor-not-allowed bg-slate-50">
                Hết lịch
              </button>
            </div>

            {/* Column 7 */}
            <div className="flex flex-col gap-2 pt-4">
              <button className="w-full py-2 px-1 text-xs border border-slate-100 rounded-lg text-slate-400 cursor-not-allowed bg-slate-50">
                Nghỉ
              </button>
            </div>
          </div>
          </div>
          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500">
              <Globe size={18} />
              <span className="text-sm">Múi giờ: Vietnam (GMT+7)</span>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Hủy
              </button>
              <button className="flex-1 md:flex-none px-8 py-2 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-200 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                Tiếp tục
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Information Cards: Asymmetric Bento Grid Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 rounded-xl flex items-start gap-4 shadow-sm">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Thời lượng</h4>
              <p className="text-sm text-slate-500">Buổi học thử kéo dài 45 phút bao gồm kiểm tra trình độ và tư vấn lộ trình.</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 rounded-xl flex items-start gap-4 shadow-sm">
            <div className="bg-sky-100 p-3 rounded-lg text-sky-600 shrink-0">
              <Video size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Hình thức</h4>
              <p className="text-sm text-slate-500">Trực tuyến qua nền tảng NEDU Classroom với bảng trắng tương tác.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAB for Support */}
      <button className="fixed bottom-8 right-8 bg-white border border-slate-200 shadow-xl p-4 rounded-full flex items-center gap-2 hover:scale-105 transition-transform z-50">
        <HelpCircle size={20} className="text-indigo-600" />
        <span className="font-bold text-sm text-slate-900 pr-1">Hỗ trợ</span>
      </button>
    </div>
  );
}
