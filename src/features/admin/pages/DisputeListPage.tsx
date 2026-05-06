import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquareWarning, Clock, CheckCircle, XCircle, ChevronRight, DollarSign } from "lucide-react";
import { mockDisputes } from "../../api";
import type { Dispute } from "../../types";
import PageHeader from "../components/shared/PageHeader";
import { SearchInput, SummaryCard, EmptyState } from "../components/shared/ui";
import StatusBadge from "../components/shared/StatusBadge";

const typeLabel: Record<Dispute["type"], string> = {
  tutor_absent: "Gia sư bỏ tiết",
  quality_issue: "Chất lượng kém",
  refund_request: "Yêu cầu hoàn tiền",
  other: "Khác",
};

const typeColor: Record<Dispute["type"], string> = {
  tutor_absent: "bg-red-100 text-red-700",
  quality_issue: "bg-amber-100 text-amber-700",
  refund_request: "bg-violet-100 text-violet-700",
  other: "bg-slate-100 text-slate-500",
};

const fmt = (v: number) => new Intl.NumberFormat("vi-VN").format(v) + "đ";

const DisputeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [disputes] = useState<Dispute[]>(mockDisputes);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => ({
    new: disputes.filter(d => d.status === "new").length,
    processing: disputes.filter(d => d.status === "processing").length,
    resolved: disputes.filter(d => d.status === "resolved").length,
    totalAmount: disputes.filter(d => d.status === "new" || d.status === "processing")
      .reduce((acc, d) => acc + d.escrowAmount, 0),
  }), [disputes]);

  const filtered = useMemo(() => disputes.filter(d => {
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    const matchType = filterType === "all" || d.type === filterType;
    const matchSearch = d.creatorName.toLowerCase().includes(search.toLowerCase()) ||
      d.subjectName.toLowerCase().includes(search.toLowerCase()) ||
      d.ticketCode.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchSearch;
  }), [disputes, filterStatus, filterType, search]);

  return (
    <div>
      <PageHeader title="Trung tâm Xử lý Tranh chấp"
        subtitle="Tiếp nhận và phân xử các ticket khiếu nại"
        breadcrumbs={[{ label: "Admin", path: "/admin" }, { label: "Tranh chấp" }]}
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Ticket mới" value={counts.new} sub="Chưa xử lý" color="red" icon={<MessageSquareWarning size={18} />} />
        <SummaryCard title="Đang xử lý" value={counts.processing} color="orange" icon={<Clock size={18} />} />
        <SummaryCard title="Đã giải quyết" value={counts.resolved} color="green" icon={<CheckCircle size={18} />} />
        <SummaryCard title="Tổng tiền tranh chấp" value={fmt(counts.totalAmount)} color="purple" icon={<DollarSign size={18} />} />
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm mã ticket, tên..." className="w-64" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-blue-400">
          <option value="all">Tất cả trạng thái</option>
          <option value="new">Mới</option>
          <option value="processing">Đang xử lý</option>
          <option value="resolved">Đã giải quyết</option>
          <option value="closed">Đã đóng</option>
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-blue-400">
          <option value="all">Tất cả loại</option>
          <option value="tutor_absent">Gia sư bỏ tiết</option>
          <option value="quality_issue">Chất lượng kém</option>
          <option value="refund_request">Yêu cầu hoàn tiền</option>
          <option value="other">Khác</option>
        </select>
        <span className="ml-auto text-xs text-slate-400 self-center">{filtered.length} ticket</span>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <EmptyState icon={<MessageSquareWarning size={28} />} title="Không có tranh chấp nào" description="Không có kết quả khớp với bộ lọc hiện tại" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-slate-100">
                <tr>
                  {["Mã ticket", "Người tạo", "Khiếu nại về", "Loại", "Tiền tranh chấp", "Tiến độ", "Trạng thái", "Ngày tạo", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider first:pl-6 last:pr-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/admin/disputes/${d.id}`)}>
                    <td className="pl-6 pr-4 py-4">
                      <span className="text-xs font-bold font-mono text-slate-700">{d.ticketCode}</span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-slate-800">{d.creatorName}</p>
                      <p className="text-xs text-slate-400">{d.createdBy === "student" ? "Học sinh" : "Gia sư"}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{d.subjectName}</td>
                    <td className="px-4 py-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${typeColor[d.type]}`}>
                        {typeLabel[d.type]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-slate-800">{fmt(d.escrowAmount)}</td>
                    <td className="px-4 py-4 text-xs text-slate-500">{d.completedSessions}/{d.totalSessions} buổi</td>
                    <td className="px-4 py-4"><StatusBadge variant={d.status} /></td>
                    <td className="px-4 py-4 text-xs text-slate-400">
                      {new Date(d.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="pl-4 pr-6 py-4">
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeListPage;
