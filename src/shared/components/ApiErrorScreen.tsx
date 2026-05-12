import React from "react";
import { ServerCrash, RefreshCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface ApiErrorScreenProps {
  title?: string;
  message?: string;
  errorCode?: string | number;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export default function ApiErrorScreen({
  title = "Lỗi kết nối máy chủ",
  message = "Hệ thống đang gặp sự cố khi xử lý yêu cầu của bạn. Vui lòng thử lại sau ít phút.",
  errorCode,
  onRetry,
  fullScreen = true,
}: ApiErrorScreenProps) {
  const content = (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-red-500/5 p-10 text-center border border-red-100">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative">
        <ServerCrash size={48} strokeWidth={1.5} />
        {errorCode && (
          <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-lg text-xs font-black text-red-600 shadow border border-red-100">
            {errorCode}
          </div>
        )}
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-3">
        {title}
      </h2>
      <p className="text-slate-500 mb-8 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link 
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <Home size={18} />
          Trang chủ
        </Link>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
          >
            <RefreshCcw size={18} />
            Thử lại
          </button>
        )}
      </div>
    </div>
  );

  if (!fullScreen) {
    return <div className="p-8 flex items-center justify-center w-full">{content}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      {content}
    </div>
  );
}
