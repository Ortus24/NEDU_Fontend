import React, { useState } from "react";
import {
  Timer,
  CheckCircle2,
  MessageSquare,
  UserCheck,
  Video,
  Paperclip,
  Lock,
  FileText,
  Link as LinkIcon,
  Star,
  Headphones,
  FolderOpen,
  DollarSign,
  Calendar,
  BookOpen,
  ClipboardCheck,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Search,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Types & Mock Data ───────────────────────────────────────────────────────

interface Course {
  id: number;
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
  roadmapStatus?: "SENT" | "REVISION_REQUESTED" | "APPROVED";
  trialStatus?: "PENDING" | "CONFIRMED" | "REJECTED";
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Thiết kế UI/UX Chuyên nghiệp với Figma",
    tutor: "Nguyễn Minh Anh",
    progress: 42,
    totalSessions: 12,
    completedSessions: 5,
    nextSession: "14/10 - 19:00",
    category: "Design",
    escrowStatus: "An toàn",
    status: "active"
  },
  {
    id: 2,
    title: "Tiếng Anh IELTS Cấp tốc (Target 7.5)",
    tutor: "Lê Thanh Tùng",
    progress: 100,
    totalSessions: 20,
    completedSessions: 20,
    nextSession: "Đã kết thúc",
    category: "Language",
    escrowStatus: "Đã giải ngân",
    status: "completed",
    endDate: "05/05/2026",
    result: "Đạt mục tiêu Target 7.5"
  },
  {
    id: 3,
    title: "Toán học Nâng cao - Ôn thi THPT Quốc gia",
    tutor: "Thầy Minh Hoàng",
    progress: 0,
    totalSessions: 24,
    completedSessions: 0,
    nextSession: "Chưa bắt đầu",
    category: "Academic",
    escrowStatus: "Chờ thanh toán",
    status: "pending",
    totalPrice: "4.800.000 VNĐ",
    roadmapStatus: "SENT"
  },
  {
    id: 4,
    title: "Toán 11: Hình học không gian",
    tutor: "Thầy Trần Minh",
    progress: 20,
    totalSessions: 10,
    completedSessions: 2,
    nextSession: "Ngày mai - 18:00",
    category: "TOÁN HỌC",
    escrowStatus: "An toàn",
    status: "active"
  },
  {
    id: 5,
    title: "Hóa hữu cơ lớp 12",
    tutor: "Cô Hà Phương",
    progress: 0,
    totalSessions: 15,
    completedSessions: 0,
    nextSession: "Chưa bắt đầu",
    category: "HÓA HỌC",
    escrowStatus: "An toàn",
    status: "active"
  },
  {
    id: 6,
    title: "Vật lý 12: Luyện thi THPT QG",
    tutor: "Thầy Phan Khoa",
    progress: 0,
    totalSessions: 20,
    completedSessions: 0,
    nextSession: "Chưa bắt đầu",
    category: "VẬT LÝ",
    escrowStatus: "Chờ thanh toán",
    status: "pending",
    totalPrice: "5.000.000 VNĐ",
    roadmapStatus: "APPROVED"
  },
  {
    id: 7,
    title: "Buổi học thử: Lấy lại gốc Toán hình",
    tutor: "Cô Hà Linh",
    progress: 0,
    totalSessions: 1,
    completedSessions: 0,
    nextSession: "Thứ Hai tới - 14:00",
    category: "HỌC THỬ",
    escrowStatus: "",
    status: "trial",
    trialStatus: "PENDING"
  },
  {
    id: 8,
    title: "Buổi học thử: Luyện thi IELTS Speaking",
    tutor: "Thầy Minh Đức",
    progress: 0,
    totalSessions: 1,
    completedSessions: 0,
    nextSession: "Ngày mai - 19:30",
    category: "HỌC THỬ",
    escrowStatus: "",
    status: "trial",
    trialStatus: "CONFIRMED"
  }
];

// ─── Session Card Component (Dùng cho trang Chi tiết) ─────────────────────────

interface SessionCardProps {
  status: "completed" | "active" | "locked" | "rescheduled";
  number: string;
  date: string;
  title: string;
  description: string;
  time?: string;
  prepMaterial?: string;
  homework?: string;
  escrowStatus?: "pending" | "released";
  isCheckIn?: boolean;
}

