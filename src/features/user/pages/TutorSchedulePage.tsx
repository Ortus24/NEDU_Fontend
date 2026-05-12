import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Mail,
  Video,
  ClipboardCheck,
  CalendarPlus,
  CalendarDays,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalendarEvent {
  id: number;
  title: string;
  day: number;
  color: "primary" | "secondary" | "tertiary";
}

interface AgendaItem {
  id: number;
  time: string;
  subject: string;
  student: string;
  avatar: string;
  color: "primary" | "tertiary" | "secondary";
  canJoin: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 1, title: "Toán Cao Cấp", day: 3, color: "secondary" },
  { id: 2, title: "Vật Lý", day: 5, color: "tertiary" },
  { id: 3, title: "Tiếng Anh", day: 10, color: "primary" },
  { id: 4, title: "Ngữ Văn", day: 12, color: "secondary" },
  { id: 5, title: "Tiếng Anh GT", day: 17, color: "primary" },
  { id: 6, title: "Toán 12", day: 19, color: "tertiary" },
  { id: 7, title: "Tiếng Anh GT", day: 24, color: "primary" },
  { id: 8, title: "Luyện thi IELTS", day: 24, color: "tertiary" },
  { id: 9, title: "Toán Giải Tích", day: 26, color: "secondary" },
  { id: 10, title: "Vật Lý NC", day: 28, color: "tertiary" },
  { id: 11, title: "Tiếng Anh", day: 31, color: "primary" },
];

const AGENDA: AgendaItem[] = [
  {
    id: 1,
    time: "08:00 – 09:30",
    subject: "Tiếng Anh Giao Tiếp",
    student: "Lê Văn Nam",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuNQkE89eNfcatEb7Vmlm7APVy3Mof6dRqmXn0tsCk_ymOFt0ZEtboJbWcK-Zz6nIhS5WRi1sez-c4K1mP4MlurVFEy4QeG3t388R8ba7qgDFTSiMaDlXHmRRJZqvrPin3IVAH2yulQkDshIZLHluqMF3ewkfrcBO4omzLuK_WwskZ3I5-oT7kkBCBYGbUr_x6WC6bEreaBRiS_avnoZ7moypj-4VsW9csrDUSq_oXPIU7OfRCbF6KrjuFUwNH4M3dUe-6VJudyssn",
    color: "primary",
    canJoin: true,
  },
  {
    id: 2,
    time: "14:00 – 15:30",
    subject: "Luyện Thi IELTS",
    student: "Nguyễn Thùy Linh",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXB-YoIknH-mM5z6UsW1Mh0zxS36_tXT5n3RCW0KN5oAYbpxi4-v1XZSpYRitF1AZLQwl8BTrSyFSxR0CisdtP3ia-UbG8TQ1FcU_RdDrQiA21drsBhPsnBsD9RBjYm-CK1tUHe2m4E6MPDz0YMJgFBoecFgPgs2BSbN3fE7LI9sdnZ4Rjt6eepKjCpWWpM9Vt7YGFNpAqVftLtA7R7ZJetZlwoyaph9I3ZLZO56pmjVlyJK_Lv2ytJEzI-q-lg_6G1m3hpQGPPBe_",
    color: "tertiary",
    canJoin: false,
  },
  {
    id: 3,
    time: "19:00 – 20:30",
    subject: "Toán Giải Tích",
    student: "Trần Minh Quân",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGbwfijwM64uLfa5tG06RfZOKP4nOhG3iIKXrCmCfkRghwv-6AYL50lCNBw1zs4MAVnOq_-Z2FHXT-MLJFD-q3fMrqglYtF2Jj9IQdXeIeh1J_7VD1PbxV7xhwEkgccSyvniwKF2Y4GNgKMXBOXedH07IYTL43CAwJb7gPffZQDEQYYRehseY9oaBs-Xe5wrt7rCcfHN98l6IJGIbN2DQX-Yt-piqMUnyWFluMW368Qb_Gha87taYlGVBUrcOz93wA8876M-AJVlNd",
    color: "secondary",
    canJoin: false,
  },
];

const DAYS_HEADER = [
  "THỨ 2",
  "THỨ 3",
  "THỨ 4",
  "THỨ 5",
  "THỨ 6",
  "THỨ 7",
  "CN",
];
// October 2023 starts on Sunday — offset 6 for Mon-first grid
const MONTH_OFFSET = 6; // days from Mon start before day 1
const TOTAL_DAYS = 31;

const EVENT_COLOR_MAP = {
  primary: "bg-blue-100 text-blue-700",
  secondary: "bg-emerald-100 text-emerald-700",
  tertiary: "bg-orange-100 text-orange-700",
};

const TIMELINE_COLOR_MAP: Record<
  AgendaItem["color"],
  { dot: string; line: string; time: string }
> = {
  primary: {
    dot: "bg-blue-500",
    line: "border-blue-200",
    time: "text-primary",
  },
  tertiary: {
    dot: "bg-orange-500",
    line: "border-orange-300",
    time: "text-orange-600",
  },
  secondary: {
    dot: "bg-emerald-500",
    line: "border-emerald-200",
    time: "text-emerald-700",
  },
};

