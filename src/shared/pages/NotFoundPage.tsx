import React from "react";
import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 text-center border border-slate-100">
        <div className="w-24 h-24 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <FileQuestion size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-7xl font-black text-slate-900 mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Không tìm thấy trang
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Trang bạn đang cố gắng truy cập không tồn tại hoặc đã bị gỡ bỏ. Vui lòng kiểm tra lại đường dẫn.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-primary hover:opacity-90 shadow-lg shadow-primary/30 transition-all active:scale-95"
          >
            <Home size={18} />
            Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
