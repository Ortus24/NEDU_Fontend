import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Check, X, ChevronLeft, ChevronRight, FileText,
  PlayCircle, Phone, Mail, MapPin, BookOpen, DollarSign,
  CreditCard, History,
} from "lucide-react";
import { mockTutors } from "../api";
import StatusBadge from "../components/shared/StatusBadge";
import PageHeader from "../components/shared/PageHeader";
import { useToast } from "../components/shared/Toast";
import ConfirmModal from "../components/shared/ConfirmModal";

const REJECTION_REASONS = [
  "Ảnh CCCD không rõ nét hoặc bị mờ",
  "Bằng cấp / Bảng điểm không hợp lệ",
  "Video giới thiệu quá ngắn (< 30 giây)",
  "Thông tin không khớp với tài liệu",
  "Hồ sơ không đầy đủ thông tin",
];

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

const KycDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();

  const tutors = mockTutors;
  const currentIndex = tutors.findIndex(t => t.id === id);
  const tutor = tutors[currentIndex];

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [activeDoc, setActiveDoc] = useState<"cccd_front" | "cccd_back" | "degree" | "video">("cccd_front");

  if (!tutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-slate-500 font-medium">Không tìm thấy hồ sơ</p>
        <button onClick={() => navigate("/admin/kyc")} className="mt-3 text-blue-600 hover:underline text-sm">← Quay lại danh sách</button>
      </div>
    );
  }

  const prevTutor = currentIndex > 0 ? tutors[currentIndex - 1] : null;
  const nextTutor = currentIndex < tutors.length - 1 ? tutors[currentIndex + 1] : null;

  const finalReason = rejectReason === "custom" ? customReason : rejectReason;

  const handleApprove = () => {
    showToast(`✅ Đã duyệt hồ sơ gia sư ${tutor.name}`);
    setShowApproveModal(false);
    setTimeout(() => navigate("/admin/kyc"), 1000);
  };

  const handleReject = () => {
    if (!finalReason) return;
    showToast(`❌ Đã từ chối hồ sơ ${tutor.name}`, "error");
    setShowRejectModal(false);
    setRejectReason(""); setCustomReason("");
    setTimeout(() => navigate("/admin/kyc"), 1000);
  };

  const docTabs = [
    { key: "cccd_front" as const, label: "CCCD (mặt trước)" },
    { key: "cccd_back" as const, label: "CCCD (mặt sau)" },
    { key: "degree" as const, label: "Bằng cấp / Bảng điểm" },
    { key: "video" as const, label: "Video giới thiệu" },
  ];

  return (
    <div>
      <PageHeader
        title="Chi tiết hồ sơ eKYC"
        breadcrumbs={[{ label: "Admin", path: "/admin" }, { label: "eKYC", path: "/admin/kyc" }, { label: tutor.name }]}
      />

      {/* Status banner */}
      <div className={`flex items-center justify-between px-5 py-3 rounded-2xl mb-6 ${
        tutor.status === "under_review" ? "bg-amber-50 border border-amber-200" :
        tutor.status === "approved" ? "bg-emerald-50 border border-emerald-200" :
        "bg-red-50 border border-red-200"
      }`}>
        <div className="flex items-center gap-3">
          <StatusBadge variant={tutor.status} />
          <span className="text-sm text-slate-600">
            Nộp hồ sơ: <strong>{new Date(tutor.submittedAt).toLocaleDateString("vi-VN")}</strong>
          </span>
          {tutor.rejectionReason && (
            <span className="text-xs text-red-600 font-medium">Lý do từ chối: {tutor.rejectionReason}</span>
          )}
        </div>
        {/* Prev / Next navigation */}
        <div className="flex items-center gap-2">
          <button disabled={!prevTutor} onClick={() => prevTutor && navigate(`/admin/kyc/${prevTutor.id}`)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft size={13} /> Hồ sơ trước
          </button>
          <span className="text-xs text-slate-400">{currentIndex + 1}/{tutors.length}</span>
          <button disabled={!nextTutor} onClick={() => nextTutor && navigate(`/admin/kyc/${nextTutor.id}`)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            Hồ sơ tiếp <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* LEFT PANEL — Info (3/5) */}
        <div className="xl:col-span-3 space-y-5">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Thông tin cá nhân</h3>
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-50">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                {tutor.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">{tutor.name}</p>
                <p className="text-sm text-slate-500">{tutor.email}</p>
              </div>
            </div>
            <InfoRow icon={<Phone size={15} />} label="Số điện thoại" value={tutor.phone} />
            <InfoRow icon={<Mail size={15} />} label="Email" value={tutor.email} />
            <InfoRow icon={<MapPin size={15} />} label="Địa chỉ" value="Hà Nội, Việt Nam" />
          </div>

          {/* Teaching Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Thông tin giảng dạy</h3>
            <InfoRow icon={<BookOpen size={15} />} label="Môn dạy" value={tutor.subjects.join(", ")} />
            <InfoRow icon={<FileText size={15} />} label="Kinh nghiệm" value="3 năm giảng dạy tại trung tâm gia sư ABC" />
            <InfoRow icon={<DollarSign size={15} />} label="Học phí dự kiến" value="200,000 – 350,000đ / buổi" />
            <InfoRow icon={<CreditCard size={15} />} label="Số tài khoản ngân hàng" value="0071000XXXXXXX – Vietcombank" />
          </div>

          {/* Submission History */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <History size={16} className="text-slate-400" /> Lịch sử nộp hồ sơ
            </h3>
            <div className="space-y-3">
              {tutor.rejectedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-600">Lần 1 — Bị từ chối</p>
                    <p className="text-xs text-slate-400">{new Date(tutor.rejectedAt).toLocaleDateString("vi-VN")}</p>
                    {tutor.rejectionReason && <p className="text-xs text-slate-500 mt-1">{tutor.rejectionReason}</p>}
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0 animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-amber-600">
                    Lần {tutor.rejectedAt ? "2" : "1"} — Đang chờ duyệt
                  </p>
                  <p className="text-xs text-slate-400">{new Date(tutor.submittedAt).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Documents (2/5) */}
        <div className="xl:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Tài liệu đính kèm</h3>

            {/* Doc Tabs */}
            <div className="flex flex-wrap gap-1 mb-4 bg-slate-100 p-1 rounded-xl">
              {docTabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveDoc(tab.key)}
                  className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all flex-1 ${
                    activeDoc === tab.key ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Doc Preview Area */}
            <div className="rounded-xl bg-slate-100 overflow-hidden">
              {activeDoc === "video" ? (
                <div className="aspect-video flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                    <PlayCircle size={28} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Video giới thiệu</p>
                  <p className="text-xs text-slate-400">Thời lượng: 45 giây</p>
                  <button className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    Phát video
                  </button>
                </div>
              ) : activeDoc === "degree" ? (
                <div className="aspect-[3/4] flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center">
                    <FileText size={26} className="text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Bằng cấp / Bảng điểm</p>
                  <button className="px-4 py-2 bg-slate-700 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                    Xem PDF
                  </button>
                </div>
              ) : (
                <div className="aspect-[3/2] flex flex-col items-center justify-center gap-3">
                  <div className="w-20 h-14 rounded-lg bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-2xl">🪪</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    {activeDoc === "cccd_front" ? "CCCD mặt trước" : "CCCD mặt sau"}
                  </p>
                  <p className="text-[10px] text-slate-400">Mock – Ảnh thực sẽ được load từ server</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Box */}
          {tutor.status === "under_review" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Quyết định kiểm duyệt</h3>
              <div className="space-y-3">
                <button onClick={() => setShowApproveModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors shadow-sm">
                  <Check size={17} /> Duyệt hồ sơ
                </button>
                <button onClick={() => setShowRejectModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-sm">
                  <X size={17} /> Từ chối hồ sơ
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-3">Gia sư sẽ được thông báo qua email sau khi xử lý</p>
            </div>
          )}
        </div>
      </div>

      {/* Approve Modal */}
      <ConfirmModal open={showApproveModal} variant="info"
        title="Xác nhận duyệt hồ sơ?"
        description={`Bạn sẽ phê duyệt hồ sơ gia sư ${tutor.name}. Gia sư sẽ ngay lập tức được phép hoạt động trên nền tảng.`}
        confirmLabel="✅ Duyệt hồ sơ" onConfirm={handleApprove} onCancel={() => setShowApproveModal(false)}
      />

      {/* Reject Modal */}
      <ConfirmModal open={showRejectModal} variant="danger"
        title="Từ chối hồ sơ gia sư"
        description={`Chọn lý do từ chối. Lý do sẽ được gửi email cho ${tutor.name}.`}
        confirmLabel="Xác nhận từ chối" onConfirm={handleReject} onCancel={() => { setShowRejectModal(false); setRejectReason(""); }}
      >
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {REJECTION_REASONS.map(r => (
            <label key={r} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-red-50 transition-all">
              <input type="radio" name="detail_reason" value={r} checked={rejectReason === r}
                onChange={() => setRejectReason(r)} className="accent-red-500" />
              <span className="text-xs text-slate-700">{r}</span>
            </label>
          ))}
          <label className="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-red-50 transition-all">
            <input type="radio" name="detail_reason" value="custom" checked={rejectReason === "custom"}
              onChange={() => setRejectReason("custom")} className="accent-red-500 mt-0.5" />
            <div className="flex-1">
              <span className="text-xs text-slate-700">Lý do khác...</span>
              {rejectReason === "custom" && (
                <textarea rows={2} value={customReason} onChange={e => setCustomReason(e.target.value)}
                  className="mt-1.5 w-full text-xs border border-slate-200 rounded-lg p-2 resize-none focus:outline-none" />
              )}
            </div>
          </label>
        </div>
      </ConfirmModal>

      {ToastComponent}
    </div>
  );
};

export default KycDetailPage;
