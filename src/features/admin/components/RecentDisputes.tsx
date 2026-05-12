import React from "react";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Dispute } from "../types";

interface RecentDisputesProps {
  disputes: Dispute[];
}

const typeLabel: Record<Dispute["type"], string> = {
  tutor_absent: "Gia sư bỏ tiết",
  quality_issue: "Chất lượng kém",
  refund_request: "Yêu cầu hoàn tiền",
  other: "Khác",
};

const statusConfig: Record<
  Dispute["status"],
  { label: string; cls: string }
> = {
  new: { label: "Mới", cls: "bg-red-100 text-red-700" },
  processing: { label: "Đang xử lý", cls: "bg-amber-100 text-amber-700" },
  resolved: { label: "Đã giải quyết", cls: "bg-emerald-100 text-emerald-700" },
  closed: { label: "Đã đóng", cls: "bg-slate-100 text-slate-500" },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

const RecentDisputes: React.FC<RecentDisputesProps> = ({ disputes }) => {
  const navigate = useNavigate();
  const activeDisputes = disputes.filter(
    (d) => d.status === "new" || d.status === "processing"
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Tranh chấp đang xử lý
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {activeDisputes.length} ticket cần giải quyết
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/disputes")}
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          Xem tất cả
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Dispute List */}
      {activeDisputes.length === 0 ? (
        <div className="py-12 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
            <AlertTriangle size={24} className="text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-500">
            Không có tranh chấp nào
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {activeDisputes.map((dispute) => {
            const status = statusConfig[dispute.status];
            return (
              <div
                key={dispute.id}
                className="px-6 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer group"
                onClick={() => navigate(`/admin/disputes/${dispute.id}`)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        {dispute.ticketCode}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${status.cls}`}
                      >
                        {status.label}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {typeLabel[dispute.type]}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-1 truncate">
                      {dispute.creatorName}{" "}
                      <span className="text-slate-400 font-normal text-xs">
                        → khiếu nại →
                      </span>{" "}
                      {dispute.subjectName}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {dispute.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-800">
                      {formatCurrency(dispute.escrowAmount)}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {dispute.completedSessions}/{dispute.totalSessions} buổi
                    </p>
                    <ChevronRight
                      size={15}
                      className="text-slate-300 group-hover:text-blue-500 transition-colors ml-auto mt-1"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentDisputes;
