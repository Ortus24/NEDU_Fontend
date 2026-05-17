import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Activity,
  Ban,
  UserPlus,
  Download,
  Eye,
  ShieldOff,
  Shield,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";
import {
  SearchInput,
  SummaryCard,
  EmptyState,
  Pagination,
} from "../components/shared/ui";
import StatusBadge from "../components/shared/StatusBadge";
import ConfirmModal from "../components/shared/ConfirmModal";
import { useToast } from "../components/shared/Toast";
import {
  fetchAdminStudents,
  fetchStudentStats,
  updateStudentStatus,
  type AdminStudentResponse,
} from "../services/studentApi";

// Map gradeLevel enum → tên hiển thị tiếng Việt
const GRADE_LABEL: Record<string, string> = {
  PRIMARY: "Tiểu học",
  SECONDARY: "THCS",
  HIGH_SCHOOL: "THPT",
  UNIVERSITY: "Đại học",
  OTHER: "Khác",
};

// Map status backend → variant cho StatusBadge (đang dùng "active"/"banned")
const STATUS_MAP: Record<string, "active" | "banned" | "inactive"> = {
  ACTIVE: "active",
  BANNED: "banned",
  INACTIVE: "inactive",
};

const PAGE_SIZE = 8;

const StudentManagementPage: React.FC = () => {
  // ── Data State ──────────────────────────────────────────────────
  const [students, setStudents] = useState<AdminStudentResponse[]>([]);
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
  const [banTarget, setBanTarget] = useState<AdminStudentResponse | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showToast, ToastComponent } = useToast();

  // Debounce search input (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Fetch Data ──────────────────────────────────────────────────
  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pageData, stats] = await Promise.all([
        fetchAdminStudents({
          keyword: debouncedSearch || undefined,
          status: filterStatus === "all" ? undefined : filterStatus.toUpperCase(),
          page: currentPage - 1, // backend 0-based
          size: PAGE_SIZE,
        }),
        fetchStudentStats(),
      ]);
      setStudents(pageData.content);
      setTotalElements(pageData.totalElements);
      setTotalPages(pageData.totalPages);
      setNewThisWeek(stats.newThisWeek);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Không thể tải danh sách học sinh. Vui lòng kiểm tra kết nối với Backend.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filterStatus, currentPage]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Đếm ban (client-side từ data hiện có)
  const bannedCount = students.filter((s) => s.status === "BANNED").length;
  const activeCount = students.filter((s) => s.status === "ACTIVE").length;

  // ── Confirm Ban/Unban ───────────────────────────────────────────
  const confirmToggleStatus = async () => {
    if (!banTarget) return;
    setActionLoading(true);
    try {
      const newStatus = banTarget.status === "BANNED" ? "ACTIVE" : "BANNED";
      const updated = await updateStudentStatus(banTarget.id, newStatus);

      // Cập nhật local state ngay (optimistic)
      setStudents((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );

      showToast(
        newStatus === "BANNED"
          ? `🔒 Đã khóa tài khoản ${banTarget.fullName}`
          : `✅ Đã mở khóa ${banTarget.fullName}`,
        newStatus === "BANNED" ? "warning" : "success"
      );
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Có lỗi xảy ra!";
      showToast(`❌ ${msg}`, "error");
    } finally {
      setActionLoading(false);
      setBanTarget(null);
    }
  };

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div>
      <PageHeader
        title="Quản lý Học sinh"
        subtitle={`${totalElements} học sinh đã đăng ký`}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={loadStudents}
              className="flex items-center gap-1 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              <RefreshCw size={14} />
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors">
              <Download size={14} /> Xuất CSV
            </button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Tổng học sinh"
          value={totalElements}
          color="blue"
          icon={<Users size={18} />}
        />
        <SummaryCard
          title="Đang hoạt động"
          value={activeCount}
          color="green"
          icon={<Activity size={18} />}
        />
        <SummaryCard
          title="Mới 7 ngày qua"
          value={newThisWeek}
          color="purple"
          icon={<UserPlus size={18} />}
        />
        <SummaryCard
          title="Bị khóa"
          value={bannedCount}
          color="red"
          icon={<Ban size={18} />}
        />
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
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-blue-400"
        >
          <option value="all">Tất cả</option>
          <option value="ACTIVE">Hoạt động</option>
          <option value="INACTIVE">Không hoạt động</option>
          <option value="BANNED">Bị khóa</option>
        </select>
        {loading && (
          <span className="ml-2 flex items-center gap-1 text-xs text-slate-400">
            <Loader2 size={12} className="animate-spin" /> Đang tải...
          </span>
        )}
        <span className="ml-auto text-xs text-slate-400">
          {totalElements} kết quả
        </span>
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 mb-4 text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          <span className="text-sm">{error}</span>
          <button
            onClick={loadStudents}
            className="ml-auto text-xs font-semibold underline underline-offset-2"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-4 border-b border-slate-50 last:border-0 animate-pulse"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-36 bg-slate-200 rounded" />
                <div className="h-2.5 w-48 bg-slate-100 rounded" />
              </div>
              <div className="h-3 w-20 bg-slate-200 rounded" />
              <div className="h-3 w-16 bg-slate-100 rounded" />
              <div className="h-6 w-14 bg-slate-200 rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <>
          {students.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <EmptyState
                icon={<Users size={28} />}
                title="Không có học sinh nào"
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="border-b border-slate-100">
                    <tr>
                      {[
                        "Học sinh",
                        "SĐT",
                        "Cấp học",
                        "Số lớp",
                        "Tổng chi tiêu",
                        "Ngày đăng ký",
                        "Trạng thái",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider first:pl-6 last:pr-6 last:text-right"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        {/* Avatar + Name + Email */}
                        <td className="pl-6 pr-4 py-4">
                          <div className="flex items-center gap-3">
                            {student.avatarUrl ? (
                              <img
                                src={student.avatarUrl}
                                alt={student.fullName}
                                className="w-9 h-9 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                {student.fullName?.charAt(0) ?? "?"}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {student.fullName}
                              </p>
                              <p className="text-xs text-slate-400">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {student.phone || "—"}
                        </td>

                        {/* Grade */}
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {student.gradeLevel
                            ? GRADE_LABEL[student.gradeLevel] ??
                              student.gradeLevel
                            : "—"}
                        </td>

                        {/* Total Classes */}
                        <td className="px-4 py-4 text-sm font-medium text-slate-700">
                          {student.totalClasses}
                        </td>

                        {/* Total Spent */}
                        <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                          {new Intl.NumberFormat("vi-VN").format(
                            student.totalSpent ?? 0
                          )}
                          đ
                        </td>

                        {/* Registered At */}
                        <td className="px-4 py-4 text-sm text-slate-500">
                          {student.registeredAt
                            ? new Date(student.registeredAt).toLocaleDateString(
                                "vi-VN"
                              )
                            : "—"}
                        </td>

                        {/* Status Badge */}
                        <td className="px-4 py-4">
                          <StatusBadge
                            variant={STATUS_MAP[student.status] ?? "active"}
                          />
                        </td>

                        {/* Actions */}
                        <td className="pl-4 pr-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                              <Eye size={13} /> Xem
                            </button>
                            <button
                              onClick={() => setBanTarget(student)}
                              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                                student.status === "BANNED"
                                  ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                  : "text-red-600 bg-red-50 hover:bg-red-100"
                              }`}
                            >
                              {student.status === "BANNED" ? (
                                <>
                                  <Shield size={13} />
                                  Mở khóa
                                </>
                              ) : (
                                <>
                                  <ShieldOff size={13} />
                                  Khóa
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!banTarget}
        title={
          banTarget?.status === "BANNED"
            ? "Mở khóa tài khoản?"
            : "Khóa tài khoản?"
        }
        description={`Tài khoản của học sinh ${banTarget?.fullName} sẽ ${
          banTarget?.status === "BANNED" ? "được mở khóa" : "bị khóa"
        }.`}
        confirmLabel={
          actionLoading
            ? "Đang xử lý..."
            : banTarget?.status === "BANNED"
            ? "Mở khóa"
            : "Khóa"
        }
        variant={banTarget?.status === "BANNED" ? "info" : "danger"}
        onConfirm={confirmToggleStatus}
        onCancel={() => !actionLoading && setBanTarget(null)}
      />
      {ToastComponent}
    </div>
  );
};

export default StudentManagementPage;
