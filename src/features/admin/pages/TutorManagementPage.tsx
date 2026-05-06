import React, { useState, useMemo } from "react";
import { GraduationCap, CheckCircle, Clock, XCircle, Download } from "lucide-react";
import { mockTutors } from "../../api";
import type { Tutor, TutorStatus } from "../../types";
import PageHeader from "../components/shared/PageHeader";
import { SearchInput, SummaryCard } from "../components/shared/ui";
import StatusBadge from "../components/shared/StatusBadge";
import TutorTable from "../components/tutors/TutorTable";
import ConfirmModal from "../components/shared/ConfirmModal";
import { useToast } from "../components/shared/Toast";

const PAGE_SIZE = 8;

const TutorManagementPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<TutorStatus | "all">("all");
  const [filterSub, setFilterSub] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [banTarget, setBanTarget] = useState<Tutor | null>(null);
  const { showToast, ToastComponent } = useToast();

  // ---- Summary counts ----
  const counts = useMemo(() => ({
    total: tutors.length,
    approved: tutors.filter(t => t.status === "approved").length,
    pending: tutors.filter(t => t.status === "under_review").length,
    rejected: tutors.filter(t => t.status === "rejected").length,
    banned: tutors.filter(t => t.status === "banned").length,
  }), [tutors]);

  // ---- Filter + Search ----
  const filtered = useMemo(() => {
    return tutors.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase()) ||
        t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = filterStatus === "all" || t.status === filterStatus;
      const matchSub = filterSub === "all" || t.subscriptionPlan === filterSub;
      return matchSearch && matchStatus && matchSub;
    });
  }, [tutors, search, filterStatus, filterSub]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleToggleBan = (tutor: Tutor) => setBanTarget(tutor);
  const confirmBan = () => {
    if (!banTarget) return;
    setTutors(prev => prev.map(t =>
      t.id === banTarget.id ? { ...t, status: t.status === "banned" ? "approved" : "banned" } : t
    ));
    showToast(
      banTarget.status === "banned"
        ? `✅ Đã mở khóa tài khoản ${banTarget.name}`
        : `🔒 Đã khóa tài khoản ${banTarget.name}`,
      banTarget.status === "banned" ? "success" : "warning"
    );
    setBanTarget(null);
  };

  const statusOptions: { value: TutorStatus | "all"; label: string }[] = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "under_review", label: "Chờ duyệt" },
    { value: "approved", label: "Đã duyệt" },
    { value: "rejected", label: "Bị từ chối" },
    { value: "banned", label: "Bị khóa" },
  ];

  return (
    <div>
      <PageHeader
        title="Quản lý Gia sư"
        subtitle={`${counts.total} gia sư đã đăng ký trên hệ thống`}
        actions={
          <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm">
            <Download size={14} /> Xuất CSV
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Tổng gia sư" value={counts.total} color="blue" icon={<GraduationCap size={18} />} />
        <SummaryCard title="Đang hoạt động" value={counts.approved} color="green" icon={<CheckCircle size={18} />} />
        <SummaryCard title="Chờ duyệt" value={counts.pending} sub="Cần xử lý" color="orange" icon={<Clock size={18} />} />
        <SummaryCard title="Bị từ chối / Khóa" value={counts.rejected + counts.banned} color="red" icon={<XCircle size={18} />} />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SearchInput
          value={search} onChange={v => { setSearch(v); setCurrentPage(1); }}
          placeholder="Tìm tên, email, môn dạy..."
          className="w-72"
        />
        <select
          value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value as TutorStatus | "all"); setCurrentPage(1); }}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={filterSub}
          onChange={e => { setFilterSub(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          {["all", "free", "basic", "standard", "premium"].map(s => (
            <option key={s} value={s}>{s === "all" ? "Tất cả gói" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        {(search || filterStatus !== "all" || filterSub !== "all") && (
          <button onClick={() => { setSearch(""); setFilterStatus("all"); setFilterSub("all"); setCurrentPage(1); }}
            className="text-xs font-medium text-blue-600 hover:underline">
            Xóa bộ lọc
          </button>
        )}
        <span className="ml-auto text-xs text-slate-400">{filtered.length} kết quả</span>
      </div>

      {/* Table */}
      <TutorTable
        tutors={paginated}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onToggleBan={handleToggleBan}
      />

      {/* Confirm Ban Modal */}
      <ConfirmModal
        open={!!banTarget}
        title={banTarget?.status === "banned" ? "Mở khóa tài khoản?" : "Khóa tài khoản?"}
        description={
          banTarget?.status === "banned"
            ? `Tài khoản của ${banTarget?.name} sẽ được khôi phục và có thể hoạt động trở lại.`
            : `Tài khoản của ${banTarget?.name} sẽ bị khóa. Gia sư sẽ không thể nhận học sinh mới.`
        }
        confirmLabel={banTarget?.status === "banned" ? "Mở khóa" : "Xác nhận khóa"}
        variant={banTarget?.status === "banned" ? "info" : "danger"}
        onConfirm={confirmBan}
        onCancel={() => setBanTarget(null)}
      />

      {ToastComponent}
    </div>
  );
};

export default TutorManagementPage;