// ─── Nav Item ─────────────────────────────────────────────────────────────────

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
        active
          ? "bg-primary/10 text-primary font-bold border-r-4 border-primary"
          : "text-slate-500 hover:text-primary hover:bg-slate-100"
      }`}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

// ─── Calendar Cell ────────────────────────────────────────────────────────────

function CalendarCell({
  day,
  events,
  isToday,
  isPrev,
}: {
  day: number | null;
  events: CalendarEvent[];
  isToday: boolean;
  isPrev: boolean;
}) {
  if (day === null) {
    // empty filler
    return (
      <div className="p-2 border-r border-b border-slate-100 bg-slate-50/60 min-h-[110px]" />
    );
  }

  if (isPrev) {
    return (
      <div className="p-2 border-r border-b border-slate-100 bg-slate-50/60 opacity-40 min-h-[110px]">
        <span className="text-xs text-slate-400">{day}</span>
      </div>
    );
  }

  return (
    <div
      className={`p-2 border-r border-b border-slate-100 min-h-[110px] hover:bg-blue-50/30 transition-colors group cursor-pointer ${
        isToday ? "bg-blue-50/50 ring-1 ring-inset ring-primary/20" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-1.5">
        <span
          className={`text-xs font-bold leading-none ${
            isToday
              ? "w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center"
              : "text-slate-700"
          }`}
        >
          {day}
        </span>
        {isToday && (
          <span className="text-[9px] font-black uppercase tracking-wider bg-primary text-white px-1.5 py-0.5 rounded-full">
            Hôm nay
          </span>
        )}
      </div>
      <div className="space-y-1">
        {events.map((ev) => (
          <div
            key={ev.id}
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md truncate ${
              EVENT_COLOR_MAP[ev.color]
            }`}
          >
            {ev.title}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TutorSchedulePage() {
  const [view, setView] = useState<"month" | "week">("month");

  // Build grid: 6 empty prev-month + 31 days = 37 cells, pad to 42 (6×7)
  const prevDays = [25, 26, 27, 28, 29, 30]; // last 6 of Sep (Mon-Sat before Oct 1)
  const cells: Array<{ day: number | null; isPrev: boolean }> = [
    ...prevDays.map((d) => ({ day: d, isPrev: true })),
    ...Array.from({ length: TOTAL_DAYS }, (_, i) => ({
      day: i + 1,
      isPrev: false,
    })),
  ];
  // pad to 42
  while (cells.length < 42) cells.push({ day: null, isPrev: false });

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* ── Sidebar ── */}
      <TutorSidebar name="Minh Anh" role="Senior Tutor" />

      {/* ── Main ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Body */}
        <main
          className="p-6 flex-1 flex gap-6 overflow-hidden"
          style={{ maxHeight: "calc(100vh - 128px)" }}
        >
          {/* ── Left: Calendar ── */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Controls */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black text-slate-900">
                  Tháng 10, 2023
                </h2>
                <div className="flex border border-slate-200 rounded-xl overflow-hidden text-sm">
                  <button
                    onClick={() => setView("month")}
                    className={`px-4 py-1.5 font-bold transition-colors ${
                      view === "month"
                        ? "bg-primary text-white"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    Tháng
                  </button>
                  <button
                    onClick={() => setView("week")}
                    className={`px-4 py-1.5 font-bold border-l border-slate-200 transition-colors ${
                      view === "week"
                        ? "bg-primary text-white"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    Tuần
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
                  <ChevronLeft size={18} />
                </button>
                <button className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-slate-100">
                {DAYS_HEADER.map((d, i) => (
                  <div
                    key={d}
                    className={`py-3 text-center text-[11px] font-black uppercase tracking-wider border-r border-slate-100 last:border-r-0 ${
                      i === 5
                        ? "text-primary"
                        : i === 6
                          ? "text-red-400"
                          : "text-slate-400"
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Cells */}
              <div className="flex-1 grid grid-cols-7 grid-rows-6 overflow-y-auto">
                {cells.map((cell, idx) => {
                  const events = CALENDAR_EVENTS.filter(
                    (e) => e.day === cell.day && !cell.isPrev,
                  );
                  return (
                    <CalendarCell
                      key={idx}
                      day={cell.day}
                      events={events}
                      isToday={cell.day === 24 && !cell.isPrev}
                      isPrev={cell.isPrev}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Agenda ── */}
          <aside
            className="w-88 shrink-0 flex flex-col gap-4"
            style={{ width: "360px" }}
          >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex-1 flex flex-col p-6 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-black text-slate-900">
                  Lịch Trình Hôm Nay
                </h3>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-full">
                  {AGENDA.length} lớp học
                </span>
              </div>

              {/* Timeline */}
              <div className="flex-1 space-y-6 overflow-y-auto pr-1">
                {AGENDA.map((item) => {
                  const colors = TIMELINE_COLOR_MAP[item.color];
                  return (
                    <div
                      key={item.id}
                      className={`relative pl-6 border-l-2 ${colors.line} pb-2`}
                    >
                      {/* Timeline dot */}
                      <span
                        className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${colors.dot} border-4 border-white shadow-sm`}
                      />

                      <p
                        className={`text-[11px] font-black uppercase tracking-wider ${colors.time}`}
                      >
                        {item.time}
                      </p>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {item.subject}
                      </h4>

                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={item.avatar}
                          alt={item.student}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-slate-500">
                          {item.student}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-3">
                        {item.canJoin ? (
                          <>
                            <button className="flex-1 py-2 px-3 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity shadow-sm shadow-primary/30">
                              <Video size={14} />
                              Vào Lớp
                            </button>
                            <button className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500">
                              <ClipboardCheck size={16} />
                            </button>
                          </>
                        ) : (
                          <button
                            disabled
                            className="flex-1 py-2 px-3 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed"
                          >
                            <Video size={14} />
                            Chưa Đến Giờ
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary stats */}
              <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Tổng số giờ
                  </p>
                  <p className="text-2xl font-black text-primary">4.5h</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Học sinh
                  </p>
                  <p className="text-2xl font-black text-emerald-600">12</p>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <CalendarPlus size={22} />
      </button>
    </div>
  );
}
