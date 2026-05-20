import React, { useState, useEffect } from "react";
import {
  Timer,
  CheckCircle2,
  Lock,
  FileText,
  Link as LinkIcon,
  Star,
  BookOpen,
  ArrowLeft,
  GraduationCap,
  Search,
  Filter,
  Video,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface Course {
  id: string;
  title: string;
  tutor: string;
  progress: number;
  totalSessions: number;
  completedSessions: number;
  nextSession: string;
  category: string;
  escrowStatus: string;
  status: "active" | "completed" | "pending" | "trial";
  endDate?: string;
  result?: string;
  totalPrice?: string;
  roadmapStatus?: "DRAFT" | "PENDING_APPROVAL" | "REVISION_REQUESTED" | "APPROVED" | "REJECTED" | "CANCELLED";
  trialStatus?: "PENDING" | "CONFIRMED" | "REJECTED" | "COMPLETED" | "CANCELLED";
  roadmapId?: string;
}

interface Session {
  id: string;
  sessionNumber: number;
  scheduledAt: string;
  durationMinutes: number;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
  virtualRoomUrl: string;
  enrollmentId: string;
  roadmapTitle: string;
  canCheckIn: boolean;
  hasCheckedIn: boolean;
  checkedInAt?: string;
}

interface RoadmapModule {
  moduleId: string;
  title: string;
  description: string;
  orderIndex: number;
  sessions: number;
}

// ─── Session Card Component ──────────────────────────────────────────────────

interface SessionCardProps {
  session: Session;
  onCheckIn: (sessionId: string) => void;
}

function SessionCard({ session, onCheckIn }: SessionCardProps) {
  const isCompleted = session.status === "COMPLETED";
  const isActive = session.status === "IN_PROGRESS";
  const isLocked = session.status === "SCHEDULED";
  const isRescheduled = session.status === "RESCHEDULED";
  const isCancelled = session.status === "CANCELLED";

  const dateStr = new Date(session.scheduledAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  
  const timeStr = new Date(session.scheduledAt).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="relative pl-8 md:pl-10 pb-10">
      <div className={`absolute left-0 top-0 h-full w-[2px] ${isLocked ? "bg-slate-200" : "bg-indigo-500/20"}`}></div>
      <div className={`absolute left-[-9px] top-0 h-5 w-5 rounded-full bg-white border-2 flex items-center justify-center z-10 ${
        isCompleted ? "border-emerald-500" : isActive ? "border-indigo-500" : "border-slate-300"
      }`}>
        {isCompleted && <CheckCircle2 size={12} className="text-emerald-600 fill-emerald-50" />}
        {isActive && <div className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />}
        {isLocked && <Lock size={10} className="text-slate-400" />}
      </div>

      <div className={`rounded-2xl p-5 bg-white border ${
        isActive ? "border-indigo-500 shadow-md ring-2 ring-indigo-50" : "border-slate-200"
      } ${isLocked ? "opacity-90" : ""} ${isCancelled ? "opacity-60 line-through" : ""}`}>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                isCompleted ? "bg-emerald-100 text-emerald-700" : 
                isActive ? "bg-indigo-600 text-white" : 
                isCancelled ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-500"
              }`}>
                {isCompleted ? "Xong" : isActive ? "Đang diễn ra" : isCancelled ? "Đã hủy" : `Buổi ${session.sessionNumber}`}
              </span>
              <span className="text-xs text-slate-400 font-bold">{dateStr} {timeStr && `- ${timeStr}`} ({session.durationMinutes} phút)</span>
            </div>
            <h4 className="font-bold text-slate-800">
              Buổi học số {session.sessionNumber}: {session.roadmapTitle || "Học buổi chính thức"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isCompleted ? "Buổi học đã hoàn thành thành công." : "Buổi học theo đúng lộ trình đã đề ra."}
            </p>
            {session.hasCheckedIn && (
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">
                <CheckCircle2 size={10} /> Đã điểm danh lúc {new Date(session.checkedInAt!).toLocaleTimeString("vi-VN")}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 shrink-0 self-start">
            {isActive && session.virtualRoomUrl && (
              <a
                href={session.virtualRoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all text-center shadow-lg shadow-indigo-100"
              >
                Vào lớp học
              </a>
            )}
            {session.canCheckIn && !session.hasCheckedIn && (
              <button
                onClick={() => onCheckIn(session.id)}
                className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-all text-center shadow-lg shadow-emerald-100"
              >
                Điểm danh (Check-in)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Roadmap Module Card Component ─────────────────────────────────────────────

interface RoadmapModuleCardProps {
  module: RoadmapModule;
}

function RoadmapModuleCard({ module }: RoadmapModuleCardProps) {
  return (
    <div className="relative pl-8 md:pl-10 pb-6">
      <div className="absolute left-0 top-0 h-full w-[2px] bg-slate-200"></div>
      <div className="absolute left-[-9px] top-0 h-5 w-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center z-10">
        <BookOpen size={10} className="text-slate-400" />
      </div>

      <div className="rounded-2xl p-5 bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                Module {module.orderIndex}
              </span>
              <span className="text-xs text-slate-400 font-bold">{module.sessions} buổi học</span>
            </div>
            <h4 className="font-bold text-slate-800">
              {module.title}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-wrap">
              {module.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CoursePage() {
  const navigate = useNavigate();
  const [userId] = useState(() => localStorage.getItem("userId") || "11111111-1111-1111-1111-111111111111");
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "pending" | "trial">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // States chứa dữ liệu tải từ API
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [roadmapModules, setRoadmapModules] = useState<RoadmapModule[]>([]);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);
  const [roadmapDetail, setRoadmapDetail] = useState<any>(null);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);

  // 1. TẢI DỮ LIỆU TỪ BACKEND
  const loadData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Gọi song song 3 API: Enrollments, Trial Bookings, và Roadmaps
      const [resEnrollments, resBookings, resRoadmaps] = await Promise.all([
        fetch(`http://localhost:8080/api/v1/enrollments/my-courses?userId=${userId}`),
        fetch(`http://localhost:8080/api/v1/bookings/my-bookings?userId=${userId}`),
        fetch(`http://localhost:8080/api/v1/student/roadmaps?userId=${userId}`)
      ]);

      const enrollmentsData = resEnrollments.ok ? (await resEnrollments.json()).data : [];
      const bookingsData = resBookings.ok ? (await resBookings.json()).data : [];
      const roadmapsData = resRoadmaps.ok ? (await resRoadmaps.json()).data : [];

      const loadedCourses: Course[] = [];

      // A. Map Enrollments (Active / Completed)
      if (enrollmentsData && Array.isArray(enrollmentsData)) {
        enrollmentsData.forEach((item: any) => {
          const progressPercent = item.totalSessions > 0 
            ? Math.round((item.completedSessions / item.totalSessions) * 100) 
            : 0;

          loadedCourses.push({
            id: item.id,
            title: item.roadmapTitle || "Khóa học chính thức",
            tutor: item.tutorName || "Gia sư hệ thống",
            progress: progressPercent,
            totalSessions: item.totalSessions,
            completedSessions: item.completedSessions || 0,
            nextSession: item.status === "COMPLETED" ? "Đã kết thúc" : "Lịch học theo tuần",
            category: "CHÍNH THỨC",
            escrowStatus: item.status === "COMPLETED" ? "Đã giải ngân" : "An toàn",
            status: item.status === "COMPLETED" ? "completed" : "active",
            totalPrice: item.totalFee ? `${item.totalFee.toLocaleString("vi-VN")} VNĐ` : undefined,
            roadmapId: item.roadmapId
          });
        });
      }

      // B. Map Trial Bookings
      if (bookingsData && Array.isArray(bookingsData)) {
        bookingsData.forEach((item: any) => {
          const date = item.scheduledAt ? new Date(item.scheduledAt) : null;
          const nextSessionStr = date 
            ? date.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
            : "Chưa đặt lịch";

          loadedCourses.push({
            id: item.id,
            title: `Lớp học thử với gia sư ${item.tutorName || "Gia sư"}`,
            tutor: item.tutorName || "Gia sư hệ thống",
            progress: item.status === "COMPLETED" ? 100 : 0,
            totalSessions: 1,
            completedSessions: item.status === "COMPLETED" ? 1 : 0,
            nextSession: nextSessionStr,
            category: "HỌC THỬ",
            escrowStatus: "Miễn phí",
            status: "trial",
            trialStatus: item.status // PENDING, CONFIRMED, etc.
          });
        });
      }

      // C. Map Roadmaps (Pending approval / Pending payment)
      if (roadmapsData && Array.isArray(roadmapsData)) {
        roadmapsData.forEach((item: any) => {
          // Lọc ra các roadmap chưa thanh toán (chưa có trong enrollments)
          const isEnrolled = loadedCourses.some(c => c.roadmapId === item.roadmapId);
          
          if (!isEnrolled) {
            loadedCourses.push({
              id: item.roadmapId,
              title: item.title || "Lộ trình học mới tạo",
              tutor: item.tutorName || "Gia sư hệ thống",
              progress: 0,
              totalSessions: item.totalSessions || 0,
              completedSessions: 0,
              nextSession: item.status === "APPROVED" ? "Sẵn sàng thanh toán" : "Đang chờ duyệt",
              category: "LỘ TRÌNH",
              escrowStatus: "Chờ thanh toán",
              status: "pending",
              totalPrice: item.totalFee ? `${item.totalFee.toLocaleString("vi-VN")} VNĐ` : "Chưa cập nhật",
              roadmapStatus: item.status // DRAFT, PENDING_APPROVAL, APPROVED, etc.
            });
          }
        });
      }

      setCourses(loadedCourses);

      // Tải thêm danh sách buổi học của student để hiển thị check-in
      const resSessions = await fetch(`http://localhost:8080/api/v1/student/sessions?userId=${userId}`);
      if (resSessions.ok) {
        const sessionsData = (await resSessions.json()).data;
        if (sessionsData && Array.isArray(sessionsData)) {
          setSessions(sessionsData);
        }
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại backend.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  useEffect(() => {
    if (selectedCourseId) {
      const selected = courses.find(c => c.id === selectedCourseId);
      const roadmapId = selected?.status === "pending" ? selected.id : selected?.roadmapId;
      
      if (roadmapId) {
        setIsRoadmapLoading(true);
        fetch(`http://localhost:8080/api/v1/student/roadmaps/${roadmapId}?userId=${userId}`)
          .then(res => res.json())
          .then(data => {
            if (data.data) {
              setRoadmapDetail(data.data);
              if (data.data.modules) {
                setRoadmapModules(data.data.modules);
              } else {
                setRoadmapModules([]);
              }
            } else {
              setRoadmapDetail(null);
              setRoadmapModules([]);
            }
          })
          .catch(err => {
            console.error(err);
            setRoadmapDetail(null);
            setRoadmapModules([]);
          })
          .finally(() => setIsRoadmapLoading(false));
      } else {
        setRoadmapDetail(null);
        setRoadmapModules([]);
      }
    }
  }, [selectedCourseId, courses]);

  // 3. XỬ LÝ LỘ TRÌNH (APPROVE, REVISION, CANCEL)
  const handleRoadmapAction = async (action: 'approve' | 'revision' | 'cancel') => {
    if (!selectedCourseId || !roadmapDetail) return;
    setIsActionLoading(true);
    
    try {
      let url = `http://localhost:8080/api/v1/student/roadmaps/${roadmapDetail.roadmapId}/${action}?userId=${userId}`;
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
        loadData(); // Reload main course list
        
        // Re-fetch roadmap details to update UI immediately
        const detailRes = await fetch(`http://localhost:8080/api/v1/student/roadmaps/${roadmapDetail.roadmapId}?userId=${userId}`);
        const detailData = await detailRes.json();
        if (detailData.data) {
          setRoadmapDetail(detailData.data);
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

  // 4. XỬ LÝ ĐIỂM DANH (CHECK-IN) TRỰC TIẾP
  const handleCheckIn = async (sessionId: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/student/sessions/${sessionId}/check-in?userId=${userId}`, {
        method: "POST"
      });
      const data = await res.json();
      if (res.ok && data.status === 200) {
        alert("🎉 Điểm danh thành công!");
        loadData(); // Tải lại dữ liệu mới nhất
      } else {
        alert("Lỗi điểm danh: " + (data.message || "Không đúng khung giờ học."));
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi điểm danh.");
    }
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const courseSessions = sessions.filter(s => s.enrollmentId === selectedCourseId);

  // Logic lọc khóa học theo Tab và từ khóa tìm kiếm
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tutor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = course.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // 1. GIAO DIỆN DANH SÁCH KHÓA HỌC
  if (!selectedCourseId) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Khóa học của tôi</h1>
            <p className="text-slate-500 mt-1.5 text-sm md:text-base">Quản lý và theo dõi tiến độ các khóa học kết nối từ Neon DB.</p>
          </div>
          <div className="h-12 w-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
            <GraduationCap size={28} />
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Navigation Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200">
          <div className="flex items-center gap-8 overflow-x-auto whitespace-nowrap pb-0">
            {[
              { id: "active", label: "Đang học" },
              { id: "completed", label: "Đã hoàn thành" },
              { id: "pending", label: "Đang chờ duyệt lộ trình" },
              { id: "trial", label: "Học thử" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm font-bold transition-all relative ${
                  activeTab === tab.id ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 animate-in fade-in slide-in-from-left-2" />
                )}
              </button>
            ))}
          </div>

          <div className="pb-4 flex items-center gap-3 w-full md:w-80">
            <div className="relative flex-grow">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tên khóa học, gia sư..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500">Đang tải dữ liệu khóa học...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    if (course.status !== "trial") {
                      setSelectedCourseId(course.id);
                    }
                  }}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer group flex flex-col xl:flex-row"
                >
                  <div className="w-full xl:w-48 h-48 xl:h-auto relative shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={course.category === "HỌC THỬ" 
                        ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop" 
                        : "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={course.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="bg-indigo-600 px-2 py-1 rounded-lg text-white text-xs font-bold uppercase tracking-wider">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">{course.title}</h3>
                      {course.status === 'completed' ? (
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                      ) : course.status === 'pending' ? (
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            course.roadmapStatus === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'
                          }`}>
                            {course.roadmapStatus === 'APPROVED' ? 'Đã duyệt' : 'Chờ duyệt'}
                          </span>
                        </div>
                      ) : course.status === 'trial' ? (
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          {course.trialStatus === 'CONFIRMED' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">Đã xác nhận</span>
                          ) : course.trialStatus === 'COMPLETED' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-700">Hoàn thành</span>
                          ) : course.trialStatus === 'CANCELLED' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">Đã hủy</span>
                          ) : course.trialStatus === 'REJECTED' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700">Từ chối</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700">Chờ gia sư</span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <Star size={16} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-amber-500">PRO</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-6 w-6 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <img alt="Tutor Avatar" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.tutor}`} />
                      </div>
                      <span className="text-sm text-slate-500 font-medium truncate">Gia sư: {course.tutor}</span>
                    </div>

                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-xs font-medium text-slate-500">Tiến độ: {course.progress}%</span>
                        <span className={`text-xs font-bold ${course.status === 'completed' || course.trialStatus === 'COMPLETED' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                          {course.status === 'pending' ? `${course.totalSessions} bài dự kiến` : `${course.completedSessions}/${course.totalSessions} bài học`}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full mb-4 overflow-hidden">
                        <div className={`h-full ${course.status === 'completed' || course.trialStatus === 'COMPLETED' ? 'bg-emerald-500' : 'bg-indigo-600'} rounded-full`} style={{ width: `${course.progress}%` }}></div>
                      </div>

                      {course.status === 'completed' ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/review/${course.id}`);
                          }}
                          className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 active:scale-[0.98] transition-all flex justify-center items-center gap-2 text-sm"
                        >
                          <Star size={16} />
                          Đánh giá gia sư
                        </button>
                      ) : course.status === 'pending' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (course.roadmapStatus === 'APPROVED') {
                              navigate('/payment');
                            } else {
                              navigate(`/roadmap/${course.id}`);
                            }
                          }}
                          className={`w-full py-2.5 px-4 text-white rounded-xl font-bold active:scale-[0.98] transition-all flex justify-center items-center gap-2 text-sm shadow-md ${
                            course.roadmapStatus === 'APPROVED' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 'bg-sky-500 hover:bg-sky-600 shadow-sky-200'
                          }`}
                        >
                          {course.roadmapStatus === 'APPROVED' ? <CheckCircle2 size={16} /> : <Timer size={16} />}
                          {course.roadmapStatus === 'APPROVED' ? 'Thanh toán & Nhập học' : 'Xem chi tiết lộ trình'}
                        </button>
                      ) : course.status === 'trial' ? (
                        course.trialStatus === 'CONFIRMED' ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/classroom');
                            }}
                            className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all flex justify-center items-center gap-2 text-sm shadow-md shadow-indigo-200"
                          >
                            <Video size={16} />
                            Vào học thử ngay
                          </button>
                        ) : course.trialStatus === 'COMPLETED' ? (
                          <button
                            disabled
                            className="w-full py-2.5 px-4 bg-teal-50 text-teal-600 border border-teal-200 rounded-xl font-bold transition-all flex justify-center items-center gap-2 text-sm cursor-default"
                          >
                            <CheckCircle2 size={16} />
                            Đã hoàn thành học thử
                          </button>
                        ) : course.trialStatus === 'CANCELLED' ? (
                          <button
                            disabled
                            className="w-full py-2.5 px-4 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-bold transition-all flex justify-center items-center gap-2 text-sm cursor-default"
                          >
                            <AlertCircle size={16} />
                            Lớp học đã bị hủy
                          </button>
                        ) : course.trialStatus === 'REJECTED' ? (
                          <button
                            disabled
                            className="w-full py-2.5 px-4 bg-red-50 text-red-600 border border-red-200 rounded-xl font-bold transition-all flex justify-center items-center gap-2 text-sm cursor-default"
                          >
                            <AlertCircle size={16} />
                            Lớp học bị từ chối
                          </button>
                        ) : (
                          <button className="w-full py-2.5 px-4 bg-orange-50 text-orange-600 border border-orange-200 rounded-xl font-bold hover:bg-orange-100 transition-all flex justify-center items-center gap-2 text-sm shadow-sm cursor-default">
                            <Timer size={16} />
                            Chờ gia sư phản hồi
                          </button>
                        )
                      ) : (
                        <button className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all flex justify-center items-center gap-2 text-sm shadow-md shadow-indigo-200">
                          <Video size={16} />
                          Bắt đầu học
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <Search size={32} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold">Không tìm thấy khóa học nào</p>
                  <p className="text-slate-400 text-sm">Thử đổi tab hoặc thay đổi từ khóa tìm kiếm xem sao.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 2. GIAO DIỆN CHI TIẾT KHÓA HỌC & CÁC BUỔI HỌC (SESSION LIST)
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <button
        onClick={() => setSelectedCourseId(null)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Quay lại danh sách khóa học
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-[10px] font-black uppercase tracking-widest">
                Lớp học chính thức
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{selectedCourse?.title}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><Star size={16} className="text-amber-400 fill-amber-400" /> 5.0</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span>Gia sư: <span className="text-indigo-600 font-bold">{selectedCourse?.tutor}</span></span>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="flex justify-between text-xs font-bold text-indigo-900">
              <span>Tiến độ tổng quát</span>
              <span>{selectedCourse?.progress}%</span>
            </div>
            <div className="h-2 w-full bg-white rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedCourse?.progress}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <BookOpen size={20} className="text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-800">Lộ trình học & Buổi học thực tế</h3>
            </div>

            {selectedCourse?.status === 'pending' && roadmapDetail && (
               <div className="mb-4 mt-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                 <div className="flex items-center flex-wrap gap-3 mb-1">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      roadmapDetail.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 
                      roadmapDetail.status === 'REVISION_REQUESTED' ? 'bg-amber-100 text-amber-700' :
                      roadmapDetail.status === 'REJECTED' || roadmapDetail.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                      'bg-sky-100 text-sky-700'
                    }`}>
                      Trạng thái: {roadmapDetail.status}
                    </span>
                   {roadmapDetail.status === 'PENDING_APPROVAL' && (
                     <span className="text-xs text-slate-500 font-bold">
                       Đã yêu cầu sửa: <span className={roadmapDetail.revisionCount >= (roadmapDetail.maxRevisionAllowed || 3) ? "text-red-500" : "text-indigo-600"}>{roadmapDetail.revisionCount}/{roadmapDetail.maxRevisionAllowed || 3}</span> lần
                     </span>
                   )}
                 </div>
                 
                 {roadmapDetail.status === 'PENDING_APPROVAL' && (
                   <div className="mt-4 pt-4 border-t border-slate-100">
                     {!showRevisionForm ? (
                       <div className="flex flex-wrap gap-3">
                         <button 
                           onClick={() => handleRoadmapAction('approve')}
                           disabled={isActionLoading}
                           className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl transition-all shadow-sm shadow-emerald-200 active:scale-95 disabled:opacity-50"
                         >
                           Đồng ý Lộ trình
                         </button>
                         <button 
                           onClick={() => setShowRevisionForm(true)}
                           disabled={isActionLoading || roadmapDetail.revisionCount >= (roadmapDetail.maxRevisionAllowed || 3)}
                           className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-black rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                           Yêu cầu chỉnh sửa
                         </button>
                         <button 
                           onClick={() => handleRoadmapAction('cancel')}
                           disabled={isActionLoading}
                           className="px-5 py-2.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-black rounded-xl transition-all active:scale-95 disabled:opacity-50 ml-auto"
                         >
                           Từ chối / Hủy
                         </button>
                       </div>
                     ) : (
                       <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in zoom-in-95 duration-200">
                         <h4 className="text-xs font-black text-slate-700 mb-2 uppercase">Nhập yêu cầu chỉnh sửa</h4>
                         <textarea 
                           value={revisionNote}
                           onChange={(e) => setRevisionNote(e.target.value)}
                           placeholder="Nhập ghi chú chi tiết cho gia sư (ít nhất 10 ký tự)..."
                           className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 min-h-[100px] resize-y transition-all"
                         ></textarea>
                         <div className="flex gap-3">
                           <button 
                             onClick={() => handleRoadmapAction('revision')}
                             disabled={isActionLoading}
                             className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-lg transition-all active:scale-95 disabled:opacity-50"
                           >
                             Gửi yêu cầu
                           </button>
                           <button 
                             onClick={() => {
                               setShowRevisionForm(false);
                               setRevisionNote("");
                             }}
                             disabled={isActionLoading}
                             className="px-4 py-2 bg-white text-slate-500 border border-slate-200 text-xs font-black rounded-lg hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
                           >
                             Hủy bỏ
                           </button>
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </div>
            )}

            {isRoadmapLoading ? (
               <div className="flex justify-center py-8"><div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>
            ) : roadmapModules.length > 0 ? (
               <div className="space-y-6 mt-6">
                 <div>
                   <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Lộ trình chi tiết (Modules)</h4>
                   <div className="space-y-2">
                     {roadmapModules.map(module => (
                        <RoadmapModuleCard key={module.moduleId} module={module} />
                     ))}
                   </div>
                 </div>
                 
                 {(selectedCourse?.status === 'active' || selectedCourse?.status === 'completed') && (
                   <div>
                     <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider mt-8">Các buổi học thực tế</h4>
                     {courseSessions.length > 0 ? (
                        <div className="space-y-2">
                          {courseSessions.map((session) => (
                            <SessionCard 
                              key={session.id} 
                              session={session} 
                              onCheckIn={handleCheckIn} 
                            />
                          ))}
                        </div>
                     ) : (
                        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 text-center space-y-3">
                          <p className="text-slate-800 font-bold">Chưa khởi tạo buổi học</p>
                          <p className="text-slate-400 text-xs">Các buổi học sẽ được hiển thị khi gia sư lên lịch dạy.</p>
                        </div>
                     )}
                   </div>
                 )}
               </div>
            ) : (
              courseSessions.length > 0 ? (
                <div className="space-y-2 mt-6">
                  <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Các buổi học thực tế</h4>
                  {courseSessions.map((session) => (
                    <SessionCard 
                      key={session.id} 
                      session={session} 
                      onCheckIn={handleCheckIn} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 text-center space-y-3 mt-6">
                  <p className="text-slate-800 font-bold">Chưa khởi tạo lộ trình / buổi học</p>
                  <p className="text-slate-400 text-xs">Vui lòng chờ gia sư cập nhật dữ liệu.</p>
                </div>
              )
            )}
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <Timer size={100} className="absolute -right-8 -top-8 opacity-10 group-hover:rotate-12 transition-transform" />
              <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Nhắc nhở học viên</p>
              <h3 className="text-2xl font-black mb-1">Check-in Đúng Hạn</h3>
              <p className="text-xs text-slate-400 mt-2">Đừng quên nhấn nút điểm danh trước giờ học 15 phút để ghi nhận chuyên cần!</p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Tài nguyên khóa học</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-indigo-200 cursor-pointer transition-all">
                  <FileText size={16} className="text-indigo-500" />
                  <span className="text-xs font-bold text-slate-700">Course_Roadmap_Nedu.pdf</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-indigo-200 cursor-pointer transition-all">
                  <LinkIcon size={16} className="text-indigo-500" />
                  <span className="text-xs font-bold text-slate-700">Lop_Hoc_Room.url</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
