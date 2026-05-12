import React from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

const variantStyle = {
  danger:  { icon: "bg-red-100",    btn: "bg-red-500 hover:bg-red-600",    iconColor: "text-red-600" },
  warning: { icon: "bg-amber-100",  btn: "bg-amber-500 hover:bg-amber-600",iconColor: "text-amber-600" },
  info:    { icon: "bg-blue-100",   btn: "bg-blue-600 hover:bg-blue-700",  iconColor: "text-blue-600" },
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open, title, description, confirmLabel = "Xác nhận",
  cancelLabel = "Hủy bỏ", variant = "danger",
  onConfirm, onCancel, children,
}) => {
  if (!open) return null;
  const s = variantStyle[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <div className={`w-12 h-12 rounded-2xl ${s.icon} flex items-center justify-center mb-4`}>
          <AlertTriangle size={22} className={s.iconColor} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{description}</p>
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-6 flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
            {cancelLabel}
          </button>
          <button onClick={onConfirm}
            className={`flex-1 py-2.5 text-sm font-semibold text-white ${s.btn} rounded-xl transition-colors`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
