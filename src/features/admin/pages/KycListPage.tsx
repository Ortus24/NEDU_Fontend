import React, { useState } from "react";
import { ShieldCheck, Clock, CheckCircle, XCircle } from "lucide-react";
import { mockTutors } from "../../api";
import type { Tutor } from "../../types";
import PageHeader from "../components/shared/PageHeader";
import { SummaryCard, EmptyState, SearchInput } from "../components/shared/ui";
import KycCard from "../components/kyc/KycCard";
import ConfirmModal from "../components/shared/ConfirmModal";
import { useToast } from "../components/shared/Toast";

const REJECTION_REASONS = [
  "Ảnh CCCD không rõ nét hoặc bị mờ",
  "Bằng cấp / Bảng điểm không hợp lệ",
  "Video giới thiệu quá ngắn (< 30 giây)",
  "Thông tin không khớp với tài liệu",
  "Hồ sơ không đầy đủ thông tin",
];

type TabKey = "pending" | "approved" | "rejected";

const KycListPage: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [tab, setTab] = useState<TabKey>("pending");
  const [search, setSearch] = useState("");
  const [approveTarget, setApproveTarget] = useState<Tutor | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Tutor | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const { showToast, ToastComponent } = useToast();

  const counts = {
    pending: tutors.filter(t => t.status === "under_review").length,
    approved: tutors.filter(t => t.status === "approved").length,
    rejected: tutors.filter(t => t.status === "rejected").length,
  };

  const tabData = tutors.filter(t => {
    const matchTab =
      tab === "pending" ? t.status === "under_review" :
      tab === "approved" ? t.status === "approved" : t.status === "rejected";
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleApprove = (tutor: Tutor) => setApproveTarget(tutor);
  const confirmApprove = () => {
    if (!approveTarget) return;
    setTutors(prev => prev.map(t => t.id === approveTarget.id ? { ...t, status: "approved", approvedAt: new Date().toISOString() } : t));
    showToast(`✅ Đã duyệt hồ sơ ${approveTarget.name}`);
    setApproveTarget(null);
  };

  const finalReason = rejectReason === "custom" ? customReason : rejectReason;
  const confirmReject = () => {
    if (!rejectTarget || !finalReason) return;
    setTutors(prev => prev.map(t => t.id === rejectTarget.id
      ? { ...t, status: "rejected", rejectedAt: new Date().toISOString(), rejectionReason: finalReason } : t));
    showToast(`❌ Đã từ chối hồ sơ ${rejectTarget.name}`, "error");
    setRejectTarget(null);
    setRejectReason("");
    setCustomReason("");
  };

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "pending", label: "Chờ duyệt", count: counts.pending },
    { key: "approved", label: "Đã duyệt", count: counts.approved },
    { key: "rejected", label: "Từ chối", count: counts.rejected },
  ];

  return (
    <div>
      <PageHeader
        title="Duyệt hồ sơ eKYC"
        subtitle="SLA xử lý tối đa 5 ngày làm việc"
        breadcrumbs={[{ label: "Admin", path: "/admin" }, { label: "Duyệt hồ sơ eKYC" }]}
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Chờ duyệt" value={counts.pending} sub="Cần xử lý" color="orange" icon={<Clock size={18} />} />
        <SummaryCard title="Đã duyệt" value={counts.approved} color="green" icon={<CheckCircle size={18} />} />
        <SummaryCard title="Đã từ chối" value={counts.rejected} color="red" icon={<XCircle size={18} />} />
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setSearch(""); }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                tab === t.key ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}>
              {t.label}
              {t.count > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  tab === t.key ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                }`}>{t.count}</span>
              )}
            </button>
          ))}
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm tên, email..." className="w-64" />
      </div>

      {/* Card Grid */}
      {tabData.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <EmptyState
            icon={<ShieldCheck size={28} />}
            title={tab === "pending" ? "Không có hồ sơ nào chờ duyệt" : "Không có kết quả"}
            description="Thử thay đổi từ khóa tìm kiếm hoặc chuyển tab khác"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {tabData.map(tutor => (
            <KycCard key={tutor.id} tutor={tutor} onApprove={handleApprove} onReject={setRejectTarget} />
          ))}
        </div>
      )}

      {/* Approve Modal */}
      <ConfirmModal
        open={!!approveTarget} variant="info"
        title="Duyệt hồ sơ gia sư?"
        description={`Bạn xác nhận duyệt hồ sơ của ${approveTarget?.name}. Gia sư sẽ nhận thông báo qua email và có thể bắt đầu nhận học sinh.`}
        confirmLabel="Xác nhận duyệt" onConfirm={confirmApprove} onCancel={() => setApproveTarget(null)}
      />

      {/* Reject Modal */}
      <ConfirmModal
        open={!!rejectTarget} variant="danger"
        title="Từ chối hồ sơ gia sư"
        description={`Vui lòng chọn lý do từ chối hồ sơ của ${rejectTarget?.name}. Lý do sẽ được gửi qua email cho gia sư.`}
        confirmLabel="Xác nhận từ chối"
        onConfirm={confirmReject} onCancel={() => { setRejectTarget(null); setRejectReason(""); setCustomReason(""); }}
      >
        <div className="space-y-2">
          {REJECTION_REASONS.map(r => (
            <label key={r} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-red-300 hover:bg-red-50/50 transition-all">
              <input type="radio" name="kyc_reason" value={r} checked={rejectReason === r}
                onChange={() => setRejectReason(r)} className="accent-red-500" />
              <span className="text-sm text-slate-700">{r}</span>
            </label>
          ))}
          <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-red-300 hover:bg-red-50/50 transition-all">
            <input type="radio" name="kyc_reason" value="custom" checked={rejectReason === "custom"}
              onChange={() => setRejectReason("custom")} className="accent-red-500 mt-0.5" />
            <div className="flex-1">
              <span className="text-sm text-slate-700">Lý do khác...</span>
              {rejectReason === "custom" && (
                <textarea rows={3} value={customReason} onChange={e => setCustomReason(e.target.value)}
                  placeholder="Nhập lý do cụ thể..."
                  className="mt-2 w-full text-sm border border-slate-200 rounded-lg p-2 resize-none focus:outline-none focus:border-red-300" />
              )}
            </div>
          </label>
        </div>
      </ConfirmModal>

      {ToastComponent}
    </div>
  );
};

export default KycListPage;
