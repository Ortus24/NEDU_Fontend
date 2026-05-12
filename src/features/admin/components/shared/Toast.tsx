import React from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose?: () => void;
}

const toastConfig = {
  success: { icon: <CheckCircle size={17} />, cls: "bg-emerald-600" },
  error:   { icon: <XCircle size={17} />,     cls: "bg-red-500" },
  warning: { icon: <AlertTriangle size={17} />,cls: "bg-amber-500" },
  info:    { icon: <Info size={17} />,         cls: "bg-blue-600" },
};

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  const cfg = toastConfig[type];
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-medium max-w-sm ${cfg.cls}`}>
      {cfg.icon}
      <span className="flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
          <X size={15} />
        </button>
      )}
    </div>
  );
};

// ============================================================
// Hook useToast
// ============================================================
export const useToast = () => {
  const [toast, setToast] = React.useState<{ message: string; type: ToastType } | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, type });
    timerRef.current = setTimeout(() => setToast(null), 3000);
  };

  const ToastComponent = toast
    ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
    : null;

  return { showToast, ToastComponent };
};

export default Toast;
