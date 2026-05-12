import React, { useState } from "react";
import {
  Download,
  TrendingUp,
  Building2,
  CheckCircle2,
  MoreVertical,
  Search,
  Bell,
  Mail,
  Plus,
  CreditCard,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

// ─── Types ────────────────────────────────────────────────────────────────────

type TxStatus = "completed" | "processing" | "failed";

interface Transaction {
  id: string;
  date: string;
  description: string;
  code: string;
  amount: number;
  status: TxStatus;
  type: "income" | "withdrawal";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHART_DATA = [
  { label: "Tháng 1", height: 40, value: "12tr" },
  { label: "Tháng 2", height: 55, value: "15tr" },
  { label: "Tháng 3", height: 48, value: "13tr" },
  { label: "Tháng 4", height: 70, value: "19tr" },
  { label: "Tháng 5", height: 85, value: "22tr", active: true },
  { label: "Tháng 6", height: 65, value: "18tr" },
];

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "15/05/2024",
    description: "Thanh toán từ Lớp IELTS Cấp tốc (Nguyễn Văn A)",
    code: "#TRX-9821",
    amount: 2500000,
    status: "completed",
    type: "income",
  },
  {
    id: "2",
    date: "14/05/2024",
    description: "Rút tiền về Vietcombank (..8899)",
    code: "#WDR-2201",
    amount: -5000000,
    status: "processing",
    type: "withdrawal",
  },
  {
    id: "3",
    date: "12/05/2024",
    description: "Thanh toán từ Lớp Tiếng Anh Giao tiếp (Trần B)",
    code: "#TRX-9755",
    amount: 1800000,
    status: "completed",
    type: "income",
  },
  {
    id: "4",
    date: "10/05/2024",
    description: "Thanh toán từ Lớp Toán học lớp 12",
    code: "#TRX-9700",
    amount: 3200000,
    status: "completed",
    type: "income",
  },
];

const STATUS_CONFIG: Record<TxStatus, { label: string; cls: string }> = {
  completed: { label: "Hoàn tất", cls: "bg-emerald-50 text-emerald-700" },
  processing: { label: "Đang xử lý", cls: "bg-amber-50 text-amber-700" },
  failed: { label: "Thất bại", cls: "bg-red-50 text-red-600" },
};

