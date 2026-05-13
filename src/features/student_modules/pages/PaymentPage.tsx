import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("bank");

  return (
    <div className="max-w-7xl mx-auto w-full py-8 flex flex-col gap-8">
      {/* Page Title */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-slate-900">Thanh toán & Nhập học</h1>
        <p className="text-slate-500 mt-2">Hoàn tất thanh toán để bắt đầu hành trình chinh phục kiến thức.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Course Summary Section */}
        <section className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Course Image */}
            <div className="relative md:w-2/5 min-h-[240px]">
              <img 
                alt="Course Thumbnail" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjdXYFChwBcBZradzmtF7hnt3GdV9sbRuWCoej6yYufFbHhn0DHNQ9f1qI6XnDCO-aPc0gG00W-TEpSu5ijuYrEl4yW4ySQYZS4P-E7NV5nLrVJaM-Yu60iRBCqjqEUWq8JvsYRlBTjsNRMO4JTJQ8a2V_iLIdmqn6BWpncKT17TkZfHhT0UA0MeuRb_zxcS8fqndtXe2ok0jTyD6MKC0JVZrbUdctBN2XOQ1f86LJ46X0PukICIWh1UJsmd7ZN_a135iZG8mZtUY2" 
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Vật Lý</span>
              </div>
            </div>
            
            {/* Course Details */}
            <div className="p-6 md:w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">Vật lý 12: Luyện thi THPT QG</h2>
                  <span className="bg-emerald-100 text-emerald-600 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-tight flex items-center gap-1">
                    Đã Duyệt
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <img 
                    alt="Tutor" 
                    className="w-6 h-6 rounded-full border border-slate-200" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6o0ui_rk9dpCj0wsw_oivQ5H5rpacbD79XimDw58Frv-LuVjbu_USUql_XEbBdWfSHM5fgo68zCBtwWi555Vmx7iqXWRBYXmh9XUW_xup0iBuPbegHmpW6iQxJNPCnNb0bwx-psylwzNEusi2gfVEol__kOD41hWjK3-7UBXah5uGY7VfeDGQOTNG_NqZOt5UqDWoI84HQKaAy9rO1tEQfl3WnqiNLCubig7Bz_56rvpy2KDO47K3MZdpA6cMgu2XKfKCFD0UlE7w" 
                  />
                  <span className="text-sm text-slate-600 font-medium">Gia sư: Thầy Phan Khoa</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end text-sm">
                    <span className="text-slate-400">Tiến độ: 0%</span>
                    <span className="text-indigo-600 font-bold">20 bài dự kiến</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Bạn có thể truy cập ngay sau khi thanh toán thành công.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section className="lg:col-span-5">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Thông tin thanh toán</h3>
            
            {/* Pricing Table */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600">
                <span className="font-medium">Học phí gốc</span>
                <span className="line-through">1.200.000đ</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span className="font-medium">Giảm giá (Ưu đãi mới)</span>
                <span className="font-bold">- 400.000đ</span>
              </div>
              <div className="pt-4 border-t border-dashed border-slate-200 flex justify-between items-center">
                <span className="font-bold text-slate-900">Tổng thanh toán</span>
                <span className="text-2xl font-extrabold text-indigo-600">800.000đ</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <p className="text-sm font-bold text-slate-700 mb-4">Phương thức thanh toán</p>
              <div className="space-y-3">
                {/* Method 1: Bank Transfer */}
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500" 
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                  />
                  <span className="ml-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    </div>
                    <span className="font-bold text-slate-700">Chuyển khoản ngân hàng (QR)</span>
                  </span>
                </label>

                {/* Method 2: MoMo */}
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'momo' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500" 
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                  />
                  <span className="ml-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#A50064] rounded flex items-center justify-center text-white text-[10px] font-bold">MoMo</div>
                    <span className="font-bold text-slate-700">Ví điện tử MoMo</span>
                  </span>
                </label>

                {/* Method 3: VNPay */}
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'vnpay' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500" 
                    checked={paymentMethod === 'vnpay'}
                    onChange={() => setPaymentMethod('vnpay')}
                  />
                  <span className="ml-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">VNPay</div>
                    <span className="font-bold text-slate-700">Cổng thanh toán VNPay</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-[0.98]">
              <ShieldCheck size={20} />
              Thanh toán ngay
            </button>
            <p className="text-center text-xs text-slate-400 mt-4 px-4 leading-relaxed">
              Bằng việc nhấn "Thanh toán ngay", bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của NEDU.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
