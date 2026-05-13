import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Award,
  BarChart3,
  TrendingUp,
  FileText,
  Calendar,
  ChevronRight as ChevronRightIcon,
  ArrowLeft,
  Clock,
  MessageSquare,
  Download,
  Zap,
  Star,
  Calculator,
  Languages,
  Beaker,
  Filter,
  ChevronDown,
  ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentLearningProgressPage() {
  const navigate = useNavigate();
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Dữ liệu mẫu Lịch sử (Full list)
  const historyItems = [
    {
      id: 1,
      subject: "Toán học",
      topic: "Đại số sơ cấp: Phương trình bậc hai",
      tutor: "Thầy Minh Hoàng",
      duration: "60 phút",
      icon: <Calculator size={24} />,
      color: "bg-indigo-600",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang"
    },
    {
      id: 2,
      subject: "Tiếng Anh",
      topic: "Giao tiếp: Chủ đề Môi trường",
      tutor: "Cô Thu Trang",
      duration: "45 phút",
      icon: <Languages size={24} />,
      color: "bg-sky-500",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trang"
    },
    {
      id: 3,
      subject: "Vật lý",
      topic: "Cơ học: Chuyển động thẳng đều",
      tutor: "Thầy Đức Tuấn",
      duration: "90 phút",
      icon: <Beaker size={24} />,
      color: "bg-rose-500",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan"
    }
  ];

  // Dữ liệu mẫu Nhật ký (Logs)
  const logs = [
    {
      id: 1,
      date: "Hôm qua, 14:00",
      fullDate: "Thứ Ba, 24 Tháng 10, 2023",
      time: "14:00 - 15:30 (90 phút)",
      title: "Lab: Component States & Props",
      tutor: "Sarah Nguyen",
      status: "PRESENT",
      score: 9.5,
      progress: 95,
      xp: 150,
      feedback: "Hôm nay Minh đã làm rất tốt phần biến đổi biểu thức! Con đã nắm vững quy tắc chuyển vế đổi dấu. Chỉ cần chú ý thêm một chút khi tính toán với số âm là sẽ đạt điểm tuyệt đối.",
      topics: [
        { title: "Khái niệm State trong React", desc: "Định nghĩa và cách khởi tạo state với hook useState." },
        { title: "Luồng dữ liệu một chiều (Props)", desc: "Truyền dữ liệu từ component cha sang component con." }
      ]
    },
    {
      id: 2,
      date: "22 Th10, 09:30",
      fullDate: "Chủ Nhật, 22 Tháng 10, 2023",
      time: "09:30 - 11:00 (90 phút)",
      title: "Critique: Portfolio Review",
      tutor: "Alex Tran",
      status: "PRESENT",
      score: 8.0,
      progress: 80,
      xp: 120,
      feedback: "Tham gia tích cực. Cần cải thiện tỷ lệ font chữ và khoảng cách giữa các thành phần.",
      topics: [
        { title: "Phân tích Layout cá nhân", desc: "Đánh giá cấu trúc trang chủ Portfolio." }
      ]
    }
  ];

  // Giao diện CHI TIẾT NHẬT KÝ
  if (selectedLog) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
        <header className="space-y-6">
          <button onClick={() => setSelectedLog(null)} className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
            <ArrowLeft size={18} /> Quay lại danh sách
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{selectedLog.title}</h1>
              <div className="flex items-center gap-6 text-slate-500 font-bold text-sm">
                <div className="flex items-center gap-2"><Calendar size={18} className="text-indigo-400" /> {selectedLog.fullDate}</div>
                <div className="flex items-center gap-2"><Clock size={18} className="text-indigo-400" /> {selectedLog.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-12 h-12 rounded-full border-2 border-indigo-50" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gia sư</p>
                <p className="font-black text-slate-900">{selectedLog.tutor}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-indigo-600 text-white rounded-[32px] p-8 shadow-xl">
              <h2 className="text-xl font-black mb-6 flex items-center gap-3"><MessageSquare size={20} /> Nhận xét từ gia sư</h2>
              <p className="text-lg font-medium italic leading-relaxed text-indigo-50">"{selectedLog.feedback}"</p>
            </section>
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6">Nội dung học</h2>
              <div className="space-y-6">
                {selectedLog.topics.map((t: any, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all">
                    <CheckCircle2 size={20} className="text-emerald-500 mt-1" />
                    <div><h3 className="font-bold text-slate-900">{t.title}</h3><p className="text-sm text-slate-500">{t.desc}</p></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[32px] p-8 text-center shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Kết quả</p>
              <div className="text-4xl font-black text-slate-900">{selectedLog.score}<span className="text-sm text-slate-400">/10</span></div>
              <p className="text-emerald-600 font-black mt-2">Xuất Sắc!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Tiến trình học tập</h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">Theo dõi hành trình và kết quả học tập của bạn.</p>
        </div>
        <div className="h-12 w-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
          <TrendingUp size={28} />
        </div>
      </div>

      {/* ── Row 1: Chart & Quick Logs ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Biểu đồ (2/3) */}
        <div className="lg:col-span-2">
          <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="text-indigo-600" /> Biểu đồ học tập
              </h3>
              <select className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-500 p-2 outline-none">
                <option>4 tuần gần nhất</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-4">
              {[40, 65, 50, 85, 45, 70, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-50 rounded-2xl h-full relative group cursor-pointer">
                  <div
                    className="absolute bottom-0 w-full bg-indigo-600 rounded-2xl transition-all duration-700 group-hover:bg-indigo-400"
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Nhật ký nhanh (1/3) */}
        <div className="lg:col-span-1">
          <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm h-full">
            <h3 className="text-lg font-black text-slate-900 mb-8">Nhật ký nhanh</h3>
            <div className="space-y-8">
              {logs.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="group cursor-pointer border-b border-slate-50 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.date}</span>
                    <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{log.status}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-1">{log.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">Gia sư: {log.tutor}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── Row 2: Lịch sử buổi học chi tiết (Full width) ────────────────── */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            Lịch sử buổi học chi tiết
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <select className="pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm">
                <option>Tất cả môn học</option>
                <option>Toán học</option>
                <option>Tiếng Anh</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-[32px] border border-slate-200 hover:border-indigo-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.subject}</h4>
                  <p className="text-xs text-slate-500 font-medium font-inter">{item.topic}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-8 md:gap-12">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <Clock size={14} className="text-slate-300" /> {item.duration}
                </div>
                <div className="flex items-center gap-2">
                  <img src={item.avatar} className="w-8 h-8 rounded-full border border-indigo-50" alt="Tutor" />
                  <span className="text-xs font-bold text-slate-800">{item.tutor}</span>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wider border border-emerald-100">
                  Đã hoàn thành
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Tải báo cáo">
                  <Download size={18} />
                </button>
                <button
                  onClick={() => setSelectedLog(logs[0])}
                  className="px-8 py-2.5 bg-indigo-600 text-white font-black text-xs rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  Xem nhật ký
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav className="flex justify-center items-center gap-2 pt-8">
          <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
            <ChevronLeft size={18} />
          </button>
          <button className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xs shadow-lg shadow-indigo-100">1</button>
          <button className="w-10 h-10 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs hover:bg-slate-50 transition-all">2</button>
          <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
            <ChevronRightIcon size={18} />
          </button>
        </nav>
      </section>
    </div>
  );
}
