import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ShieldOff, Shield, Star } from "lucide-react";
import type { AdminTutorResponse } from "../../services/tutorApi";
import { KYC_STATUS_BADGE } from "../../services/tutorApi";
import StatusBadge from "../shared/StatusBadge";
import { EmptyState, Pagination } from "../shared/ui";

interface TutorTableProps {
  tutors: AdminTutorResponse[];
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onToggleBan: (tutor: AdminTutorResponse) => void;
}

const subjectColors: Record<string, string> = {
  Toán: "bg-blue-100 text-blue-700",
  "Vật lý": "bg-purple-100 text-purple-700",
  IELTS: "bg-amber-100 text-amber-700",
  "Tiếng Anh": "bg-sky-100 text-sky-700",
  "Hóa học": "bg-green-100 text-green-700",
  "Sinh học": "bg-teal-100 text-teal-700",
  "Lập trình": "bg-indigo-100 text-indigo-700",
};

const ReputationBar: React.FC<{ score: number }> = ({ score }) => {
  const color =
    score >= 70 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-bold ${score < 50 ? "text-red-500" : "text-slate-700"}`}>
        {score}
      </span>
    </div>
  );
};

const TH: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <th className={`px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

const TutorTable: React.FC<TutorTableProps> = ({
  tutors,
  currentPage,
  totalPages,
  onPageChange,
  onToggleBan,
}) => {
  const navigate = useNavigate();

  if (tutors.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <EmptyState
          icon={<Star size={28} />}
          title="Không có gia sư nào"
          description="Thử thay đổi bộ lọc để xem kết quả khác"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-slate-100">
            <tr>
              <TH className="pl-6">Gia sư</TH>
              <TH>Môn dạy</TH>
              <TH>Trạng thái KYC</TH>
              <TH>Điểm uy tín</TH>
              <TH>Gói Sub</TH>
              <TH>Số buổi</TH>
              <TH>Doanh thu</TH>
              <TH className="pr-6 text-right">Hành động</TH>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tutors.map((tutor) => (
              <tr key={tutor.id} className="hover:bg-slate-50/50 transition-colors">
                {/* Avatar + Name */}
                <td className="pl-6 pr-4 py-4">
                  <div className="flex items-center gap-3">
                    {tutor.avatarUrl ? (
                      <img
                        src={tutor.avatarUrl}
                        alt={tutor.fullName}
                        className="w-9 h-9 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {tutor.fullName?.charAt(0) ?? "?"}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{tutor.fullName}</p>
                      <p className="text-xs text-slate-400">{tutor.email}</p>
                      {tutor.userStatus === "BANNED" && (
                        <span className="text-[10px] font-semibold text-red-500">● Bị khóa</span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Subjects */}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {(tutor.subjects ?? []).slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          subjectColors[s] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                    {(tutor.subjects ?? []).length > 2 && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        +{tutor.subjects.length - 2}
                      </span>
                    )}
                    {(tutor.subjects ?? []).length === 0 && (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </div>
                </td>

                {/* KYC Status */}
                <td className="px-4 py-4">
                  <StatusBadge variant={KYC_STATUS_BADGE[tutor.kycStatus] as any ?? "draft"} />
                </td>

                {/* Reputation */}
                <td className="px-4 py-4">
                  {tutor.kycStatus === "APPROVED" ? (
                    <ReputationBar score={tutor.reputationScore ?? 0} />
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </td>

                {/* Sub Plan */}
                <td className="px-4 py-4">
                  <StatusBadge variant={(tutor.subscriptionPlan ?? "free") as any} />
                </td>

                {/* Sessions */}
                <td className="px-4 py-4 text-sm text-slate-600">{tutor.totalSessions ?? 0}</td>

                {/* Earnings */}
                <td className="px-4 py-4 text-sm font-medium text-slate-700">
                  {(tutor.totalEarnings ?? 0) > 0
                    ? new Intl.NumberFormat("vi-VN").format(tutor.totalEarnings) + "đ"
                    : "—"}
                </td>

                {/* Actions */}
                <td className="pl-4 pr-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/kyc/${tutor.id}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <Eye size={13} /> Xem
                    </button>
                    <button
                      onClick={() => onToggleBan(tutor)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        tutor.userStatus === "BANNED"
                          ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                          : "text-red-600 bg-red-50 hover:bg-red-100"
                      }`}
                    >
                      {tutor.userStatus === "BANNED" ? (
                        <><Shield size={13} />Mở khóa</>
                      ) : (
                        <><ShieldOff size={13} />Khóa</>
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
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TutorTable;
