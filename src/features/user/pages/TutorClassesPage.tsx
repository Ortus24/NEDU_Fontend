import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Bell,
  Mail,
  Filter,
  CalendarSearch,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  BookOpen,
  ChevronDown,
  School,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

// ─── Types ────────────────────────────────────────────────────────────────────

type ClassStatus = "active" | "ended" | "paused";
type PayStatus = "paid" | "unpaid";

interface ClassItem {
  id: number;
  subject: string;
  student: string;
  schedule: string;
  location: string;
  progress: number;
  status: ClassStatus;
  payStatus: PayStatus;
  subject_group: string;
  grade: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_CLASSES: ClassItem[] = [
  {
    id: 1,
    subject: "Toán 12 – Ôn thi THPT",
    student: "Lê Văn An",
    schedule: "T2, T4, T6 – 19:00",
    location: "Trực tuyến (Google Meet)",
    progress: 75,
    status: "active",
    payStatus: "paid",
    subject_group: "Toán học",
    grade: "Lớp 12",
  },
  {
    id: 2,
    subject: "Vật Lý 11 – Nâng cao",
    student: "Nguyễn Thu Hà",
    schedule: "T3, T5 – 17:30",
    location: "Tại nhà (Quận 7)",
    progress: 40,
    status: "active",
    payStatus: "unpaid",
    subject_group: "Vật lý",
    grade: "Lớp 11",
  },
  {
    id: 3,
    subject: "Tiếng Anh Giao Tiếp",
    student: "Trần Minh Tâm",
    schedule: "T7, CN – 09:00",
    location: "Trực tuyến (Zoom)",
    progress: 100,
    status: "ended",
    payStatus: "paid",
    subject_group: "Tiếng Anh",
    grade: "Lớp 12",
  },
  {
    id: 4,
    subject: "Ngữ Văn 10 – Chuyên",
    student: "Phạm Bảo Ngọc",
    schedule: "T4, T7 – 18:30",
    location: "Tại nhà (Quận 1)",
    progress: 15,
    status: "active",
    payStatus: "paid",
    subject_group: "Ngữ văn",
    grade: "Lớp 10",
  },
  {
    id: 5,
    subject: "Toán Cao Cấp 1",
    student: "Hoàng Nam",
    schedule: "T7 – 09:00",
    location: "Trực tuyến (Google Meet)",
    progress: 60,
    status: "active",
    payStatus: "paid",
    subject_group: "Toán học",
    grade: "Lớp 12",
  },
  {
    id: 6,
    subject: "Hóa học 11",
    student: "Bùi Thế Anh",
    schedule: "T2, T5 – 20:00",
    location: "Tại nhà (Quận 3)",
    progress: 30,
    status: "paused",
    payStatus: "unpaid",
    subject_group: "Hóa học",
    grade: "Lớp 11",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  active: {
    label: "Đang diễn ra",
    cls: "bg-emerald-50 text-emerald-700",
  },
  ended: {
    label: "Đã kết thúc",
    cls: "bg-slate-100 text-slate-500",
  },
  paused: {
    label: "Tạm dừng",
    cls: "bg-amber-50 text-amber-600",
  },
};

// ─── Custom Select (fully custom dropdown) ──────────────────────────────────

function CustomSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1.5 flex-1 min-w-[180px] relative"
    >
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </label>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border rounded-2xl text-sm font-semibold text-slate-700 shadow-sm transition-all ${
          open
            ? "border-primary/60 ring-2 ring-primary/20 shadow-md"
            : "border-slate-200 hover:border-primary/40 hover:shadow-md"
        }`}
      >
        <span className="truncate">{selected.label}</span>
        <ChevronDown
          size={15}
          className={`text-slate-400 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          <ul className="py-1.5 max-h-56 overflow-y-auto">
            {options.map((opt) => {
              const isActive = opt.value === value;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between gap-2 ${
                      isActive
                        ? "bg-primary/5 text-primary font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                    }`}
                  >
                    {opt.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

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

// ─── Class Card ───────────────────────────────────────────────────────────────

function ClassCard({ cls }: { cls: ClassItem }) {
  const statusCfg = STATUS_CONFIG[cls.status];
  const isPaid = cls.payStatus === "paid";
  const isEnded = cls.status === "ended";

  const progressColor =
    cls.progress === 100
      ? "bg-emerald-500"
      : cls.progress >= 60
        ? "bg-primary"
        : cls.progress >= 30
          ? "bg-blue-400"
          : "bg-amber-400";

  const progressTextColor =
    cls.progress === 100 ? "text-emerald-600" : "text-primary";

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col group ${
        !isPaid
          ? "border-l-4 border-l-red-300 border-t border-r border-b border-slate-100"
          : "border-slate-100"
      } ${isEnded ? "opacity-80 hover:opacity-100" : ""}`}
    >
      <div className="p-6 flex-grow">
        {/* Badges */}
        <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusCfg.cls}`}
          >
            {statusCfg.label}
          </span>
          {isPaid ? (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-slate-100">
              <CheckCircle2 size={11} className="text-emerald-500" />
              Đã đóng
            </span>
          ) : (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider">
              <AlertTriangle size={11} />
              Chưa đóng
            </span>
          )}
        </div>

        {/* Subject & Student */}
        <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
          {cls.subject}
        </h3>
        <p className="text-sm text-slate-500 mb-5 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
            <School size={11} className="text-primary" />
          </span>
          {cls.student}
        </p>

        {/* Info rows */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5 text-sm text-slate-500">
            <CalendarSearch size={14} className="text-slate-400 shrink-0" />
            <span>{cls.schedule}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-500">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            <span>{cls.location}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">
              Tiến độ chương trình
            </span>
            <span className={`font-bold ${progressTextColor}`}>
              {cls.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${progressColor}`}
              style={{ width: `${cls.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="bg-slate-50 px-4 py-3 flex gap-2.5 border-t border-slate-100">
        <Link
          to={`/tutor/classes/${cls.id}`}
          className="flex-1 bg-white border border-slate-200 text-slate-700 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors text-center"
        >
          Xem chi tiết
        </Link>
        <button className="flex-1 bg-primary text-white py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-sm shadow-primary/30">
          Nhật ký
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TutorClassesPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_CLASSES.filter((c) => {
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && c.status === "active") ||
      (filterStatus === "ended" && c.status === "ended") ||
      (filterStatus === "paused" && c.status === "paused");
    const matchSubject =
      filterSubject === "all" || c.subject_group === filterSubject;
    const matchGrade = filterGrade === "all" || c.grade === filterGrade;
    const matchSearch =
      search === "" ||
      c.student.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSubject && matchGrade && matchSearch;
  });

  const activeCount = ALL_CLASSES.filter((c) => c.status === "active").length;
  const totalHours = 48;
  const attendanceRate = 95;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* ── Sidebar ── */}
      <TutorSidebar name="Minh Nguyen" role="Premium Tutor" />

      {/* ── Main ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Body */}
        <main className="p-8 flex-1 space-y-7">
          {/* Page heading */}
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                <span className="hover:text-primary cursor-pointer transition-colors">
                  Trang chủ
                </span>
                <ChevronRight size={13} />
                <span className="text-primary font-bold">
                  Danh sách lớp học
                </span>
              </nav>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Danh sách lớp học
              </h1>
            </div>
            <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 text-sm">
              <Plus size={16} />
              Thêm lớp mới
            </button>
          </div>

          {/* Filter bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-wrap gap-4 items-end">
            <CustomSelect
              label="Trạng thái"
              value={filterStatus}
              onChange={setFilterStatus}
              options={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "active", label: "Đang diễn ra" },
                { value: "ended", label: "Đã kết thúc" },
                { value: "paused", label: "Tạm dừng" },
              ]}
            />
            <CustomSelect
              label="Môn học"
              value={filterSubject}
              onChange={setFilterSubject}
              options={[
                { value: "all", label: "Tất cả môn học" },
                { value: "Toán học", label: "Toán học" },
                { value: "Ngữ văn", label: "Ngữ văn" },
                { value: "Tiếng Anh", label: "Tiếng Anh" },
                { value: "Vật lý", label: "Vật lý" },
                { value: "Hóa học", label: "Hóa học" },
              ]}
            />
            <CustomSelect
              label="Khối lớp"
              value={filterGrade}
              onChange={setFilterGrade}
              options={[
                { value: "all", label: "Tất cả các khối" },
                { value: "Lớp 10", label: "Lớp 10" },
                { value: "Lớp 11", label: "Lớp 11" },
                { value: "Lớp 12", label: "Lớp 12" },
              ]}
            />
            <button
              onClick={() => {
                setFilterStatus("all");
                setFilterSubject("all");
                setFilterGrade("all");
                setSearch("");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors text-sm font-semibold"
            >
              <Filter size={15} />
              Đặt lại
            </button>
          </div>

          {/* Results count */}
          <p className="text-sm text-slate-400 font-medium">
            Hiển thị{" "}
            <span className="text-primary font-bold">{filtered.length}</span>{" "}
            lớp học
          </p>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((cls) => (
              <ClassCard key={cls.id} cls={cls} />
            ))}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <BookOpen size={48} className="text-slate-200 mb-4" />
                <p className="text-lg font-bold text-slate-400">
                  Không tìm thấy lớp học nào
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}

            {/* Stats bento card – always shown, spanning remaining columns */}
            {filtered.length > 0 && (
              <div className="bg-primary text-white rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden xl:col-span-2 shadow-xl shadow-primary/20">
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-5">
                    Tổng quan tháng này
                  </p>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-5xl font-black leading-none mb-1">
                        {activeCount}
                      </p>
                      <p className="text-sm text-blue-100">Lớp học active</p>
                    </div>
                    <div>
                      <p className="text-5xl font-black leading-none mb-1">
                        {totalHours}h
                      </p>
                      <p className="text-sm text-blue-100">
                        Giờ dạy hoàn thành
                      </p>
                    </div>
                    <div>
                      <p className="text-5xl font-black leading-none mb-1">
                        {attendanceRate}%
                      </p>
                      <p className="text-sm text-blue-100">Tỉ lệ chuyên cần</p>
                    </div>
                  </div>
                </div>
                {/* Decorative */}
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
                  <School size={120} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* FAB (mobile) */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 lg:hidden">
        <Plus size={24} />
      </button>
    </div>
  );
}
