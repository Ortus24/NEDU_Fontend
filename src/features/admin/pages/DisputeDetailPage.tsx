import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, DollarSign, Users, BookOpen, RefreshCw, CheckCircle } from "lucide-react";
import { mockDisputes } from "../api";
import type { DisputeOutcome } from "../../types";
import PageHeader from "../components/shared/PageHeader";
import StatusBadge from "../components/shared/StatusBadge";
import ConfirmModal from "../components/shared/ConfirmModal";
import { useToast } from "../components/shared/Toast";

const fmt = (v: number) => new Intl.NumberFormat("vi-VN").format(v) + "đ";

const typeLabel: Record<string, string> = {
  tutor_absent: "Gia sư bỏ tiết",
  quality_issue: "Chất lượng giảng dạy kém",
  refund_request: "Yêu cầu hoàn tiền",
  other: "Khác",
};

const DisputeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();

  const dispute = mockDisputes.find(d => d.id === id);
  const [selectedOutcome, setSelectedOutcome] = useState<DisputeOutcome>(null);
  const [partialPercent, setPartialPercent] = useState(50);
  const [adminNote, setAdminNote] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  if (!dispute) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-slate-500">Không tìm thấy ticket</p>
        <button onClick={() => navigate("/admin/disputes")} className="mt-3 text-blue-600 text-sm hover:underline">← Quay lại</button>
      </div>
    );
  }

  const perSessionAmount = dispute.escrowAmount / dispute.totalSessions;
  const earnedAmount = perSessionAmount * dispute.completedSessions;
  const remainingAmount = dispute.escrowAmount - earnedAmount;

  const outcomeRefundAmount =
    selectedOutcome === "refund_student" ? dispute.escrowAmount :
    selectedOutcome === "release_tutor" ? 0 :
    selectedOutcome === "partial_refund" ? (dispute.escrowAmount * partialPercent / 100) : 0;

  const outcomeTutorAmount = dispute.escrowAmount - outcomeRefundAmount;

  const handleConfirm = () => {
    showToast(`✅ Đã phân xử ticket ${dispute.ticketCode}`);
    setShowConfirm(false);
    setTimeout(() => navigate("/admin/disputes"), 1000);
  };

  const timelineEvents = [
    { time: new Date(dispute.createdAt).toLocaleString("vi-VN"), label: "Ticket được tạo", color: "bg-blue-500" },
    { time: "10 phút sau", label: "Admin đã xem xét ticket", color: "bg-amber-500" },
    ...(dispute.status === "processing" ? [{ time: "Hôm nay", label: "Đang trong quá trình xử lý", color: "bg-amber-400", pulse: true }] : []),
  ];

  return (
    <div>
      <PageHeader
        title={`Ticket ${dispute.ticketCode}`}
        breadcrumbs={[{ label: "Admin", path: "/admin" }, { label: "Tranh chấp", path: "/admin/disputes" }, { label: dispute.ticketCode }]}
      />

      {/* Status bar */}
      <div className="flex items-center gap-3 mb-6 px-5 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <StatusBadge variant={dispute.status} />
        <span className="text-sm text-slate-600">
          Loại: <strong>{typeLabel[dispute.type]}</strong>
        </span>
        <span className="text-sm text-slate-400">|</span>
        <span className="text-sm text-slate-600">
          Tạo lúc: <strong>{new Date(dispute.createdAt).toLocaleString("vi-VN")}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* LEFT — 3/5 */}
        <div className="xl:col-span-3 space-y-5">

          {/* Dispute Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Thông tin tranh chấp</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"><Users size={15} /></div>
                <div>
                  <p className="text-xs text-slate-400">Người khiếu nại</p>
                  <p className="text-sm font-semibold text-slate-800">{dispute.creatorName} <span className="text-slate-400 font-normal text-xs">({dispute.createdBy === "student" ? "Học sinh" : "Gia sư"})</span></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"><Users size={15} /></div>
                <div>
                  <p className="text-xs text-slate-400">Đối tượng bị khiếu nại</p>
                  <p className="text-sm font-semibold text-slate-800">{dispute.subjectName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"><BookOpen size={15} /></div>
                <div>
                  <p className="text-xs text-slate-400">Mô tả chi tiết</p>
                  <p className="text-sm text-slate-700 leading-relaxed mt-1">{dispute.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={16} className="text-slate-400" /> Lịch sử xử lý
            </h3>
            <div className="space-y-4 relative">
              <div className="absolute left-3 top-4 bottom-0 w-px bg-slate-100" />
              {timelineEvents.map((ev, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className={`w-6 h-6 rounded-full ${ev.color} flex items-center justify-center shrink-0 z-10 ${(ev as any).pulse ? "animate-pulse" : ""}`}>
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{ev.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — 2/5 */}
        <div className="xl:col-span-2 space-y-5">

          {/* Course Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <DollarSign size={16} className="text-slate-400" /> Thông tin tài chính
            </h3>
            <div className="space-y-3">
              {[
                { label: "Tổng tiền Escrow", value: fmt(dispute.escrowAmount), bold: true },
                { label: "Số buổi học", value: `${dispute.completedSessions}/${dispute.totalSessions} buổi` },
                { label: "Đã hoàn thành", value: fmt(earnedAmount), sub: `(${dispute.completedSessions} buổi × ${fmt(perSessionAmount)})` },
                { label: "Tiền chưa dùng", value: fmt(remainingAmount), highlight: true },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-start py-2 border-b border-slate-50 last:border-0 ${row.highlight ? "bg-amber-50 -mx-2 px-2 rounded-lg" : ""}`}>
                  <p className="text-sm text-slate-500">{row.label}</p>
                  <div className="text-right">
                    <p className={`text-sm ${row.bold ? "font-bold text-slate-800" : row.highlight ? "font-bold text-amber-700" : "font-medium text-slate-700"}`}>
                      {row.value}
                    </p>
                    {row.sub && <p className="text-[10px] text-slate-400">{row.sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Box */}
          {(dispute.status === "new" || dispute.status === "processing") && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Quyết định phân xử</h3>

              <div className="space-y-2 mb-4">
                {([
                  { value: "refund_student" as DisputeOutcome, label: "Hoàn 100% cho Học sinh", sub: `→ ${fmt(dispute.escrowAmount)}`, color: "border-blue-300 bg-blue-50" },
                  { value: "release_tutor" as DisputeOutcome, label: "Giải ngân cho Gia sư", sub: `→ ${fmt(earnedAmount)} (phần đã học)`, color: "border-emerald-300 bg-emerald-50" },
                  { value: "partial_refund" as DisputeOutcome, label: "Hoàn một phần tùy chỉnh", sub: "Tự nhập tỷ lệ hoàn tiền", color: "border-amber-300 bg-amber-50" },
                ] as { value: DisputeOutcome; label: string; sub: string; color: string }[]).map(opt => (
                  <label key={String(opt.value)} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedOutcome === opt.value ? opt.color : "border-slate-100 hover:border-slate-200"
                  }`}>
                    <input type="radio" name="outcome" checked={selectedOutcome === opt.value}
                      onChange={() => setSelectedOutcome(opt.value)} className="accent-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{opt.label}</p>
                      <p className="text-xs text-slate-500">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {selectedOutcome === "partial_refund" && (
                <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-xs text-amber-700 font-medium mb-2">Tỷ lệ hoàn cho Học sinh: {partialPercent}%</p>
                  <input type="range" min={0} max={100} value={partialPercent}
                    onChange={e => setPartialPercent(+e.target.value)} className="w-full accent-amber-500" />
                  <div className="flex justify-between text-xs text-amber-600 mt-1">
                    <span>HS nhận: {fmt(outcomeRefundAmount)}</span>
                    <span>GS nhận: {fmt(outcomeTutorAmount)}</span>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Ghi chú nội bộ (tùy chọn)</label>
                <textarea rows={3} value={adminNote} onChange={e => setAdminNote(e.target.value)}
                  placeholder="Ghi chú lý do phân xử để lưu lịch sử..."
                  className="w-full text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
              </div>

              <button disabled={!selectedOutcome} onClick={() => setShowConfirm(true)}
                className="w-full py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors">
                Xác nhận phân xử
              </button>
            </div>
          )}

          {dispute.status === "resolved" && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
              <CheckCircle size={28} className="text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-700">Ticket đã được giải quyết</p>
              <p className="text-xs text-emerald-600 mt-1">Phân xử: {dispute.outcome}</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal open={showConfirm} variant="warning"
        title="Xác nhận quyết định phân xử?"
        description={`Hành động này không thể hoàn tác. Tiền sẽ được ${
          selectedOutcome === "refund_student" ? `hoàn toàn bộ ${fmt(dispute.escrowAmount)} cho Học sinh` :
          selectedOutcome === "release_tutor" ? `giải ngân ${fmt(earnedAmount)} cho Gia sư, hoàn ${fmt(remainingAmount)} cho Học sinh` :
          `chia: HS nhận ${fmt(outcomeRefundAmount)}, GS nhận ${fmt(outcomeTutorAmount)}`
        }.`}
        confirmLabel="Xác nhận phân xử" onConfirm={handleConfirm} onCancel={() => setShowConfirm(false)}
      />
      {ToastComponent}
    </div>
  );
};

export default DisputeDetailPage;
