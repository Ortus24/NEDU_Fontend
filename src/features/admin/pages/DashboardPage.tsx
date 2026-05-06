import React from "react";
import { Calendar, Download, RefreshCcw } from "lucide-react";
import KpiCard from "../components/KpiCard";
import RevenueChart from "../components/RevenueChart";
import PendingKycTable from "../components/PendingKycTable";
import RecentDisputes from "../components/RecentDisputes";
import {
  mockKpiMetrics,
  mockRevenueData,
  mockTutors,
  mockDisputes,
} from "../api";

const DashboardPage: React.FC = () => {
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Tổng quan nền tảng
          </h1>
          <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5">
            <Calendar size={13} />
            {today}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-xl transition-all shadow-sm">
            <RefreshCcw size={14} />
            Làm mới
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm shadow-blue-600/20">
            <Download size={14} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockKpiMetrics.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Chart - 2 cols */}
        <div className="xl:col-span-2">
          <RevenueChart data={mockRevenueData} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Thống kê nhanh</h3>
            <p className="text-xs text-slate-400 mt-0.5">Trong tháng hiện tại</p>
          </div>

          <div className="mt-5 space-y-4">
            {[
              {
                label: "Gia sư đang hoạt động",
                value: "142",
                max: 200,
                color: "bg-blue-500",
              },
              {
                label: "Học sinh đang học",
                value: "874",
                max: 1000,
                color: "bg-violet-500",
              },
              {
                label: "Tỷ lệ giữ chân học sinh",
                value: "78%",
                max: 100,
                color: "bg-emerald-500",
              },
              {
                label: "Tỷ lệ hoàn thành lớp",
                value: "91%",
                max: 100,
                color: "bg-amber-500",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500">{stat.label}</span>
                  <span className="text-sm font-bold text-slate-800">
                    {stat.value}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat.color} rounded-full`}
                    style={{
                      width: stat.value.endsWith("%")
                        ? stat.value
                        : `${(parseInt(stat.value) / stat.max) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Subscription distribution */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              Phân phối gói gia sư
            </p>
            <div className="flex gap-2 h-6">
              {[
                { label: "Free", width: "40%", color: "bg-slate-200" },
                { label: "Basic", width: "25%", color: "bg-blue-300" },
                { label: "Standard", width: "20%", color: "bg-blue-500" },
                { label: "Premium", width: "15%", color: "bg-blue-700" },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className={`${tier.color} rounded-lg flex items-center justify-center`}
                  style={{ width: tier.width }}
                  title={tier.label}
                />
              ))}
            </div>
            <div className="flex gap-3 mt-2 flex-wrap">
              {[
                { label: "Free (40%)", color: "bg-slate-200" },
                { label: "Basic (25%)", color: "bg-blue-300" },
                { label: "Standard (20%)", color: "bg-blue-500" },
                { label: "Premium (15%)", color: "bg-blue-700" },
              ].map((tier) => (
                <div key={tier.label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-sm ${tier.color}`} />
                  <span className="text-[10px] text-slate-400">{tier.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <PendingKycTable tutors={mockTutors} />
        <RecentDisputes disputes={mockDisputes} />
      </div>
    </div>
  );
};

export default DashboardPage;
