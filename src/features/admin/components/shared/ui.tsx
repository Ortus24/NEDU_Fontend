import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value, onChange, placeholder = "Tìm kiếm...", className = "",
}) => (
  <div className={`relative ${className}`}>
    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    <input
      type="text" value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl
        focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100
        transition-all placeholder-slate-400 text-slate-700"
    />
  </div>
);

// ============================================================
// Pagination
// ============================================================
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-end gap-1 px-6 py-4 border-t border-slate-100">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors">
        ← Trước
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${
            p === currentPage ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"
          }`}>
          {p}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors">
        Tiếp →
      </button>
    </div>
  );
};

// ============================================================
// SummaryCard
// ============================================================
interface SummaryCardProps {
  title: string;
  value: string | number;
  sub?: string;
  color?: "blue" | "green" | "red" | "orange" | "purple" | "slate";
  icon: React.ReactNode;
}

const cardColor = {
  blue:   "from-blue-500 to-blue-700",
  green:  "from-emerald-500 to-emerald-700",
  red:    "from-red-500 to-red-600",
  orange: "from-orange-500 to-orange-600",
  purple: "from-violet-500 to-violet-700",
  slate:  "from-slate-500 to-slate-700",
};

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title, value, sub, color = "blue", icon,
}) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cardColor[color]} flex items-center justify-center text-white shadow-sm`}>
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
    <p className="text-sm text-slate-500 mt-1 font-medium">{title}</p>
    {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
  </div>
);

// ============================================================
// EmptyState
// ============================================================
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-3 text-slate-300">
      {icon}
    </div>
    <p className="text-sm font-semibold text-slate-500">{title}</p>
    {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
  </div>
);

// ============================================================
// TableWrapper
// ============================================================
export const TableWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    {children}
  </div>
);
