import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Users,
  CalendarCheck,
  Minus,
} from "lucide-react";
import type { KpiMetric } from "../types";

interface KpiCardProps {
  metric: KpiMetric;
}

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={22} />,
  Wallet: <Wallet size={22} />,
  Users: <Users size={22} />,
  CalendarCheck: <CalendarCheck size={22} />,
};

const colorMap: Record<
  KpiMetric["color"],
  { bg: string; icon: string; badge: string; gradient: string }
> = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    badge: "bg-blue-600",
    gradient: "from-blue-500 to-blue-700",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    badge: "bg-emerald-600",
    gradient: "from-emerald-500 to-emerald-700",
  },
  purple: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    badge: "bg-violet-600",
    gradient: "from-violet-500 to-violet-700",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    badge: "bg-orange-600",
    gradient: "from-orange-500 to-orange-600",
  },
};

const KpiCard: React.FC<KpiCardProps> = ({ metric }) => {
  const colors = colorMap[metric.color];

  const changeIcon =
    metric.changeType === "increase" ? (
      <TrendingUp size={12} />
    ) : metric.changeType === "decrease" ? (
      <TrendingDown size={12} />
    ) : (
      <Minus size={12} />
    );

  const changeBadgeClass =
    metric.changeType === "increase"
      ? "bg-emerald-100 text-emerald-700"
      : metric.changeType === "decrease"
      ? "bg-red-100 text-red-600"
      : "bg-slate-100 text-slate-500";

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white shadow-md`}
        >
          {iconMap[metric.icon]}
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${changeBadgeClass}`}
        >
          {changeIcon}
          {metric.change}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-800 tracking-tight leading-none">
          {metric.value}
        </p>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">{metric.title}</p>
      </div>

      {/* Progress bar decorative */}
      <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
          style={{ width: metric.changeType === "increase" ? "65%" : "35%" }}
        />
      </div>
    </div>
  );
};

export default KpiCard;