const formatVND = (n: number) => Math.abs(n).toLocaleString("vi-VN") + "đ";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TutorFinancesPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("10.000.000");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* ── Sidebar ── */}
      <TutorSidebar name="Minh Anh" role="Senior Tutor" />

      {/* ── Main ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Body */}
        <main className="p-8 flex-1 space-y-7">
          {/* Page heading */}
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black text-primary tracking-tight">
                Tài chính &amp; Rút tiền
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Quản lý thu nhập và các giao dịch thanh toán của bạn.
              </p>
            </div>
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-primary font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
              <Download size={16} />
              Xuất báo cáo
            </button>
          </div>

          {/* ── Bento grid: metrics + withdraw ── */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left: metrics + chart */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              {/* Metric cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Total revenue */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    Tổng doanh thu
                  </p>
                  <p className="text-2xl font-black text-primary">
                    125.400.000đ
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-emerald-600 text-xs font-bold">
                    <TrendingUp size={13} />
                    +12% tháng này
                  </div>
                </div>

                {/* Pending balance */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    Số dư treo
                  </p>
                  <p className="text-2xl font-black text-slate-800">
                    12.500.000đ
                  </p>
                  <p className="mt-2 text-xs text-slate-400 italic">
                    Đang chờ xác nhận lớp
                  </p>
                </div>

                {/* Available */}
                <div className="bg-primary rounded-2xl p-6 shadow-lg shadow-primary/20 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-3">
                    Khả dụng để rút
                  </p>
                  <p className="text-2xl font-black">45.200.000đ</p>
                  <button className="mt-4 w-full py-2 bg-white text-primary font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors">
                    Rút tiền ngay
                  </button>
                </div>
              </div>

              {/* Revenue chart */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-black text-slate-900">
                    Xu hướng thu nhập
                  </h3>
                  <select className="bg-slate-100 text-sm border-none rounded-xl px-3 py-1.5 focus:outline-none font-semibold text-slate-600">
                    <option>6 tháng qua</option>
                    <option>Năm nay</option>
                  </select>
                </div>
                <div className="h-52 flex items-end gap-3">
                  {CHART_DATA.map((bar, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div
                        className="relative w-full flex flex-col justify-end"
                        style={{ height: "180px" }}
                      >
                        {/* Tooltip */}
                        {hoveredBar === i && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap z-10 shadow-lg">
                            {bar.value}
                          </div>
                        )}
                        <div
                          className={`w-full rounded-t-xl transition-all duration-300 ${
                            bar.active
                              ? "bg-primary shadow-lg shadow-primary/30"
                              : hoveredBar === i
                                ? "bg-blue-200"
                                : "bg-slate-100"
                          }`}
                          style={{ height: `${bar.height}%` }}
                        />
                      </div>
                      <span
                        className={`text-[10px] font-bold tracking-wide ${
                          bar.active ? "text-primary" : "text-slate-400"
                        }`}
                      >
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Withdraw panel */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col gap-5">
                <h3 className="text-base font-black text-slate-900">
                  Rút tiền về ngân hàng
                </h3>

                {/* Bank account selector */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Chọn tài khoản
                  </label>
                  <div className="border-2 border-primary bg-blue-50 p-4 rounded-2xl flex items-center gap-3 cursor-pointer">
                    <div className="bg-primary text-white p-2.5 rounded-xl shrink-0">
                      <Building2 size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-primary">
                        Vietcombank
                      </p>
                      <p className="text-xs text-slate-500">**** **** 8899</p>
                    </div>
                    <CheckCircle2 size={18} className="text-primary shrink-0" />
                  </div>
                  <button className="mt-2.5 text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                    <Plus size={14} />
                    Thêm tài khoản mới
                  </button>
                </div>

                {/* Amount input */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Số tiền rút (VND)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full border border-slate-200 rounded-2xl py-3 px-4 text-xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary font-bold text-xs hover:underline">
                      Tối đa
                    </button>
                  </div>
                </div>

                {/* Fee summary */}
                <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phí giao dịch (0.5%)</span>
                    <span className="font-semibold text-slate-700">
                      50.000đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      Thời gian xử lý dự kiến
                    </span>
                    <span className="font-bold text-emerald-600">24 giờ</span>
                  </div>
                  <hr className="border-slate-200" />
                  <div className="flex justify-between font-black text-base">
                    <span className="text-slate-800">Thực nhận</span>
                    <span className="text-primary">9.950.000đ</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/30 mt-auto">
                  Xác nhận rút tiền
                </button>
              </div>
            </div>
          </div>

          {/* ── Transaction History ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/60">
              <h3 className="text-base font-black text-slate-900">
                Lịch sử giao dịch
              </h3>
              <button className="px-4 py-2 text-sm font-bold border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 flex items-center gap-1.5">
                Bộ lọc
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white">
                    {["Ngày", "Mô tả", "Số tiền", "Trạng thái", ""].map((h) => (
                      <th
                        key={h}
                        className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 ${
                          h === "Trạng thái" ? "text-center" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TRANSACTIONS.map((tx) => {
                    const isIncome = tx.type === "income";
                    const st = STATUS_CONFIG[tx.status];
                    return (
                      <tr
                        key={tx.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                          {tx.date}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                isIncome
                                  ? "bg-blue-50 text-primary"
                                  : "bg-red-50 text-red-500"
                              }`}
                            >
                              <CreditCard size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800 leading-snug">
                                {tx.description}
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                Mã GD: {tx.code}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-sm font-black ${
                              isIncome ? "text-emerald-600" : "text-red-500"
                            }`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatVND(tx.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${st.cls}`}
                            >
                              {st.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-300 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-white flex justify-between items-center text-sm text-slate-400 border-t border-slate-100">
              <span>Hiển thị 4 trên 128 giao dịch</span>
              <div className="flex gap-1.5">
                {["Trước", "1", "2", "3", "Tiếp"].map((p) => (
                  <button
                    key={p}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      p === "1"
                        ? "bg-primary text-white shadow-sm shadow-primary/30"
                        : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
