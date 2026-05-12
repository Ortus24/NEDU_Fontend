import React from "react";

// ============================================================
// StatusBadge — dùng chung cho Tutor/Student/Dispute/Finance
// ============================================================

type BadgeVariant =
  | "under_review" | "approved" | "rejected" | "banned" | "draft"
  | "active" | "inactive"
  | "in_escrow" | "released" | "refunded" | "disputed"
  | "pending" | "processing" | "paid" | "failed"
  | "new" | "resolved" | "closed"
  | "free" | "basic" | "standard" | "premium";

const variantConfig: Record<BadgeVariant, { label: string; cls: string; dot?: boolean }> = {
  // Tutor KYC status
  under_review: { label: "Chờ duyệt",    cls: "bg-amber-100 text-amber-700",   dot: true },
  approved:     { label: "Đã duyệt",     cls: "bg-emerald-100 text-emerald-700" },
  rejected:     { label: "Bị từ chối",   cls: "bg-red-100 text-red-600" },
  banned:       { label: "Bị khóa",      cls: "bg-slate-200 text-slate-500" },
  draft:        { label: "Nháp",         cls: "bg-slate-100 text-slate-500" },
  // Student
  active:       { label: "Hoạt động",    cls: "bg-emerald-100 text-emerald-700" },
  inactive:     { label: "Không HĐ",     cls: "bg-slate-100 text-slate-500" },
  // Escrow
  in_escrow:    { label: "Đang giữ",     cls: "bg-blue-100 text-blue-700",     dot: true },
  released:     { label: "Đã giải ngân", cls: "bg-emerald-100 text-emerald-700" },
  refunded:     { label: "Đã hoàn",      cls: "bg-violet-100 text-violet-700" },
  disputed:     { label: "Tranh chấp",   cls: "bg-red-100 text-red-600",       dot: true },
  // Payout
  pending:      { label: "Chờ xử lý",   cls: "bg-amber-100 text-amber-700",   dot: true },
  processing:   { label: "Đang xử lý",  cls: "bg-blue-100 text-blue-700",     dot: true },
  paid:         { label: "Đã thanh toán",cls: "bg-emerald-100 text-emerald-700" },
  failed:       { label: "Thất bại",     cls: "bg-red-100 text-red-600" },
  // Dispute
  new:          { label: "Mới",          cls: "bg-red-100 text-red-700",       dot: true },
  resolved:     { label: "Đã giải quyết",cls: "bg-emerald-100 text-emerald-700" },
  closed:       { label: "Đã đóng",      cls: "bg-slate-100 text-slate-500" },
  // Subscription
  free:         { label: "Free",         cls: "bg-slate-100 text-slate-500" },
  basic:        { label: "Basic",        cls: "bg-sky-100 text-sky-700" },
  standard:     { label: "Standard",     cls: "bg-blue-100 text-blue-700" },
  premium:      { label: "Premium",      cls: "bg-violet-100 text-violet-700" },
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ variant, className = "" }) => {
  const config = variantConfig[variant] ?? { label: variant, cls: "bg-slate-100 text-slate-500" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${config.cls} ${className}`}>
      {config.dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 animate-pulse" />}
      {config.label}
    </span>
  );
};

export default StatusBadge;
