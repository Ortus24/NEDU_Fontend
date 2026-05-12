import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Check, X, AlertTriangle } from "lucide-react";
import type { Tutor } from "../../types";
import StatusBadge from "../shared/StatusBadge";

interface KycCardProps {
  tutor: Tutor;
  onApprove: (tutor: Tutor) => void;
  onReject: (tutor: Tutor) => void;
}

const getRelativeTime = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  return "Vừa xong";
};

// SLA = 5 working days = ~120h; warn if < 48h remaining
const getSlaInfo = (submittedAt: string) => {
  const elapsedHours = (Date.now() - new Date(submittedAt).getTime()) / 3_600_000;
  const remainingHours = 120 - elapsedHours;
  const isWarning = remainingHours < 48 && remainingHours > 0;
  const isOverdue = remainingHours <= 0;
  return { remainingHours: Math.max(0, remainingHours), isWarning, isOverdue };
};

const subjectColors: Record<string, string> = {
  Toán: "bg-blue-100 text-blue-700", "Vật lý": "bg-purple-100 text-purple-700",
  IELTS: "bg-amber-100 text-amber-700", "Tiếng Anh": "bg-sky-100 text-sky-700",
  "Hóa học": "bg-green-100 text-green-700", "Sinh học": "bg-teal-100 text-teal-700",
  "Lập trình": "bg-indigo-100 text-indigo-700",
};

const KycCard: React.FC<KycCardProps> = ({ tutor, onApprove, onReject }) => {
  const navigate = useNavigate();
  const sla = getSlaInfo(tutor.submittedAt);

  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4 transition-shadow hover:shadow-md ${
      sla.isOverdue ? "border-red-200" : sla.isWarning ? "border-amber-200" : "border-slate-100"
    }`}>
      {/* SLA Banner */}
      {(sla.isWarning || sla.isOverdue) && (
        <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl ${
          sla.isOverdue ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
        }`}>
          <AlertTriangle size={13} />
          {sla.isOverdue ? "⚠️ Đã quá hạn SLA 5 ngày!" : `⏰ Còn ~${Math.floor(sla.remainingHours)}h để xử lý`}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {tutor.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{tutor.name}</p>
            <p className="text-xs text-slate-400">{tutor.email}</p>
          </div>
        </div>
        <StatusBadge variant={tutor.status} />
      </div>

      {/* Subjects */}
      <div className="flex flex-wrap gap-1.5">
        {tutor.subjects.map(s => (
          <span key={s} className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${subjectColors[s] ?? "bg-slate-100 text-slate-600"}`}>
            {s}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-50">
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock size={12} />
          Nộp {getRelativeTime(tutor.submittedAt)}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/admin/kyc/${tutor.id}`)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
            Chi tiết
          </button>
          <button onClick={() => onApprove(tutor)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors">
            <Check size={12} /> Duyệt
          </button>
          <button onClick={() => onReject(tutor)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
            <X size={12} /> Từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default KycCard;
