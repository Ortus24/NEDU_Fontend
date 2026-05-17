import React, { useState, useEffect, useCallback } from "react";
import {
  GraduationCap, CheckCircle, Clock, XCircle, Download,
  Loader2, AlertCircle, RefreshCw,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";
import { SearchInput, SummaryCard } from "../components/shared/ui";
import TutorTable from "../components/tutors/TutorTable";
import ConfirmModal from "../components/shared/ConfirmModal";
import { useToast } from "../components/shared/Toast";
import {
  fetchAdminTutors,
  fetchTutorStats,
  updateTutorStatus,
  type AdminTutorResponse,
} from "../services/tutorApi";

const PAGE_SIZE = 8;

const TutorManagementPage: React.FC = () => {
  // ── Data State ──────────────────────────────────────────────────
  const [tutors, setTutors] = useState<AdminTutorResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [newThisWeek, setNewThisWeek] = useState(0);

  // ── UI State ────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Action State ────────────────────────────────────────────────
  const [banTarget, setBanTarget] = useState<AdminTutorResponse | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showToast, ToastComponent } = useToast();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Fetch ───────────────────────────────────────────────────────
  const loadTutors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pageData, stats] = await Promise.all([
        fetchAdminTutors({
          keyword: debouncedSearch || undefined,
          kycStatus: filterStatus === "all" ? undefined : filterStatus,
          page: currentPage - 1,
          size: PAGE_SIZE,
        }),
        fetchTutorStats(),
      ]);
      setTutors(pageData.content);
      setTotalElements(pageData.totalElements);
      setTotalPages(pageData.totalPages);
      setNewThisWeek(stats.newThisWeek);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Không thể tải danh sách gia sư. Vui lòng kiểm tra kết nối Backend.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filterStatus, currentPage]);

  useEffect(() => {
    loadTutors();
  }, [loadTutors]);

  // Summary counts (client-side từ data trang hiện tại)
  const approvedCount = tutors.filter((t) => t.kycStatus === "APPROVED").length;
  const pendingCount  = tutors.filter((t) => t.kycStatus === "UNDER_REVIEW" || t.kycStatus === "SUBMITTED").length;
  const rejectedCount = tutors.filter((t) => t.kycStatus === "REJECTED" || t.userStatus === "BANNED").length;

  // ── Confirm Ban/Unban ───────────────────────────────────────────
  const confirmToggleStatus = async () => {
    if (!banTarget) return;
    setActionLoading(true);
    try {
      const newStatus = banTarget.userStatus === "BANNED" ? "ACTIVE" : "BANNED";
      const updated = await updateTutorStatus(banTarget.id, newStatus);
      setTutors((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      showToast(
        newStatus === "BANNED"
          ? `🔒 Đã khóa tài khoản ${banTarget.fullName}`
          : `✅ Đã mở khóa ${banTarget.fullName}`,
        newStatus === "BANNED" ? "warning" : "success"
      );
    } catch (err: any) {
      showToast(`❌ ${err?.response?.data?.message || "Có lỗi xảy ra!"}`, "error");
    } finally {
      setActionLoading(false);
      setBanTarget(null);
    }
  };

  const statusOptions = [
    { value: "all",          label: "Tất cả trạng thái" },
    { value: "UNDER_REVIEW", label: "Chờ duyệt" },
    { value: "APPROVED",     label: "Đã duyệt" },
    { value: "SUBMITTED",    label: "Đã nộp hồ sơ" },
    { value: "REJECTED",     label: "Bị từ chối" },
    { value: "DRAFT",        label: "Nháp" },
  ];

  return (
    <div>
      <PageHeader
        title="Quản lý Gia sư"
        subtitle={`${totalElements} gia sư đã đăng ký trên hệ thống`}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={loadTutors}
              className="flex items-center gap-1 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              <RefreshCw size={14} />
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm">
              <Download size={14} /> Xuất CSV
            </button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Tổng gia sư"         value={totalElements}  color="blue"   icon={<GraduationCap size={18} />} />
        <SummaryCard title="Đang hoạt động"       value={approvedCount}  color="green"  icon={<CheckCircle size={18} />} />
        <SummaryCard title="Chờ duyệt" sub="Cần xử lý" value={pendingCount} color="orange" icon={<Clock size={18} />} />
        <SummaryCard title="Từ chối / Khóa"       value={rejectedCount}  color="red"    icon={<XCircle size={18} />} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SearchInput
          value={search}
          onChange={(v) => setSearch(v)}
          placeholder="Tìm tên, email..."
          className="w-72"
        />
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {(search || filterStatus !== "all") && (
          <button
            onClick={() => { setSearch(""); setFilterStatus("all"); setCurrentPage(1); }}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            Xóa bộ lọc
          </button>
        )}
        {loading && (
          <span className="ml-2 flex items-center gap-1 text-xs text-slate-400">
            <Loader2 size={12} className="animate-spin" /> Đang tải...
          </span>
        )}
        <span className="ml-auto text-xs text-slate-400">{totalElements} kết quả</span>
      </div>

      {/* Error */}
      {error && !loading && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 mb-4 text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          <span className="text-sm">{error}</span>
          <button onClick={loadTutors} className="ml-auto text-xs font-semibold underline underline-offset-2">
            Thử lại
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-50 last:border-0 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-36 bg-slate-200 rounded" />
                <div className="h-2.5 w-48 bg-slate-100 rounded" />
              </div>
              <div className="h-3 w-20 bg-slate-200 rounded" />
              <div className="h-6 w-14 bg-slate-200 rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <TutorTable
          tutors={tutors}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onToggleBan={(tutor) => setBanTarget(tutor)}
        />
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!banTarget}
        title={banTarget?.userStatus === "BANNED" ? "Mở khóa tài khoản?" : "Khóa tài khoản?"}
        description={
          banTarget?.userStatus === "BANNED"
            ? `Tài khoản của ${banTarget?.fullName} sẽ được khôi phục và có thể hoạt động trở lại.`
            : `Tài khoản của ${banTarget?.fullName} sẽ bị khóa. Gia sư sẽ không thể nhận học sinh mới.`
        }
        confirmLabel={actionLoading ? "Đang xử lý..." : banTarget?.userStatus === "BANNED" ? "Mở khóa" : "Xác nhận khóa"}
        variant={banTarget?.userStatus === "BANNED" ? "info" : "danger"}
        onConfirm={confirmToggleStatus}
        onCancel={() => !actionLoading && setBanTarget(null)}
      />
      {ToastComponent}
    </div>
  );
};

export default TutorManagementPage;
