import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  BookOpen,
  ReceiptText,
  Home,
} from "lucide-react";

/**
 * PaymentResultPage – Trang kết quả sau khi VNPay redirect về
 *
 * Người dùng được VNPay redirect về đây với query params như:
 * ?vnp_ResponseCode=00&vnp_TxnRef=xxx&vnp_Amount=xxx&...
 *
 * Frontend gọi backend /api/v1/payment/vnpay-return để xác thực kết quả.
 */
export default function PaymentResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<"loading" | "activating" | "success" | "failed">("loading");
  const [message, setMessage] = useState("Đang xác thực kết quả thanh toán...");
  const [transactionData, setTransactionData] = useState<any>(null);
  const [enrollmentData, setEnrollmentData] = useState<any>(null);

  const userId = localStorage.getItem("userId") || "11111111-1111-1111-1111-111111111111";

  useEffect(() => {
    const verifyAndEnroll = async () => {
      try {
        // BƯỚC 1: Xác thực kết quả thanh toán với Backend
        const queryString = searchParams.toString();
        const res = await fetch(
          `http://localhost:8080/api/v1/payment/vnpay-return?${queryString}`,
          { headers: { "Accept": "application/json" } }
        );
        const json = await res.json();

        if (json.status === 200 && json.data?.success === true) {
          setTransactionData(json.data);
          const transactionId = json.data.txnRef; // vnp_TxnRef = transactionId của hệ thống

          // BƯỚC 2: Tạo Enrollment (kích hoạt khóa học)
          setStatus("activating");
          setMessage("Đang kích hoạt khóa học...");

          try {
            const enrollRes = await fetch(
              `http://localhost:8080/api/v1/enrollments/from-transaction?userId=${userId}&transactionId=${transactionId}`,
              { method: "POST", headers: { "Accept": "application/json" } }
            );
            const enrollJson = await enrollRes.json();
            if (enrollRes.ok || enrollRes.status === 201) {
              setEnrollmentData(enrollJson.data);
            }
          } catch {
            // Enrollment lỗi không block màn hình thành công
            console.warn("Không thể tạo enrollment tự động, sẽ thử lại sau.");
          }

          setStatus("success");
          setMessage(json.message || "Thanh toán thành công!");
        } else {
          setStatus("failed");
          setMessage(json.message || "Thanh toán thất bại hoặc đã bị huỷ.");
        }
      } catch {
        setStatus("failed");
        setMessage("Lỗi kết nối khi xác thực thanh toán. Vui lòng kiểm tra lịch sử giao dịch.");
      }
    };

    verifyAndEnroll();
  }, [searchParams]);

  const txnRef = searchParams.get("vnp_TxnRef");
  const amount = searchParams.get("vnp_Amount");
  const formattedAmount = amount
    ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
        Number(amount) / 100
      )
    : null;

  if (status === "loading" || status === "activating") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center">
          <Loader2 size={36} className="animate-spin text-indigo-600" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            {status === "activating" ? "Đang kích hoạt khóa học" : "Đang xác thực thanh toán"}
          </h2>
          <p className="text-slate-500 font-medium">
            {status === "activating"
              ? "Hệ thống đang tạo khóa học cho bạn..."
              : "Vui lòng chờ trong giây lát..."}
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 size={48} className="text-emerald-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen size={16} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3">Thanh toán thành công!</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Khóa học của bạn đã được kích hoạt. Chúc bạn học vui!
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 space-y-3">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Chi tiết giao dịch</h2>
          {txnRef && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Mã giao dịch</span>
              <span className="font-bold text-slate-800 font-mono">{txnRef}</span>
            </div>
          )}
          {formattedAmount && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Số tiền</span>
              <span className="font-black text-indigo-600 text-base">{formattedAmount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Trạng thái</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-0.5 rounded-full text-xs font-black uppercase">
              Thành công
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/courses")}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Xem khóa học của tôi <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate("/billing")}
            className="w-full py-3.5 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <ReceiptText size={18} /> Xem lịch sử thanh toán
          </button>
        </div>
      </div>
    );
  }

  // Failed
  return (
    <div className="max-w-lg mx-auto py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Failed Icon */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle size={48} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3">Thanh toán thất bại</h1>
        <p className="text-slate-500 font-medium leading-relaxed">{message}</p>
      </div>

      {/* Transaction Info */}
      {txnRef && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 space-y-3">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Chi tiết giao dịch</h2>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Mã giao dịch</span>
            <span className="font-bold text-slate-800 font-mono">{txnRef}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Trạng thái</span>
            <span className="bg-red-100 text-red-700 px-3 py-0.5 rounded-full text-xs font-black uppercase">
              Thất bại
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Thử lại
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3.5 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          <Home size={18} /> Về trang chủ
        </button>
      </div>
    </div>
  );
}
