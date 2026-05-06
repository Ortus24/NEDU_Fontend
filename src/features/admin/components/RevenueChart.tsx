import React from "react";
import type { RevenueChartData } from "../types";

interface RevenueChartProps {
  data: RevenueChartData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const maxBookings = Math.max(...data.map((d) => d.bookings));

  const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
    return `${value}`;
  };

  const [activeTab, setActiveTab] = React.useState<"revenue" | "bookings">("revenue");

  const activeData = activeTab === "revenue"
    ? data.map((d) => ({ label: d.month, value: d.revenue, max: maxRevenue }))
    : data.map((d) => ({ label: d.month, value: d.bookings, max: maxBookings }));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Biểu đồ tăng trưởng
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">8 tháng gần nhất</p>
        </div>

        {/* Tab Switch */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "revenue"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Doanh thu
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "bookings"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Lớp học
          </button>
        </div>
      </div>

      {/* Chart (Pure CSS Bar Chart) */}
      <div className="flex items-end gap-3 h-48">
        {activeData.map((item, index) => {
          const heightPercent = (item.value / item.max) * 100;
          const isLast = index === activeData.length - 1;

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2 group"
            >
              {/* Value tooltip */}
              <div
                className={`
                  text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100
                  transition-opacity whitespace-nowrap
                `}
              >
                {activeTab === "revenue"
                  ? formatCurrency(item.value) + "đ"
                  : item.value}
              </div>

              {/* Bar */}
              <div className="w-full flex-1 flex items-end">
                <div
                  className={`
                    w-full rounded-t-lg transition-all duration-500 relative
                    ${
                      isLast
                        ? "bg-gradient-to-t from-blue-600 to-blue-400"
                        : "bg-gradient-to-t from-blue-200 to-blue-100 group-hover:from-blue-400 group-hover:to-blue-300"
                    }
                  `}
                  style={{ height: `${Math.max(heightPercent, 5)}%` }}
                >
                  {isLast && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-blue-200" />
                  )}
                </div>
              </div>

              {/* Label */}
              <span
                className={`text-[11px] font-medium ${
                  isLast ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary Row */}
      <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-slate-400">Tháng này</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">
            {activeTab === "revenue" ? "1,245,000,000đ" : "387 lớp"}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Tháng trước</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">
            {activeTab === "revenue" ? "1,180,000,000đ" : "341 lớp"}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Tăng trưởng</p>
          <p className="text-sm font-bold text-emerald-600 mt-0.5">
            {activeTab === "revenue" ? "+5.5%" : "+13.5%"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