function SessionCard({ status, number, date, title, description, time, prepMaterial, homework, escrowStatus, isCheckIn }: SessionCardProps) {
  const isCompleted = status === "completed";
  const isActive = status === "active";
  const isLocked = status === "locked";
  const isRescheduled = status === "rescheduled";

  return (
    <div className="relative pl-8 md:pl-10 pb-10">
      <div className={`absolute left-0 top-0 h-full w-[2px] ${isLocked ? "bg-slate-200" : "bg-indigo-500/20"}`}></div>
      <div className={`absolute left-[-9px] top-0 h-5 w-5 rounded-full bg-white border-2 flex items-center justify-center z-10 ${isCompleted ? "border-emerald-500" : isActive ? "border-indigo-500" : "border-slate-300"
        }`}>
        {isCompleted && <CheckCircle2 size={12} className="text-emerald-600 fill-emerald-50" />}
        {isActive && <div className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />}
        {isLocked && <Lock size={10} className="text-slate-400" />}
      </div>

      <div className={`rounded-2xl p-5 bg-white border ${isActive ? "border-indigo-500 shadow-md ring-2 ring-indigo-50" : "border-slate-200"
        } ${isLocked ? "opacity-60" : ""}`}>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${isCompleted ? "bg-emerald-100 text-emerald-700" : isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                {isCompleted ? "Xong" : isActive ? "Đang diễn ra" : `Buổi ${number}`}
              </span>
              <span className="text-xs text-slate-400 font-bold">{date} {time && `- ${time}`}</span>
            </div>
            <h4 className="font-bold text-slate-800">{title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
          </div>
          {isActive && (
            <button
              onClick={(e) => { e.stopPropagation(); window.location.href = "/classroom"; }}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg self-start hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
            >
              Vào lớp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CoursePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "pending" | "trial">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const selectedCourse = mockCourses.find(c => c.id === selectedCourseId);

  // Logic lọc khóa học
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tutor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = course.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // 1. Giao diện Danh sách Khóa học
  if (!selectedCourseId) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Khóa học của tôi</h1>
            <p className="text-slate-500 mt-1.5 text-sm md:text-base">Quản lý và theo dõi tiến độ các khóa học đã đăng ký.</p>
          </div>
          <div className="h-12 w-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
            <GraduationCap size={28} />
          </div>
        </div>

        {/* Navigation Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200">
          <div className="flex items-center gap-8">
            {[
              { id: "active", label: "Đang học" },
              { id: "completed", label: "Đã hoàn thành" },
              { id: "pending", label: "Đang chờ duyệt lộ trình" },
              { id: "trial", label: "Học thử" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab.id
                  ? "text-indigo-600"
                  : "text-slate-400 hover:text-slate-600"
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
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer group flex flex-col xl:flex-row"
              >
                <div className="w-full xl:w-48 h-48 xl:h-auto relative shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={course.id === 1 ? "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop" : "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop"}
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
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${course.roadmapStatus === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'
                          }`}>
                          {course.roadmapStatus === 'APPROVED' ? 'Đã duyệt' : 'Chờ xử lý'}
                        </span>
                      </div>
                    ) : course.status === 'trial' ? (
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        {course.trialStatus === 'CONFIRMED' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">Đã xác nhận</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700">Chờ gia sư</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-amber-500">VIP</span>
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
                      <span className={`text-xs font-bold ${course.status === 'completed' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                        {course.status === 'pending' ? `${course.totalSessions} bài dự kiến` : `${course.completedSessions}/${course.totalSessions} bài học`}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full mb-4 overflow-hidden">
                      <div className={`h-full ${course.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-600'} rounded-full`} style={{ width: `${course.progress}%` }}></div>
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
                        className={`w-full py-2.5 px-4 text-white rounded-xl font-bold active:scale-[0.98] transition-all flex justify-center items-center gap-2 text-sm shadow-md ${course.roadmapStatus === 'APPROVED' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 'bg-sky-500 hover:bg-sky-600 shadow-sky-200'}`}
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
                          Vào phòng học ảo
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
                <p className="text-slate-400 text-sm">Thử thay đổi từ khóa tìm kiếm của bạn xem sao.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. Giao diện Chi tiết Khóa học
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <button
        onClick={() => setSelectedCourseId(null)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Quay lại danh sách
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-[10px] font-black uppercase tracking-widest">Enrollment Active</span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{selectedCourse?.title}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><Star size={16} className="text-amber-400 fill-amber-400" /> 4.9</span>
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
              <h3 className="text-lg font-bold text-slate-800">Lộ trình và Các buổi học</h3>
            </div>

            <div className="space-y-2">
              <SessionCard status="completed" number="04" date="07/10/2023" title="Bố cục và Lưới (Grids)" description="Học cách sử dụng Layout Grid chuyên nghiệp." escrowStatus="released" />
              <SessionCard status="completed" number="05" date="10/10/2023" title="Giới thiệu Figma" description="Làm quen với Layers và Vectors." escrowStatus="released" />
              <SessionCard status="active" number="06" date="Hôm nay" time="19:00" title="Typography & Color Theory" description="Xây dựng hệ thống màu sắc cho Brand." isCheckIn={false} />
              <SessionCard status="locked" number="07" date="17/10/2023" title="Auto Layout" description="Kỹ thuật thiết kế linh hoạt." />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <Timer size={100} className="absolute -right-8 -top-8 opacity-10 group-hover:rotate-12 transition-transform" />
              <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Đếm ngược buổi tới</p>
              <h3 className="text-3xl font-black mb-1">02d : 14h</h3>
              <p className="text-xs text-slate-400 mt-2">Đừng quên check-in trước 15p!</p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Tài nguyên khóa học</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-indigo-200 cursor-pointer transition-all">
                  <FileText size={16} className="text-indigo-500" />
                  <span className="text-xs font-bold text-slate-700">Course_Roadmap.pdf</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-indigo-200 cursor-pointer transition-all">
                  <LinkIcon size={16} className="text-indigo-500" />
                  <span className="text-xs font-bold text-slate-700">Figma_Resource.url</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
