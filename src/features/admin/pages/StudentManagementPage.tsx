import React, { useState, useMemo } from "react";
import { Users, Activity, Ban, UserPlus, Download, Eye, ShieldOff, Shield } from "lucide-react";
import { mockStudents } from "../api";
import type { Student } from "../../types";
import PageHeader from "../components/shared/PageHeader";
import { SearchInput, SummaryCard, EmptyState, Pagination } from "../components/shared/ui";
import StatusBadge from "../components/shared/StatusBadge";
import ConfirmModal from "../components/shared/ConfirmModal";
import { useToast } from "../components/shared/Toast";

const PAGE_SIZE = 8;

const StudentManagementPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [banTarget, setBanTarget] = useState<Student | null>(null);
  const { showToast, ToastComponent } = useToast();

  const counts = useMemo(() => ({
    total: students.length,
    active: students.filter(s => s.status === "active").length,
    banned: students.filter(s => s.status === "banned").length,
    newWeek: 12, // mock
  }), [students]);

  const filtered = useMemo(() => students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  }), [students, search, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const confirmBan = () => {
    if (!banTarget) return;
    setStudents(prev => prev.map(s =>
      s.id === banTarget.id ? { ...s, status: s.status === "banned" ? "active" : "banned" } : s
    ));
    showToast(banTarget.status === "banned" ? `✅ Đã mở khóa ${banTarget.name}` : `🔒 Đã khóa ${banTarget.name}`,
      banTarget.status === "banned" ? "success" : "warning");
    setBanTarget(null);
  };

  return (
    <div>
      <PageHeader title="Quản lý Học sinh" subtitle={`${counts.total} học sinh đã đăng ký`}
        actions={
          <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors">
            <Download size={14} /> Xuất CSV
          </button>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Tổng học sinh" value={counts.total} color="blue" icon={<Users size={18} />} />
        <SummaryCard title="Đang hoạt động" value={counts.active} color="green" icon={<Activity size={18} />} />
        <SummaryCard title="Mới tuần này" value={counts.newWeek} color="purple" icon={<UserPlus size={18} />} />
        <SummaryCard title="Bị khóa" value={counts.banned} color="red" icon={<Ban size={18} />} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SearchInput value={search} onChange={v => { setSearch(v); setCurrentPage(1); }} placeholder="Tìm tên, email..." className="w-72" />
        <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-blue-400">
          <option value="all">Tất cả</option>
          <option value="active">Hoạt động</option>
          <option value="banned">Bị khóa</option>
        </select>
        <span className="ml-auto text-xs text-slate-400">{filtered.length} kết quả</span>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <EmptyState icon={<Users size={28} />} title="Không có học sinh nào" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b border-slate-100">
                <tr>
                  {["Học sinh", "SĐT", "Cấp học", "Số lớp", "Tổng chi tiêu", "Ngày đăng ký", "Trạng thái", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider first:pl-6 last:pr-6 last:text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="pl-6 pr-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{student.name}</p>
                          <p className="text-xs text-slate-400">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{student.phone}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{student.grade}</td>
                    <td className="px-4 py-4 text-sm font-medium text-slate-700">{student.totalClasses}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                      {new Intl.NumberFormat("vi-VN").format(student.totalSpent)}đ
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {new Date(student.registeredAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-4"><StatusBadge variant={student.status} /></td>
                    <td className="pl-4 pr-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                          <Eye size={13} /> Xem
                        </button>
                        <button onClick={() => setBanTarget(student)}
                          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            student.status === "banned"
                              ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                              : "text-red-600 bg-red-50 hover:bg-red-100"
                          }`}>
                          {student.status === "banned" ? <><Shield size={13} />Mở khóa</> : <><ShieldOff size={13} />Khóa</>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      <ConfirmModal
        open={!!banTarget}
        title={banTarget?.status === "banned" ? "Mở khóa tài khoản?" : "Khóa tài khoản?"}
        description={`Tài khoản của học sinh ${banTarget?.name} sẽ ${banTarget?.status === "banned" ? "được mở khóa" : "bị khóa"}.`}
        confirmLabel={banTarget?.status === "banned" ? "Mở khóa" : "Khóa"}
        variant={banTarget?.status === "banned" ? "info" : "danger"}
        onConfirm={confirmBan} onCancel={() => setBanTarget(null)}
      />
      {ToastComponent}
    </div>
  );
};

export default StudentManagementPage;
