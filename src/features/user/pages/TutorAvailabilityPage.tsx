import React, { useState } from "react";
import {
  CalendarClock,
  Save,
  Plus,
  Info,
  Clock,
  X,
  CopyCheck,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

interface TimeRange {
  id: string;
  start: string;
  end: string;
}

const DAYS = [
  { id: 1, label: "Thứ 2" },
  { id: 2, label: "Thứ 3" },
  { id: 3, label: "Thứ 4" },
  { id: 4, label: "Thứ 5" },
  { id: 5, label: "Thứ 6" },
  { id: 6, label: "Thứ 7" },
  { id: 0, label: "Chủ Nhật" },
];

export default function TutorAvailabilityPage() {
  const [availability, setAvailability] = useState<Record<number, TimeRange[]>>({
    1: [{ id: "1-1", start: "08:00", end: "10:00" }],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    0: [],
  });
  const [isSaving, setIsSaving] = useState(false);

  const addRange = (dayId: number) => {
    const newId = `${dayId}-${Date.now()}`;
    setAvailability((prev) => ({
      ...prev,
      [dayId]: [...prev[dayId], { id: newId, start: "09:00", end: "11:00" }],
    }));
  };

  const updateRange = (dayId: number, rangeId: string, field: "start" | "end", value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [dayId]: prev[dayId].map((r) => (r.id === rangeId ? { ...r, [field]: value } : r)),
    }));
  };

  const removeRange = (dayId: number, rangeId: string) => {
    setAvailability((prev) => ({
      ...prev,
      [dayId]: prev[dayId].filter((r) => r.id !== rangeId),
    }));
  };

  const copyToAll = (fromDayId: number) => {
    const sourceRanges = availability[fromDayId];
    const newAvailability = { ...availability };
    DAYS.forEach((day) => {
      if (day.id !== fromDayId) {
        newAvailability[day.id] = sourceRanges.map((r) => ({
          ...r,
          id: `${day.id}-${Math.random()}`,
        }));
      }
    });
    setAvailability(newAvailability);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Đã lưu lịch rảnh thành công!");
    }, 1000);
  };

  return (
    <div className="flex bg-[#fcf8ff] min-h-screen font-['Inter']">
      <TutorSidebar name="Alex Nguyen" role="Senior Tutor" />

      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center h-16">
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <CalendarClock className="text-primary" size={24} />
            Quản lý Thời gian rảnh
          </h1>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 text-sm flex items-center gap-2"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
            Lưu thay đổi
          </button>
        </header>

        <main className="p-8 space-y-6">
          <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl text-sm border border-blue-100 flex items-center gap-3">
            <Info size={18} />
            <p>Nhấn nút <span className="font-bold">(+)</span> ở mỗi ngày để thêm khung giờ rảnh mới.</p>
          </div>

          {/* Thiết kế bảng 7 cột */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
              {DAYS.map((day) => (
                <div key={day.id} className="p-4 text-center border-r border-slate-100 last:border-r-0">
                  <span className="block text-sm font-black text-slate-800">{day.label}</span>
                  <button 
                    onClick={() => copyToAll(day.id)}
                    className="text-[9px] font-black text-primary uppercase mt-1 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <CopyCheck size={10} />
                    Copy cả tuần
                  </button>
                </div>
              ))}
            </div>

            {/* Table Body - 7 Columns */}
            <div className="grid grid-cols-7 min-h-[500px]">
              {DAYS.map((day) => (
                <div key={day.id} className="border-r border-slate-100 last:border-r-0 p-3 space-y-3 bg-white hover:bg-slate-50/30 transition-colors">
                  {availability[day.id].map((range) => (
                    <div key={range.id} className="group relative bg-white border border-slate-100 p-3 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all animate-in fade-in zoom-in-95">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                           <Clock size={12} className="text-slate-400" />
                           <button 
                            onClick={() => removeRange(day.id, range.id)}
                            className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-400 w-6">Từ:</span>
                            <input
                              type="time"
                              value={range.start}
                              onChange={(e) => updateRange(day.id, range.id, "start", e.target.value)}
                              className="bg-transparent border-none p-0 text-xs font-black text-slate-700 focus:ring-0 w-full"
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-400 w-6">Đến:</span>
                            <input
                              type="time"
                              value={range.end}
                              onChange={(e) => updateRange(day.id, range.id, "end", e.target.value)}
                              className="bg-transparent border-none p-0 text-xs font-black text-slate-700 focus:ring-0 w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addRange(day.id)}
                    className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs font-medium px-4">
             <Info size={14} />
             <p>Học sinh sẽ chỉ nhìn thấy và đặt lịch được vào các khoảng thời gian bạn đã thiết lập ở trên.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
