import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  CreditCard,
  Wallet,
  Building2,
  BookOpen,
  Clock,
  Users,
  AlertTriangle,
} from "lucide-react";

interface RoadmapInfo {
  id: string;
  title: string;
  totalFee: number;
  totalSessions: number;
  tutorName?: string;
  tutorAvatar?: string;
  status: string;
}

export default function PaymentPage() {
  const { roadmapId } = useParams<{ roadmapId: string }>();
  const navigate = useNavigate();

  const [userId] = useState(() => localStorage.getItem("userId") || "11111111-1111-1111-1111-111111111111");
  const [paymentMethod, setPaymentMethod] = useState<"VNPAY" | "MOMO" | "PAYOS">("VNPAY");
  const [roadmap, setRoadmap] = useState<RoadmapInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!roadmapId) return;
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/v1/student/roadmaps/${roadmapId}?userId=${userId}`);
        if (res.ok) {
          const json = await res.json();
          setRoadmap(json.data);
        } else {
          setError("Không tìm thấy thông tin lộ trình học.");
        }
      } catch {
        setError("Lỗi kết nối máy chủ. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoadmap();
  }, [roadmapId, userId]);

  const handlePayment = async () => {
    if (!roadmapId || !roadmap) return;
    setIsSubmitting(true);
    setError(null);

    try {
      // BƯỚC 2: Tạo Transaction PENDING
      const txRes = await fetch(`http://localhost:8080/api/v1/student/payments/transactions?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roadmapId,
          paymentMethod,
          description: `Thanh toan hoc phi: ${roadmap.title}`,
        }),
      });

      if (!txRes.ok) {
        const errData = await txRes.json();
        throw new Error(errData.message || "Không thể tạo giao dịch thanh toán.");
      }

      const txData = await txRes.json();
      const transactionId = txData.data.transactionId;

      // BƯỚC 3: Tạo URL thanh toán VNPay
      if (paymentMethod === "VNPAY") {
        const urlRes = await fetch(`http://localhost:8080/api/v1/student/payments/vnpay/create-url?userId=${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionId, language: "vn" }),
        });

        if (!urlRes.ok) {
          const errData = await urlRes.json();
          throw new Error(errData.message || "Không thể tạo URL thanh toán VNPay.");
        }

        const urlData = await urlRes.json();
        const paymentUrl = urlData.data.paymentUrl;

        // BƯỚC 3.3: Redirect người dùng sang cổng VNPay
        window.location.href = paymentUrl;
      } else {
        // Phương thức khác (MOMO, PAYOS) - chưa tích hợp, hiện thông báo
        setError(`Phương thức ${paymentMethod} chưa được tích hợp. Vui lòng chọn VNPay.`);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi không mong muốn.");
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-black text-slate-900 mb-2">Không tìm thấy lộ trình</h2>
        <p className="text-slate-500 mb-6">{error || "Lộ trình không tồn tại hoặc chưa được duyệt."}</p>
        <button onClick={() => navigate("/courses")} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
          Quay lại Khóa học
        </button>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "VNPAY" as const,
      label: "Cổng thanh toán VNPay",
      sublabel: "ATM, Visa, QR Code ngân hàng",
      icon: <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md">VN<br />Pay</div>,
      recommended: true,
    },
    {
      id: "MOMO" as const,
      label: "Ví điện tử MoMo",
      sublabel: "Quét mã QR hoặc ứng dụng MoMo",
      icon: <div className="w-10 h-10 bg-[#A50064] rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md">MoMo</div>,
      recommended: false,
    },
    {
      id: "PAYOS" as const,
      label: "Chuyển khoản PayOS",
      sublabel: "Chuyển khoản ngân hàng trực tiếp",
      icon: <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md"><Building2 size={18} /></div>,
      recommended: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full py-4 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-indigo-600 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Xác nhận & Thanh toán</h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">Hoàn tất thanh toán để bắt đầu hành trình học tập của bạn.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Order Summary */}
        <section className="lg:col-span-7 space-y-6">
          {/* Roadmap Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-5">Lộ trình học</h2>
            <div className="flex gap-5 items-start">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                <BookOpen size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">{roadmap.title}</h3>
                  <span className="shrink-0 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                    Đã duyệt
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                  {roadmap.tutorName && (
                    <div className="flex items-center gap-1.5">
                      <Users size={15} className="text-slate-400" />
                      <span>Gia sư: <strong className="text-slate-700">{roadmap.tutorName}</strong></span>
                    </div>
                  )}
                  {roadmap.totalSessions > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Clock size={15} className="text-slate-400" />
                      <span><strong className="text-slate-700">{roadmap.totalSessions}</strong> buổi học</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Học phí theo lộ trình</span>
                <span className="text-2xl font-black text-indigo-600">
                  {formatCurrency(roadmap.totalFee)}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" />
                Thanh toán 1 lần, truy cập toàn bộ {roadmap.totalSessions} buổi học.
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-5">Phương thức thanh toán</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.id
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="sr-only"
                  />
                  {method.icon}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{method.label}</span>
                      {method.recommended && (
                        <span className="text-[9px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded uppercase">Khuyên dùng</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{method.sublabel}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${paymentMethod === method.id ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                    }`}>
                    {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT: Order Summary Sidebar */}
        <aside className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-5">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Học phí khóa học</span>
                <span>{formatCurrency(roadmap.totalFee)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Phí dịch vụ</span>
                <span className="text-emerald-600 font-bold">Miễn phí</span>
              </div>
            </div>

            <div className="border-t border-dashed border-slate-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-900 text-lg">Tổng thanh toán</span>
                <span className="text-2xl font-black text-indigo-600">
                  {formatCurrency(roadmap.totalFee)}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-sm font-medium">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={handlePayment}
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 text-white font-black text-lg rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Đang xử lý...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} /> Thanh toán ngay
                </>
              )}
            </button>

            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Giao dịch được mã hóa SSL 256-bit</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Khóa học mở ngay sau khi thanh toán thành công</span>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-5 leading-relaxed px-2">
              Bằng việc nhấn "Thanh toán ngay", bạn đồng ý với{" "}
              <span className="text-indigo-500 font-bold">Điều khoản dịch vụ</span> và{" "}
              <span className="text-indigo-500 font-bold">Chính sách bảo mật</span> của NEDU.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
