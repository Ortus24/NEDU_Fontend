import React, { useState } from "react";
import {
  CalendarClock,
  Save,
  Trash2,
  Copy,
  Info,
  CheckCircle2,
  Clock,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

const DAYS = [
  { id: 1, label: "Thứ 2" },
  { id: 2, label: "Thứ 3" },
  { id: 3, label: "Thứ 4" },
  { id: 4, label: "Thứ 5" },
  { id: 5, label: "Thứ 6" },
  { id: 6, label: "Thứ 7" },
  { id: 0, label: "Chủ Nhật" },
];

const HOURS = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00 to 22:00

export default function TutorAvailabilityPage() {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  const toggleSlot = (dayId: number, hour: number) => {
    const slotId = `${dayId}-${hour}`;
    const newSlots = new Set(selectedSlots);
    if (newSlots.has(slotId)) {
      newSlots.delete(slotId);
    } else {
      newSlots.add(slotId);
    }
    setSelectedSlots(newSlots);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Đã lưu lịch rảnh thành công!");
    }, 1500);
  };

  const clearAll = () => {
    if (confirm("Bạn có chắc muốn xóa tất cả lịch rảnh đã chọn?")) {
      setSelectedSlots(new Set());
    }
  };

  const totalHours = selectedSlots.size;

  return (
    <div className="flex bg-[#fcf8ff] min-h-screen font-['Inter']">
      {/* Sidebar */}
      <TutorSidebar name="Alex Nguyen" role="Senior Tutor" />

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <CalendarClock className="text-primary" size={28} />
              Quản lý Thời gian rảnh
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Thiết lập khung giờ bạn có thể dạy để học sinh đăng ký.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 flex items-center gap-3">
              <Clock className="text-primary" size={18} />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tổng thời gian/tuần
                </p>
                <p className="text-sm font-black text-primary">{totalHours} giờ</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Actions & Alerts */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-3 rounded-2xl text-sm border border-blue-100 flex-1">
              <Info size={18} className="shrink-0" />
              <p>
                Học sinh chỉ có thể đặt lịch vào những khung giờ bạn đã chọn là
                <span className="font-bold"> "Rảnh"</span> (màu xanh).
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold text-sm"
              >
                <Trash2 size={16} />
                Xóa tất cả
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all font-semibold text-sm">
                <Copy size={16} />
                Sao chép từ tuần trước
              </button>
            </div>
          </div>

          {/* Availability Grid Container */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Grid Header */}
            <div className="grid grid-cols-[100px_1fr] border-b border-slate-100">
              <div className="p-4 border-r border-slate-100 bg-slate-50/50 flex items-center justify-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Thời gian
                </span>
              </div>
              <div className="grid grid-cols-7">
                {DAYS.map((day) => (
                  <div
                    key={day.id}
                    className="p-4 text-center border-r border-slate-100 last:border-r-0"
                  >
                    <span className="block text-sm font-black text-slate-800">
                      {day.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Hàng tuần
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Body */}
            <div className="grid grid-cols-[100px_1fr] max-h-[600px] overflow-y-auto custom-scrollbar">
              {/* Time Labels */}
              <div className="bg-slate-50/30">
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="h-14 flex items-center justify-center border-b border-r border-slate-100 text-xs font-bold text-slate-500"
                  >
                    {hour}:00
                  </div>
                ))}
              </div>

              {/* Slots Grid */}
              <div className="grid grid-cols-7 relative">
                {DAYS.map((day) => (
                  <div key={day.id} className="border-r border-slate-100 last:border-r-0">
                    {HOURS.map((hour) => {
                      const isSelected = selectedSlots.has(`${day.id}-${hour}`);
                      return (
                        <button
                          key={hour}
                          onClick={() => toggleSlot(day.id, hour)}
                          className={`w-full h-14 border-b border-slate-100 transition-all duration-200 group relative ${
                            isSelected
                              ? "bg-primary/10 border-primary/20 z-10"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute inset-1.5 bg-primary rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center animate-in zoom-in-95 duration-200">
                              <CheckCircle2 size={16} className="text-white" />
                            </div>
                          )}
                          {!isSelected && (
                            <div className="opacity-0 group-hover:opacity-100 absolute inset-2 border-2 border-dashed border-primary/20 rounded-lg flex items-center justify-center transition-opacity">
                              <span className="text-[10px] font-bold text-primary/40 uppercase">
                                Chọn rảnh
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-12 h-12 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-on-tertiary-fixed">
              <Info size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">Tính năng lặp lại</h4>
              <p className="text-sm text-slate-500">
                Mặc định các khung giờ này sẽ được áp dụng cho tất cả các tuần tiếp theo.
                Bạn có thể điều chỉnh ngoại lệ cho từng ngày cụ thể trong phần "Lịch trình cá nhân".
              </p>
            </div>
            <button className="px-6 py-2 rounded-xl border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
              Cài đặt nâng cao
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
