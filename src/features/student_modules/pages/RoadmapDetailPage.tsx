import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Timer, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  Edit3, 
  Info,
  XCircle,
  Clock
} from "lucide-react";

interface RoadmapModule {
  moduleId: string;
  title: string;
  description: string;
  orderIndex: number;
  sessions: number;
}

export default function RoadmapDetailPage() {
  const { courseId } = useParams<{ courseId: string }>(); // Using courseId as roadmapId here
  const navigate = useNavigate();
  const [userId] = useState(() => localStorage.getItem("userId") || "11111111-1111-1111-1111-111111111111");

  const [roadmapDetail, setRoadmapDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);

  const fetchRoadmap = () => {
    setIsLoading(true);
    fetch(`http://localhost:8080/api/v1/student/roadmaps/${courseId}?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setRoadmapDetail(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (courseId) {
      fetchRoadmap();
    }
  }, [courseId, userId]);

  const handleRoadmapAction = async (action: 'approve' | 'revision' | 'cancel') => {
    if (!courseId || !roadmapDetail) return;
    setIsActionLoading(true);
    
    try {
      let url = `http://localhost:8080/api/v1/student/roadmaps/${courseId}/${action}?userId=${userId}`;
      let options: RequestInit = { method: "POST" };
      
      if (action === 'revision') {
        if (!revisionNote || revisionNote.trim().length < 10) {
          alert("Vui lòng nhập lý do chỉnh sửa (ít nhất 10 ký tự).");
          setIsActionLoading(false);
          return;
        }
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify({ revisionNote });
      }

      const res = await fetch(url, options);
      const data = await res.json();
      
      if (res.ok && data.status === 200) {
        alert("Thao tác thành công!");
        setShowRevisionForm(false);
        setRevisionNote("");
        fetchRoadmap(); // Refresh data
        
        if (action === 'approve') {
           navigate('/payment');
        } else if (action === 'cancel') {
           navigate('/courses');
        }
      } else {
        alert("Lỗi: " + (data.message || "Không thể thực hiện thao tác."));
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi kết nối.");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-slate-500">Đang tải chi tiết lộ trình...</p>
      </div>
    );
  }

  if (!roadmapDetail) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy lộ trình</h2>
        <p className="text-slate-500">Lộ trình có thể đã bị xóa hoặc bạn không có quyền truy cập.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold">Quay lại</button>
      </div>
    );
  }

  const { title, tutorName, totalSessions, totalFee, sessionDurationMin, status, modules, revisionCount, maxRevisionAllowed } = roadmapDetail;
  const isPending = status === 'PENDING_APPROVAL';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-right-4 duration-500">
      {/* Back Navigation */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          Quay lại danh sách khóa học
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
              <div className="flex-1">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-black text-[10px] uppercase tracking-widest rounded mb-3 ${
                   status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                   status === 'PENDING_APPROVAL' ? 'bg-amber-100 text-amber-800' :
                   status === 'REVISION_REQUESTED' ? 'bg-sky-100 text-sky-800' :
                   status === 'REJECTED' || status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                   'bg-slate-100 text-slate-800'
                }`}>
                  {status === 'APPROVED' ? <CheckCircle2 size={12} /> : <Timer size={12} />}
                  Trạng thái: {status}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">
                  {title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <img 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm bg-indigo-100" 
                alt="Tutor avatar" 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tutorName}`}
              />
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Gia sư phụ trách</p>
                <h3 className="text-base font-bold text-slate-900">{tutorName}</h3>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-2.5 bg-white text-indigo-600 rounded-xl border border-slate-200 hover:shadow-md transition-all">
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Roadmap Details */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-10 flex items-center gap-3 text-slate-900 border-b border-slate-100 pb-4">
              <FileText className="text-indigo-600" size={24} />
              Lộ trình chi tiết (Modules)
            </h2>
            
            {modules && modules.length > 0 ? (
              <div className="space-y-10 relative">
                {/* Vertical line connector */}
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>

                {modules.map((module: RoadmapModule, index: number) => (
                  <div key={module.moduleId || index} className="relative pl-14 group">
                    <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-slate-300 group-hover:border-indigo-600 group-hover:text-indigo-600 rounded-full flex items-center justify-center text-slate-400 z-10 transition-colors">
                      <span className="font-bold text-sm">{module.orderIndex}</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-2">
                        <h4 className="text-lg font-bold text-slate-900">{module.title}</h4>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase shrink-0 w-fit">
                          {module.sessions} buổi học
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap">
                        {module.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                <p className="font-bold text-slate-500">Chưa có thông tin modules lộ trình.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black mb-6 text-slate-900 border-b border-slate-100 pb-4">Tóm tắt lộ trình</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 border-dashed">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={16} />
                  <span className="text-sm font-bold">Thời lượng 1 buổi</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">{sessionDurationMin} phút</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 border-dashed">
                <div className="flex items-center gap-2 text-slate-500">
                  <BookOpen size={16} />
                  <span className="text-sm font-bold">Tổng số buổi</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">{totalSessions} buổi</span>
              </div>
            </div>

            <div className="bg-indigo-50/50 p-6 rounded-xl mb-8 border border-indigo-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">Tổng chi phí dự kiến</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-indigo-700">{totalFee?.toLocaleString("vi-VN")}</span>
                <span className="text-lg font-bold text-indigo-700">đ</span>
              </div>
            </div>

            {isPending && (
              <>
                {!showRevisionForm ? (
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleRoadmapAction('approve')}
                      disabled={isActionLoading}
                      className="w-full py-3.5 bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 active:scale-95 transition-all shadow-md shadow-emerald-200 text-sm disabled:opacity-50"
                    >
                      <CheckCircle2 size={18} />
                      Đồng ý & Thanh toán
                    </button>
                    <button 
                      onClick={() => setShowRevisionForm(true)}
                      disabled={isActionLoading || revisionCount >= (maxRevisionAllowed || 3)}
                      className="w-full py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Edit3 size={18} />
                      Yêu cầu chỉnh sửa ({revisionCount}/{maxRevisionAllowed || 3})
                    </button>
                    <button 
                      onClick={() => handleRoadmapAction('cancel')}
                      disabled={isActionLoading}
                      className="w-full py-3.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-100 active:scale-95 transition-all text-sm disabled:opacity-50"
                    >
                      <XCircle size={18} />
                      Từ chối / Hủy
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50 animate-in fade-in zoom-in-95">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">Yêu cầu sửa lộ trình</h4>
                    <textarea 
                      value={revisionNote}
                      onChange={(e) => setRevisionNote(e.target.value)}
                      placeholder="Ghi chú chi tiết điều bạn muốn gia sư thay đổi..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 min-h-[100px] focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleRoadmapAction('revision')}
                        disabled={isActionLoading}
                        className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-xs"
                      >
                        Gửi
                      </button>
                      <button 
                        onClick={() => setShowRevisionForm(false)}
                        disabled={isActionLoading}
                        className="flex-1 py-2.5 bg-white text-slate-600 rounded-lg font-bold border border-slate-200 text-xs"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 p-4 bg-amber-50 rounded-xl flex items-start gap-3 border border-amber-100">
                  <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-amber-800 leading-relaxed">
                    Bạn có thể yêu cầu chỉnh sửa lộ trình tối đa <strong className="font-black">{maxRevisionAllowed || 3}</strong> lần. Số lần đã yêu cầu: <strong className="font-black text-amber-900">{revisionCount}</strong>.
                  </p>
                </div>
              </>
            )}

            {status === 'APPROVED' && (
               <div className="flex flex-col gap-4 mt-6">
                 <button 
                   onClick={() => navigate('/payment')}
                   className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 text-sm"
                 >
                   Tiếp tục đến Thanh toán
                 </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
