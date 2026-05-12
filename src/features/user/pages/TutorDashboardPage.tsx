import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Plus,
  Search,
  Bell,
  Mail,
  Download,
  CalendarPlus,
  MapPin,
  MoreVertical,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  School,
  CreditCard,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

// ─── Data ─────────────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: "TH 1", height: 40, active: false },
  { month: "TH 2", height: 55, active: false },
  { month: "TH 3", height: 45, active: false },
  { month: "TH 4", height: 75, active: false },
  { month: "TH 5", height: 65, active: false },
  { month: "TH 6", height: 90, active: true },
];

const SCHEDULE = [
  {
    time: "08:00 – 10:00",
    label: "HÔM NAY",
    student: "Lê Văn An",
    subject: "Toán 12",
    location: "Online via Zoom",
    color: "border-blue-600",
    textColor: "text-blue-600",
  },
  {
    time: "14:30 – 16:30",
    label: "HÔM NAY",
    student: "Trần Thùy Chi",
    subject: "Lý 11",
    location: "Quận 7, TP.HCM",
    color: "border-emerald-500",
    textColor: "text-emerald-600",
  },
  {
    time: "19:00 – 21:00",
    label: "HÔM NAY",
    student: "Hoàng Nam",
    subject: "Toán Cao Cấp",
    location: "Online via Google Meet",
    color: "border-slate-300",
    textColor: "text-slate-500",
  },
];

const CLASSES = [
  {
    initials: "LA",
    name: "Lê Văn An",
    subject: "Toán 12 – Ôn thi THPT",
    paid: true,
    schedule: "T2, T4, T6 (18:00)",
    avatarBg: "bg-blue-100",
    avatarText: "text-blue-700",
  },
  {
    initials: "TC",
    name: "Trần Thùy Chi",
    subject: "Vật Lý 11",
    paid: false,
    schedule: "T3, T5 (14:30)",
    avatarBg: "bg-orange-100",
    avatarText: "text-orange-700",
  },
  {
    initials: "HN",
    name: "Hoàng Nam",
    subject: "Toán Cao Cấp 1",
    paid: true,
    schedule: "T7 (09:00)",
    avatarBg: "bg-indigo-100",
    avatarText: "text-indigo-700",
  },
  {
    initials: "BT",
    name: "Bùi Thế Anh",
    subject: "Tiếng Anh Giao Tiếp",
    paid: true,
    schedule: "CN (19:30)",
    avatarBg: "bg-slate-100",
    avatarText: "text-slate-600",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function MetricCard({
  icon,
  iconBg,
  badge,
  badgeColor,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  iconBg: string;
  badge: string;
  badgeColor: string;
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
      <div className="flex justify-between items-start">
        <span className={`p-2.5 rounded-xl ${iconBg}`}>{icon}</span>
        <span
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${badgeColor}`}
        >
          <TrendingUp size={12} />
          {badge}
        </span>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
          {label}
        </p>
        <p className="text-4xl font-black text-slate-900">
          {value}{" "}
          <span className="text-xl font-normal text-slate-400">{unit}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TutorDashboardPage() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* ── Sidebar ── */}
      <TutorSidebar name="Nguyễn Minh" role="Gia sư Toán" />

      {/* ── Main content (offset by sidebar width + header height) ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* ── Dashboard Body ── */}
        <main className="p-8 space-y-8 flex-1">
          {/* Welcome */}
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                XIN CHÀO, MINH
              </p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Tổng quan công việc
              </h1>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className="px-4 py-2.5 bg-white text-primary font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
                <Download size={16} />
                Xuất báo cáo
              </button>
              <button className="px-4 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity flex items-center gap-2 text-sm">
                <CalendarPlus size={16} />
                Sắp lịch mới
              </button>
            </div>
          </div>

          {/* Bento Grid: Metrics + Chart */}
          <div className="grid grid-cols-12 gap-6">
            {/* Metric cards */}
            <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-6">
              <MetricCard
                icon={<CreditCard size={20} className="text-primary" />}
                iconBg="bg-blue-50"
                badge="+12.5%"
                badgeColor="bg-emerald-50 text-emerald-600"
                label="Doanh thu tháng này"
                value="18.5M"
                unit="VND"
              />
              <MetricCard
                icon={<School size={20} className="text-emerald-600" />}
                iconBg="bg-emerald-50"
                badge="+4h"
                badgeColor="bg-blue-50 text-blue-600"
                label="Số giờ dạy"
                value="124"
                unit="giờ"
              />
            </div>

            {/* Revenue bar chart */}
            <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  Biểu đồ Doanh thu (6 tháng)
                </h3>
                <select className="bg-slate-100 text-sm border-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/40 focus:outline-none font-semibold text-slate-600">
                  <option>Năm 2024</option>
                  <option>Năm 2023</option>
                </select>
              </div>
              <div className="h-56 flex items-end justify-between gap-3">
                {REVENUE_DATA.map((d) => (
                  <div
                    key={d.month}
                    className="flex flex-col items-center flex-1 gap-2"
                  >
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        d.active
                          ? "bg-primary shadow-lg shadow-primary/30"
                          : "bg-slate-100 hover:bg-blue-100"
                      }`}
                      style={{ height: `${d.height}%` }}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        d.active ? "text-primary" : "text-slate-400"
                      }`}
                    >
                      {d.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule + Class table */}
          <div className="grid grid-cols-12 gap-6">
            {/* Schedule */}
            <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-slate-800">
                  Lịch dạy sắp tới
                </h3>
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="space-y-5">
                {SCHEDULE.map((item, i) => (
                  <div key={i} className={`pl-4 border-l-4 ${item.color}`}>
                    <p
                      className={`text-xs font-bold mb-1 uppercase tracking-wide ${item.textColor}`}
                    >
                      {item.time} ({item.label})
                    </p>
                    <h4 className="text-sm font-bold text-slate-800">
                      {item.student} – {item.subject}
                    </h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} />
                      {item.location}
                    </p>
                  </div>
                ))}
                <button className="w-full py-2.5 bg-slate-50 text-primary font-bold text-sm rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors">
                  Xem toàn bộ lịch tuần
                </button>
              </div>
            </div>

            {/* Class table */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/60">
                <h3 className="text-base font-bold text-slate-800">
                  Danh sách lớp học hiện tại
                </h3>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                    <Filter size={16} />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                    <ArrowUpDown size={16} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white">
                      {["HỌC SINH", "MÔN HỌC", "HỌC PHÍ", "LỊCH HỌC", ""].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {CLASSES.map((cls, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${cls.avatarBg} ${cls.avatarText} flex items-center justify-center text-xs font-black`}
                            >
                              {cls.initials}
                            </div>
                            <span className="text-sm font-bold text-slate-800">
                              {cls.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {cls.subject}
                        </td>
                        <td className="px-6 py-4">
                          {cls.paid ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                              <CheckCircle2 size={12} />
                              Đã đóng
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                              <XCircle size={12} />
                              Chưa đóng
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {cls.schedule}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/tutor/classes/${i + 1}`}
                            className="text-primary hover:underline font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <Plus size={24} />
      </button>
    </div>
  );
}
