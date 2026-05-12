import React from "react";
import {
  Bell,
  Mail,
  Search,
  Edit,
  PlayCircle,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  Table as TableIcon,
  User,
  Calendar,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

export default function TutorClassDetailPage() {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* ── Sidebar ── */}
      <TutorSidebar name="Nguyễn Minh" role="Gia sư Toán" />

      {/* ── Main content ── */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* ── Page Content ── */}
        <main className="p-8 space-y-6 flex-1 bg-slate-50">
          {/* Header Section */}
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-tighter">
                  ĐANG DIỄN RA
                </span>
                <h2 className="text-3xl font-bold text-primary">
                  Toán 12 - Ôn thi THPT
                </h2>
              </div>
              <div className="flex items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  <span className="text-base">
                    Học sinh:{" "}
                    <span className="font-semibold text-slate-900">
                      Lê Văn An
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  <span className="text-base">
                    Lịch học:{" "}
                    <span className="font-semibold text-slate-900">
                      Thứ 2, 4, 6 (19:00 - 21:00)
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                <Edit size={18} />
                Chỉnh sửa thông tin
              </button>
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-sm">
                <PlayCircle size={18} />
                Bắt đầu buổi học
              </button>
            </div>
          </div>

          {/* Bento Grid Content */}
          <div className="grid grid-cols-12 gap-6">
            {/* Lesson History (Left Col - 8 cols) */}
            <div className="col-span-12 xl:col-span-8 space-y-6">
              {/* Progress Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.04)] border border-slate-100">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Số buổi đã dạy
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">24</span>
                    <span className="text-sm text-slate-400">/ 48 buổi</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                    <div className="bg-primary w-1/2 h-full rounded-full"></div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.04)] border border-slate-100">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Điểm kiểm tra TB
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-emerald-600">
                      8.5
                    </span>
                    <span className="text-sm text-slate-400">tăng 1.2</span>
                  </div>
                  <p className="text-sm text-emerald-600 flex items-center gap-1 mt-4 font-medium">
                    <TrendingUp size={16} /> Cải thiện tốt
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.04)] border border-slate-100">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Tỷ lệ chuyên cần
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">
                      96%
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-4">
                    Nghỉ 1 buổi có phép
                  </p>
                </div>
              </div>

              {/* Lesson Log Table */}
              <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.04)] border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">
                    Nhật ký buổi học
                  </h3>
                  <button className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
                    Xem tất cả <ChevronRight size={16} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Ngày
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Nội dung bài học
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Bài tập về nhà
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Đánh giá
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5 align-top">
                          <p className="font-bold text-slate-900">15/10/2023</p>
                          <p className="text-sm text-slate-400">Buổi 24</p>
                        </td>
                        <td className="px-6 py-5 align-top max-w-xs">
                          <p className="font-semibold text-primary mb-1">
                            Ứng dụng tích phân tính diện tích
                          </p>
                          <p className="text-sm text-slate-500">
                            Giải các bài toán hình phẳng phức tạp, đồ thị chứa
                            dấu trị tuyệt đối.
                          </p>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle
                              size={16}
                              className="text-emerald-500 fill-emerald-100"
                            />
                            <span className="text-sm text-slate-900 font-medium">
                              Bài tập SGK + 20 câu trắc nghiệm
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 ml-6 italic">
                            Hoàn thành: 100%
                          </p>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                            Tích cực
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5 align-top">
                          <p className="font-bold text-slate-900">13/10/2023</p>
                          <p className="text-sm text-slate-400">Buổi 23</p>
                        </td>
                        <td className="px-6 py-5 align-top max-w-xs">
                          <p className="font-semibold text-primary mb-1">
                            Tích phân từng phần (Nâng cao)
                          </p>
                          <p className="text-sm text-slate-500">
                            Phương pháp sơ đồ đường chéo cho các hàm đa thức kết
                            hợp mũ/log.
                          </p>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle
                              size={16}
                              className="text-orange-500 fill-orange-100"
                            />
                            <span className="text-sm text-slate-900 font-medium">
                              Đề luyện tập số 5
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 ml-6 italic">
                            Chưa hoàn thành câu 45-50
                          </p>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                            Cần tập trung
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Documents & Progress (Right Col - 4 cols) */}
            <div className="col-span-12 xl:col-span-4 space-y-6">
              {/* Progress Chart Placeholder */}
              <div className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.04)] border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Theo dõi tiến độ
                </h3>
                <div className="aspect-square w-full bg-slate-50 rounded-lg relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="flex items-end justify-between h-3/4 gap-2">
                      <div className="w-full bg-blue-200 rounded-t-sm h-[40%]"></div>
                      <div className="w-full bg-blue-300 rounded-t-sm h-[55%]"></div>
                      <div className="w-full bg-blue-400 rounded-t-sm h-[70%]"></div>
                      <div className="w-full bg-primary rounded-t-sm h-[85%]"></div>
                      <div className="w-full bg-primary rounded-t-sm h-[75%]"></div>
                      <div className="w-full bg-primary rounded-t-sm h-[95%]"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-400 font-bold">
                      <span>T8</span>
                      <span>T9</span>
                      <span>T10</span>
                      <span>T11</span>
                      <span>T12</span>
                      <span>T1</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600 font-medium">
                        Kiến thức nền tảng
                      </span>
                      <span className="font-bold text-primary">90%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full">
                      <div className="bg-primary w-[90%] h-full rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600 font-medium">
                        Tốc độ làm bài
                      </span>
                      <span className="font-bold text-emerald-600">75%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full">
                      <div className="bg-emerald-500 w-[75%] h-full rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Management */}
              <div className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.04)] border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    Tài liệu học tập
                  </h3>
                  <button className="w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Upload size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3 group cursor-pointer hover:border-primary transition-all">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-sm text-slate-900 truncate">
                        Chuyên đề Tích phân 2024.pdf
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        2.4 MB • 2 ngày trước
                      </p>
                    </div>
                    <button className="text-slate-400 group-hover:text-primary transition-colors">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3 group cursor-pointer hover:border-primary transition-all">
                    <div className="w-10 h-10 bg-blue-100 text-primary rounded flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-sm text-slate-900 truncate">
                        Đề ôn tập giữa kỳ 1.docx
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        1.1 MB • 1 tuần trước
                      </p>
                    </div>
                    <button className="text-slate-400 group-hover:text-primary transition-colors">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3 group cursor-pointer hover:border-primary transition-all">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded flex items-center justify-center shrink-0">
                      <TableIcon size={20} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-sm text-slate-900 truncate">
                        Bảng công thức Đạo hàm.xlsx
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        850 KB • 3 tuần trước
                      </p>
                    </div>
                    <button className="text-slate-400 group-hover:text-primary transition-colors">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 text-primary font-semibold text-sm border border-primary/20 rounded-lg hover:bg-blue-50 transition-colors">
                  Xem tất cả tài liệu (12)
                </button>
              </div>

              {/* Quick Assessment Action */}
              <div className="bg-primary p-6 rounded-xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Đánh giá định kỳ
                  </h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Bạn đã dạy được 50% lộ trình. Hãy thực hiện đánh giá năng
                    lực tháng này cho An.
                  </p>
                  <button className="w-full bg-white text-primary py-2.5 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm">
                    Tạo phiếu đánh giá
                  </button>
                </div>
                {/* Background decoration */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -left-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
