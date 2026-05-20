import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  Loader2,
  ReceiptText,
  AlertTriangle,
} from "lucide-react";

interface Transaction {
  transactionId: string;
  roadmapId: string;
  roadmapTitle: string;
  studentName: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED";
  description: string;
  providerReference: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  SUCCESS: { label: "Thành công", classes: "bg-emerald-100 text-emerald-700" },
  PENDING: { label: "Đang xử lý", classes: "bg-amber-100 text-amber-700" },
  FAILED: { label: "Thất bại", classes: "bg-red-100 text-red-700" },
  EXPIRED: { label: "Hết hạn", classes: "bg-slate-100 text-slate-600" },
};

export default function StudentBillingPage() {
  const [userId] = useState(() => localStorage.getItem("userId") || "11111111-1111-1111-1111-111111111111");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/student/payments/transactions?userId=${userId}`
        );
        if (res.ok) {
          const json = await res.json();
          setTransactions(json.data || []);
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch sử giao dịch:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [userId]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const totalPaid = transactions
    .filter((t) => t.paymentStatus === "SUCCESS")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const filtered = transactions.filter((t) => {
    const matchSearch =
      !searchQuery ||
      t.roadmapTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.transactionId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "ALL" || t.paymentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Thanh toán & Hóa đơn
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Quản lý lịch sử thanh toán học phí của bạn.
          </p>
        </div>
        <div className="h-12 w-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
          <CreditCard size={28} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tổng đã thanh toán</p>
          <p className="text-4xl font-black text-indigo-600 tracking-tighter">
            {isLoading ? "—" : formatCurrency(totalPaid)}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tổng giao dịch</p>
          <p className="text-4xl font-black text-slate-900">{isLoading ? "—" : transactions.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Giao dịch thành công</p>
          <p className="text-4xl font-black text-emerald-600">
            {isLoading ? "—" : transactions.filter((t) => t.paymentStatus === "SUCCESS").length}
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-black text-slate-900">Lịch sử giao dịch</h3>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Tìm giao dịch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all w-full md:w-56 font-medium"
              />
            </div>
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="ALL">Tất cả</option>
              <option value="SUCCESS">Thành công</option>
              <option value="PENDING">Đang xử lý</option>
              <option value="FAILED">Thất bại</option>
              <option value="EXPIRED">Hết hạn</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-indigo-600" size={36} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <ReceiptText size={48} className="mb-3 opacity-30" />
            <p className="font-bold">Chưa có giao dịch nào.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lộ trình học</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Phương thức</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Số tiền</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Mã GD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((t) => {
                  const statusCfg = STATUS_CONFIG[t.paymentStatus] || STATUS_CONFIG.PENDING;
                  return (
                    <tr key={t.transactionId} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-5 text-sm text-slate-500 font-bold whitespace-nowrap">
                        {formatDate(t.createdAt)}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <ArrowUpRight size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 max-w-xs truncate">
                              {t.roadmapTitle || t.description || "Thanh toán học phí"}
                            </p>
                            <p className="text-xs text-slate-400 font-medium">Học sinh: {t.studentName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-600">
                        {t.paymentMethod || "—"}
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-slate-900 whitespace-nowrap">
                        {formatCurrency(t.amount || 0)}
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusCfg.classes}`}>
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="text-xs text-slate-400 font-mono">
                          {t.providerReference || t.transactionId?.slice(0, 8) + "..."}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
