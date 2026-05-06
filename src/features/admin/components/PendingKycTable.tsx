import React, { useState } from "react";
import { Check, X, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Tutor } from "../types";

interface PendingKycTableProps {
  tutors: Tutor[];
}

const subjectColors: Record<string, string> = {
  Toán: "bg-blue-100 text-blue-700",
  "Vật lý": "bg-purple-100 text-purple-700",
  IELTS: "bg-amber-100 text-amber-700",
  "Tiếng Anh": "bg-sky-100 text-sky-700",
  "Hóa học": "bg-green-100 text-green-700",
  "Sinh học": "bg-teal-100 text-teal-700",
  "Lập trình": "bg-indigo-100 text-indigo-700",
  "Toán rời rạc": "bg-violet-100 text-violet-700",
  "Văn học": "bg-rose-100 text-rose-700",
  "Ngữ văn": "bg-pink-100 text-pink-700",
};

const getRelativeTime = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  return "Vừa xong";
};

interface RejectModalProps {
  tutorName: string;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

const REJECTION_REASONS = [
  "Ảnh CCCD không rõ nét hoặc bị mờ",
  "Bằng cấp / Bảng điểm không hợp lệ",
  "Video giới thiệu quá ngắn (< 30 giây)",
  "Thông tin không khớp với tài liệu",
  "Hồ sơ không đầy đủ thông tin",
];

const RejectModal: React.FC<RejectModalProps> = ({
  tutorName,
  onConfirm,
  onCancel,
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const finalReason = selectedReason === "custom" ? customReason : selectedReason;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
          <X size={22} className="text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Từ chối hồ sơ</h3>
        <p className="text-sm text-slate-500 mt-1">
          Vui lòng chọn lý do từ chối hồ sơ của{" "}
          <span className="font-semibold text-slate-700">{tutorName}</span>. Lý do
          này sẽ được gửi qua email cho gia sư.
        </p>

        <div className="mt-4 space-y-2">
          {REJECTION_REASONS.map((reason) => (
            <label
              key={reason}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-red-300 hover:bg-red-50 transition-all"
            >
              <input
                type="radio"
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="accent-red-500"
              />
              <span className="text-sm text-slate-700">{reason}</span>
            </label>
          ))}
          <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-red-300 hover:bg-red-50 transition-all">
            <input
              type="radio"
              name="reason"
              value="custom"
              checked={selectedReason === "custom"}
              onChange={() => setSelectedReason("custom")}
              className="accent-red-500 mt-0.5"
            />
            <div className="flex-1">
              <span className="text-sm text-slate-700">Lý do khác...</span>
              {selectedReason === "custom" && (
                <textarea
                  className="mt-2 w-full text-sm border border-slate-200 rounded-lg p-2 resize-none focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200"
                  rows={3}
                  placeholder="Nhập lý do cụ thể..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              )}
            </div>
          </label>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => finalReason && onConfirm(finalReason)}
            disabled={!finalReason}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors"
          >
            Xác nhận từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

const PendingKycTable: React.FC<PendingKycTableProps> = ({ tutors }) => {
  const navigate = useNavigate();
  const pendingTutors = tutors.filter((t) => t.status === "under_review");
  const [rejectTarget, setRejectTarget] = useState<Tutor | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApprove = (tutor: Tutor) => {
    showToast(`✅ Đã duyệt hồ sơ gia sư ${tutor.name}`);
  };

  const handleRejectConfirm = (reason: string) => {
    if (rejectTarget) {
      showToast(`❌ Đã từ chối hồ sơ ${rejectTarget.name}`);
      setRejectTarget(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        {/* Table Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Hồ sơ eKYC chờ duyệt
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {pendingTutors.length} hồ sơ đang chờ xử lý
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/kyc")}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Xem tất cả
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Table */}
        {pendingTutors.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <Check size={28} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              Tất cả hồ sơ đã được xử lý
            </p>
            <p className="text-xs text-slate-400 mt-1">Không có hồ sơ mới</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Gia sư
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Môn dạy
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Nộp hồ sơ
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pendingTutors.map((tutor) => (
                  <tr
                    key={tutor.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Avatar + Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {tutor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {tutor.name}
                          </p>
                          <p className="text-xs text-slate-400">{tutor.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Subjects */}
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {tutor.subjects.map((s) => (
                          <span
                            key={s}
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              subjectColors[s] || "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Submitted at */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Clock size={13} className="text-slate-300" />
                        {getRelativeTime(tutor.submittedAt)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Chờ duyệt
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/kyc/${tutor.id}`)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          Xem hồ sơ
                        </button>
                        <button
                          onClick={() => handleApprove(tutor)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
                        >
                          <Check size={13} />
                          Duyệt
                        </button>
                        <button
                          onClick={() => setRejectTarget(tutor)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                        >
                          <X size={13} />
                          Từ chối
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectTarget && (
        <RejectModal
          tutorName={rejectTarget.name}
          onConfirm={handleRejectConfirm}
          onCancel={() => setRejectTarget(null)}
        />
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-2xl z-50 animate-fade-in-up">
          {toastMsg}
        </div>
      )}
    </>
  );
};

export default PendingKycTable;
