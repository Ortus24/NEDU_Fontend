import React, { useState, useEffect, useMemo } from "react";
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
  ChevronLeft,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentLearningProgressPage() {
  const navigate = useNavigate();
  const [selectedLog, setSelectedLog] = useState<any>(null);
  
  const [userId] = useState(() => localStorage.getItem("userId") || "11111111-1111-1111-1111-111111111111");
  const [sessions, setSessions] = useState<any[]>([]);
  const [enrollmentMap, setEnrollmentMap] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingLog, setIsFetchingLog] = useState(false);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const [resSessions, resEnrollments] = await Promise.all([
          fetch(`http://localhost:8080/api/v1/student/sessions?userId=${userId}`),
          fetch(`http://localhost:8080/api/v1/enrollments/my-courses?userId=${userId}`)
        ]);

        if (resEnrollments.ok) {
          const enrollData = await resEnrollments.json();
          const map: Record<string, any> = {};
          (enrollData.data || []).forEach((e: any) => {
            map[e.id] = {
              tutorName: e.tutorName,
              subject: e.roadmapTitle || "Khóa học"
            };
          });
          setEnrollmentMap(map);
        }

        if (resSessions.ok) {
          const json = await resSessions.json();
          setSessions(json.data || []);
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu tiến trình:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgressData();
  }, [userId]);

  const handleViewLog = async (session: any) => {
    setIsFetchingLog(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/student/sessions/${session.id}/log`);
      if (res.ok) {
        const json = await res.json();
        const logData = json.data;
        // Map data to the format UI expects
        setSelectedLog({
          ...session,
          title: `Buổi ${session.sessionNumber}: ${session.roadmapTitle}`,
          tutor: logData?.tutorName || enrollmentMap[session.enrollmentId]?.tutorName || "Gia sư",
          avatar: logData?.tutorAvatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.id}`,
          feedback: logData?.progressNote || "Gia sư chưa cập nhật nhận xét.",
          contentTaught: logData?.contentTaught || "Chưa có nội dung",
          homework: logData?.homework || "Chưa có bài tập",
          score: logData?.studentRating || "Tốt"
        });
      } else {
        alert("Chưa có nhật ký cho buổi học này.");
      }
    } catch (error) {
      console.error("Lỗi tải nhật ký:", error);
    } finally {
      setIsFetchingLog(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Lọc lấy các buổi đã học (COMPLETED) hoặc PENDING đã qua thời gian để hiển thị trong lịch sử
  const historyItems = [...sessions].sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  
  // Nhật ký nhanh: Lấy top 3 buổi gần nhất đã COMPLETED
  const quickLogs = sessions.filter(s => s.status === 'COMPLETED').slice(0, 3);

  // Tính toán dữ liệu Tần suất học tập (7 ngày gần nhất)
  const chartData = useMemo(() => {
    const data = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let maxMinutes = 0;

    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() - i);
      const dateStr = targetDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
      const dayLabel = targetDate.toLocaleDateString('vi-VN', { weekday: 'short' });

      // Lọc các session COMPLETED trong ngày này
      const dailySessions = sessions.filter(s => {
        if (s.status !== 'COMPLETED') return false;
        const sDate = new Date(s.scheduledAt);
        sDate.setHours(0, 0, 0, 0);
        return sDate.getTime() === targetDate.getTime();
      });

      const totalMinutes = dailySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
      if (totalMinutes > maxMinutes) maxMinutes = totalMinutes;

      data.push({
        label: dayLabel,
        date: dateStr,
        minutes: totalMinutes
      });
    }

    // Tránh chia cho 0, chia theo max = mốc 100%
    const safeMax = maxMinutes > 0 ? maxMinutes : 1;
    
    return data.map(d => ({
      ...d,
      percentage: d.minutes === 0 ? 0 : Math.max(8, (d.minutes / safeMax) * 100) // Minimum height 8% if > 0
    }));
  }, [sessions]);

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
                <div className="flex items-center gap-2"><Calendar size={18} className="text-indigo-400" /> {formatDate(selectedLog.scheduledAt)}</div>
                <div className="flex items-center gap-2"><Clock size={18} className="text-indigo-400" /> {selectedLog.durationMinutes} phút</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <img src={selectedLog.avatar} className="w-12 h-12 rounded-full border-2 border-indigo-50" />
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
              <p className="text-lg font-medium italic leading-relaxed text-indigo-50 whitespace-pre-wrap">"{selectedLog.feedback}"</p>
            </section>
            
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6">Nội dung học & Bài tập</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl transition-all">
                  <CheckCircle2 size={20} className="text-emerald-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Đã dạy trong buổi</h3>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{selectedLog.contentTaught}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl transition-all">
                  <BookOpen size={20} className="text-amber-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Bài tập về nhà</h3>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{selectedLog.homework}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[32px] p-8 text-center shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Mức độ hiểu bài</p>
              <div className="text-2xl font-black text-indigo-600 uppercase">{selectedLog.score}</div>
              <p className="text-slate-500 font-medium text-sm mt-2">Theo đánh giá của Gia sư</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
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
                <BarChart3 className="text-indigo-600" /> Tần suất học tập
              </h3>
              <select className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-500 p-2 outline-none">
                <option>4 tuần gần nhất</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-4 pb-6 mt-4">
              {chartData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full relative group">
                  <div className="w-full bg-indigo-50/50 rounded-2xl flex-1 relative cursor-pointer border border-indigo-100/50 hover:bg-indigo-50 transition-colors">
                    <div
                      className="absolute bottom-0 w-full bg-indigo-600 rounded-2xl transition-all duration-700 group-hover:bg-indigo-400 group-hover:shadow-lg group-hover:shadow-indigo-600/20"
                      style={{ height: `${d.percentage}%` }}
                    ></div>
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-xl">
                      {d.minutes} phút
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                  <div className="text-center mt-1">
                    <p className="text-[11px] font-bold text-slate-600 uppercase">{d.label}</p>
                    <p className="text-[9px] font-medium text-slate-400">{d.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Nhật ký nhanh (1/3) */}
        <div className="lg:col-span-1">
          <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm h-full">
            <h3 className="text-lg font-black text-slate-900 mb-8">Nhật ký gần nhất</h3>
            <div className="space-y-8">
              {quickLogs.length > 0 ? quickLogs.map((log) => (
                <div
                  key={log.id}
                  onClick={() => handleViewLog(log)}
                  className="group cursor-pointer border-b border-slate-50 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {new Date(log.scheduledAt).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">HOÀN THÀNH</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-1">
                    Buổi {log.sessionNumber}: {log.roadmapTitle}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">Gia sư: {enrollmentMap[log.enrollmentId]?.tutorName || "Hệ thống"}</p>
                </div>
              )) : (
                <p className="text-sm text-slate-400 italic">Chưa có buổi học nào hoàn thành.</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ── Row 2: Lịch sử buổi học chi tiết (Full width) ────────────────── */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            Lịch sử & Lịch học
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <select className="pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm">
                <option>Tất cả</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {historyItems.length > 0 ? historyItems.map((item) => {
            const tutorName = enrollmentMap[item.enrollmentId]?.tutorName || "Gia sư";
            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-[32px] border border-slate-200 hover:border-indigo-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl ${item.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-indigo-600'} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                    {item.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : <Calendar size={24} />}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.roadmapTitle}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">Buổi số {item.sessionNumber}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 md:gap-10">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Clock size={14} className="text-slate-400" /> {formatDate(item.scheduledAt)} ({item.durationMinutes} phút)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs border border-slate-200">
                      {tutorName.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-800">{tutorName}</span>
                  </div>
                  {item.status === 'COMPLETED' ? (
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wider border border-emerald-100">
                      Đã hoàn thành
                    </div>
                  ) : item.status === 'PENDING' ? (
                    <div className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wider border border-amber-100">
                      Sắp diễn ra
                    </div>
                  ) : (
                    <div className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wider border border-slate-200">
                      {item.status}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {item.status === 'COMPLETED' && (
                    <button
                      onClick={() => handleViewLog(item)}
                      disabled={isFetchingLog}
                      className="px-6 py-2.5 bg-indigo-600 text-white font-black text-xs rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isFetchingLog ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                      Xem nhật ký
                    </button>
                  )}
                  {item.status === 'PENDING' && item.virtualRoomUrl && (
                    <a
                      href={item.virtualRoomUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 bg-white border-2 border-indigo-600 text-indigo-600 font-black text-xs rounded-xl hover:bg-indigo-50 transition-all active:scale-95"
                    >
                      Vào lớp học
                    </a>
                  )}
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-12 text-slate-500 bg-white rounded-[32px] border border-slate-200">
              Bạn chưa có buổi học nào.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
