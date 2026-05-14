import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Timer, 
  MessageSquare, 
  FileText, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Edit3, 
  Info 
} from "lucide-react";

export default function RoadmapDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-right-4 duration-500">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link 
          to="/courses" 
          className="flex items-center gap-2 text-indigo-600 font-medium hover:-translate-x-1 transition-transform w-fit"
        >
          <ArrowLeft size={20} />
          Quay lại danh sách
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 font-medium text-sm rounded-lg mb-3">
                  <Timer size={16} />
                  Đang chờ duyệt
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  Toán học Nâng cao - Ôn thi THPT Quốc gia
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <img 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" 
                alt="Tutor avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoOAQx0KWqwdOVH1pBLlyoWZaQfaFG2UiAqlWNRUvy2Ftd1kxmzhsAlYQZO6DZXf9GrJpnTd59CGgHMyBPTAZFQBIr6b1cvqB367aYtKj0Q1zbzNUFqYj12GehUhvyYdEU08wSnTg_qhmvfwarLOFYZNwZZ38HykY6V7jcVSRXGPzFuKR7fA8BmrUdk1DoMOwxsXRem7uDJcX8gAUtY2Uv-Na-CNCvxUQ0ZJ-3se9wCIx0XYclFAWZJyOUNz2QCSg6-IMt72WCTuRi"
              />
              <div>
                <p className="text-sm text-slate-500 mb-0.5">Gia sư trực tiếp</p>
                <h3 className="text-base font-bold text-slate-900">Thầy Minh Hoàng</h3>
                <p className="text-sm font-medium text-indigo-600">Chuyên gia luyện thi khối A1/D</p>
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
            <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 text-slate-900">
              <FileText className="text-indigo-600" size={28} />
              Lộ trình chi tiết
            </h2>
            
            <div className="space-y-10 relative">
              {/* Vertical line connector */}
              <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>

              {/* Module 1 */}
              <div className="relative pl-14">
                <div className="absolute left-0 top-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white z-10 shadow-lg">
                  <span className="font-bold">1</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-slate-900">Chương 1: Đạo hàm và ứng dụng</h4>
                    <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-bold">6 buổi</span>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Nắm vững các quy tắc tính đạo hàm cấp 1, cấp 2 và ứng dụng đạo hàm để khảo sát sự biến thiên của hàm số. Trọng tâm vào các bài toán cực trị và tiệm cận thường gặp trong đề thi chính thức.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium border border-slate-200">Video bài giảng</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium border border-slate-200">Bài tập tự luyện</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium border border-slate-200">Quiz đánh giá</span>
                  </div>
                </div>
              </div>

              {/* Module 2 */}
              <div className="relative pl-14">
                <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center text-indigo-600 z-10 shadow-sm">
                  <span className="font-bold">2</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-slate-900">Chương 2: Hàm số Lũy thừa, Mũ & Logarit</h4>
                    <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-bold">8 buổi</span>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Tìm hiểu các công thức biến đổi logarit, giải phương trình và bất phương trình mũ. Ứng dụng thực tế của hàm số mũ trong các bài toán tăng trưởng và lãi suất ngân hàng.
                  </p>
                </div>
              </div>

              {/* Module 3 */}
              <div className="relative pl-14">
                <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center text-indigo-600 z-10 shadow-sm">
                  <span className="font-bold">3</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-slate-900">Chương 3: Nguyên hàm & Tích phân</h4>
                    <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-bold">10 buổi</span>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Hệ thống hóa bảng nguyên hàm cơ bản, các phương pháp tính tích phân (từng phần, đổi biến số). Ứng dụng tích phân tính diện tích hình phẳng và thể tích khối tròn xoay.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Sticky Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Tóm tắt lộ trình</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={20} />
                  <span className="text-base font-medium">Thời lượng dự kiến</span>
                </div>
                <span className="font-bold text-slate-900">3 tháng</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <BookOpen size={20} />
                  <span className="text-base font-medium">Tổng số buổi</span>
                </div>
                <span className="font-bold text-slate-900">24 buổi</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <ShieldCheck size={20} />
                  <span className="text-base font-medium">Cam kết đầu ra</span>
                </div>
                <span className="font-bold text-slate-900">9.0+</span>
              </div>
            </div>

            <div className="bg-indigo-50/50 p-6 rounded-xl mb-8 border border-indigo-100">
              <p className="text-sm font-bold text-indigo-600 mb-1">Tổng chi phí</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-indigo-700">1.200.000</span>
                <span className="text-xl font-bold text-indigo-700">đ</span>
              </div>
              <p className="text-xs font-medium text-slate-500 mt-2 italic">* Đã bao gồm tài liệu học tập độc quyền</p>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate('/payment')}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200"
              >
                <CheckCircle2 size={20} />
                Xác nhận & Thanh toán
              </button>
              <button className="w-full py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all">
                <Edit3 size={20} />
                Yêu cầu chỉnh sửa
              </button>
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl flex items-start gap-3 border border-amber-100">
              <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-amber-800 leading-relaxed">
                Bạn có 48 giờ để xác nhận lộ trình này. Sau thời gian này, lịch dạy của gia sư có thể thay đổi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
