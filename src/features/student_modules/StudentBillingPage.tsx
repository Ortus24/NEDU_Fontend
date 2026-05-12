import React from "react";
import { 
  CreditCard, 
  PlusCircle, 
  Lock, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Mail, 
  MapPin, 
  FileText,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function StudentBillingPage() {
  // Dữ liệu giả lập
  const transactions = [
    { id: 1, date: "24/10/2023", desc: "Nạp tiền vào ví - MoMo", amount: "+ 2.000.000đ", status: "success", type: "in" },
    { id: 2, date: "22/10/2023", desc: "Thanh toán: ReactJS Mastery", amount: "- 1.200.000đ", status: "pending", type: "out" },
    { id: 3, date: "15/10/2023", desc: "Hoàn tiền: Python Basics", amount: "+ 850.000đ", status: "refund", type: "in" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Page Heading ─────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Thanh toán & Hóa đơn
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium font-inter">
            Quản lý số dư, phương thức thanh toán và lịch sử giao dịch của bạn.
          </p>
        </div>
        <div className="h-12 w-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
          <CreditCard size={28} />
        </div>
      </div>

      {/* ── Financial Overview Bento ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-indigo-50 opacity-50 group-hover:scale-110 transition-transform">
            <CreditCard size={160} />
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Số dư khả dụng</span>
            <div className="mt-2 flex items-baseline gap-2">
              <h2 className="text-5xl font-black text-indigo-600 tracking-tighter">5.420.000</h2>
              <span className="text-xl font-bold text-indigo-400">VND</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-slate-500 bg-slate-50 w-fit px-4 py-2 rounded-xl border border-slate-100">
              <Lock size={16} className="text-indigo-400" />
              <span className="text-xs font-bold">2.400.000 VND đang được giữ trong Escrow</span>
            </div>
          </div>
          <div className="mt-10 relative z-10">
            <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100">
              <PlusCircle size={18} />
              Nạp tiền vào ví
            </button>
          </div>
        </div>

        {/* Escrow Visualizer */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={80} />
          </div>
          <h3 className="text-lg font-black mb-6 flex items-center gap-2">
             Quỹ Escrow
          </h3>
          <div className="space-y-4">
            {[
              { title: "Khóa học ReactJS", amount: "1.200.000đ" },
              { title: "UI/UX Advanced", amount: "1.200.000đ" }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{item.title}</p>
                <div className="flex justify-between items-end mt-1">
                  <span className="text-lg font-black">{item.amount}</span>
                  <span className="text-[9px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase font-black tracking-tighter">Đang giữ</span>
                </div>
              </div>
            ))}
            <p className="text-[10px] text-slate-400 mt-6 italic leading-relaxed">
              * Tiền sẽ được giải ngân cho gia sư sau khi mỗi buổi học hoàn thành.
            </p>
          </div>
        </div>
      </div>

      {/* ── Payment Methods ────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900">Phương thức thanh toán</h3>
          <button className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline">
            <Plus size={18} />
            Thêm phương thức mới
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MoMo */}
          <div className="p-6 bg-white border-2 border-indigo-100 rounded-3xl flex items-center justify-between group hover:border-indigo-400 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#A50064] rounded-2xl flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-pink-100">MoMo</div>
              <div>
                <p className="font-bold text-slate-800">Ví MoMo</p>
                <p className="text-xs text-slate-400 font-medium">098****123</p>
              </div>
            </div>
            <span className="bg-indigo-600 text-white text-[9px] px-2 py-1 rounded-lg font-black uppercase">Mặc định</span>
          </div>
          {/* Credit Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-3xl flex items-center justify-between group hover:border-indigo-400 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Visa Card</p>
                <p className="text-xs text-slate-400 font-medium">**** 4242</p>
              </div>
            </div>
            <button className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-rose-50 rounded-xl">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Transaction History ────────────────────────────────────────────── */}
      <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-xl font-black text-slate-900">Lịch sử giao dịch</h3>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Tìm kiếm giao dịch..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all w-full md:w-64 font-medium"
              />
            </div>
            <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mô tả</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Số tiền</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-5 text-sm text-slate-500 font-bold">{t.date}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                        {t.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{t.desc}</span>
                    </div>
                  </td>
                  <td className={`px-8 py-5 text-sm font-black ${t.type === 'in' ? 'text-emerald-600' : 'text-slate-900'}`}>{t.amount}</td>
                  <td className="px-8 py-5">
                    {t.status === 'success' && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Thành công</span>}
                    {t.status === 'pending' && <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Đang xử lý</span>}
                    {t.status === 'refund' && <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Hoàn tiền</span>}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-xl transition-all">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/30 text-center border-t border-slate-50">
          <button className="text-indigo-600 font-black text-xs hover:underline">Xem thêm lịch sử giao dịch</button>
        </div>
      </section>

      {/* ── Billing Details ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-800">Địa chỉ thanh toán</h3>
            <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
              <RefreshCcw size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-indigo-400 mt-1" />
              <div>
                <p className="font-bold text-slate-800">Nguyen Van A</p>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  123 Đường Lê Lợi, Quận 1<br/>Thành phố Hồ Chí Minh, 700000<br/>Việt Nam
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-3 text-indigo-600 font-bold text-sm">
              <Mail size={18} />
              <span>nva.student@nedu.edu.vn</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-6">Hóa đơn gần đây</h3>
          <div className="space-y-3">
            {[
              { id: "INV-2023-089", date: "24/10/2023" },
              { id: "INV-2023-076", date: "12/09/2023" }
            ].map((inv, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{inv.id}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{inv.date}</p>
                  </div>
                </div>
                <button className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
            <button className="w-full py-3 mt-2 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs hover:border-indigo-300 hover:text-indigo-600 transition-all">
               Tất cả hóa đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
