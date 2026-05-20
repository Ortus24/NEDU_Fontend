import React, { useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Star, Check, TrendingUp, GraduationCap, MessageCircle, BookOpen, Clock, Video, History, Briefcase, Globe, Loader2 } from "lucide-react";

export default function TrialBookingGoalsPage() {
  const { tutorId } = useParams<{ tutorId: string }>();
  const [searchParams] = useSearchParams();
  const slotId = searchParams.get("slotId");
  const navigate = useNavigate();

  const [level, setLevel] = useState<string>("Cơ bản");
  const [goals, setGoals] = useState<string[]>(["Luyện thi chứng chỉ"]);
  const [expectedSessions, setExpectedSessions] = useState<number>(10);
  const [noteToTutor, setNoteToTutor] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleContinue = async () => {
    if (!slotId) {
      alert("Vui lòng chọn khung giờ học thử trước khi tiếp tục!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/bookings/trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tutorId,
          // Use a dummy studentId since auth is not integrated yet
          studentId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
          availabilitySlotId: slotId,
          studentScore: level,
          studentGoal: goals.join(", "),
          expectedSessions,
          noteToTutor,
        }),
      });

      if (response.ok) {
        navigate(`/book-trial/${tutorId}/success`);
      } else {
        const data = await response.json();
        alert(data.message || "Đã xảy ra lỗi khi tạo lịch học thử.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Không thể kết nối đến server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full">
      {/* Left Sidebar: Progress & Tutor Info */}
      <aside className="lg:col-span-4 flex flex-col gap-6">
        {/* Tutor Mini-Profile */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <img
              alt="Tutor Profile"
              className="h-20 w-20 rounded-xl object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL9LAG2N3UjPhV1nTtUZc-sAkyUrprCnOBdI0eZU_D0plhEyU-jAftXZFz1C5QDEpUul6G5E6lKEuBcQixhVj-xFTxFjwM-yy1p1z6FLcs-lVSdK1JM9LyTgZH0TaCxrggxvdNTOy-OxLQtiQnoOjmrACd4mydt917-MfV8mxZBy9Qqy8GICvQVSdvbdS-NyYq3tsgmhXfjvGdTCBUo2u_uHIkBSWbP05LQprN-zT9FMQNXE6gaBa9XNvZFRDJxfBJt9q6Zp3GUT1o"
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Cô Minh Anh</h2>
              <div className="flex items-center gap-1 text-amber-500 mt-1">
                <Star size={16} className="fill-amber-500 text-amber-500" />
                <span className="text-sm font-medium text-slate-700">4.9 (124 đánh giá)</span>
              </div>
              <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                IELTS Specialist
              </span>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-500 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <History size={18} className="text-indigo-500" />
              <span>8.5 IELTS Overall (Speaking 9.0)</span>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase size={18} className="text-indigo-500" />
              <span>5 năm kinh nghiệm giảng dạy</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-indigo-500" />
              <span>Tiếng Việt, Tiếng Anh</span>
            </div>
          </div>
        </div>

        {/* Flow Indicators */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              <Check size={16} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-indigo-600">Chọn Lịch Hẹn</span>
              <span className="text-xs text-slate-500">Ngày & Giờ phù hợp</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-indigo-600">Mục Tiêu Học Tập</span>
              <span className="text-xs text-slate-500">Thông tin bổ trợ cho gia sư</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Xác Nhận</span>
              <span className="text-xs text-slate-500">Kiểm tra & Gửi yêu cầu</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Central Content Area: Learning Goals Form */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Mục tiêu Học tập</h1>
            <p className="text-base text-slate-500">
              Hãy chia sẻ mục tiêu của bạn để gia sư chuẩn bị buổi học tốt nhất.
            </p>
          </header>

          <div className="flex flex-col gap-10">
            {/* Field 1: Trình độ hiện tại */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-slate-900">Trình độ hiện tại của bạn là gì?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Mất gốc", "Cơ bản", "Khá", "Giỏi"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`py-3 px-6 rounded-xl border text-center text-sm font-medium transition-all active:scale-95 ${
                      level === lvl
                        ? "border-2 border-indigo-600 bg-indigo-50 text-indigo-700 font-bold"
                        : "border-slate-200 text-slate-500 hover:border-indigo-600 hover:bg-indigo-50/50"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: Mục tiêu cụ thể */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-slate-900">Bạn mong muốn đạt được điều gì? (Chọn nhiều mục)</label>
              <div className="flex flex-wrap gap-4">
                {[
                  { id: "Cải thiện điểm số", icon: TrendingUp },
                  { id: "Luyện thi chứng chỉ", icon: GraduationCap },
                  { id: "Giao tiếp tự tin", icon: MessageCircle },
                  { id: "Phụ đạo kiến thức mới", icon: BookOpen },
                ].map(({ id, icon: Icon }) => {
                  const isActive = goals.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleGoal(id)}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer border transition-colors ${
                        isActive
                          ? "bg-indigo-100 text-indigo-700 border-indigo-600"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:border-indigo-600"
                      }`}
                    >
                      <Icon size={18} />
                      {id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3: Số buổi dự kiến */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-slate-900">Số buổi dự kiến muốn học</label>
              <input
                type="number"
                min="1"
                value={expectedSessions}
                onChange={(e) => setExpectedSessions(Number(e.target.value))}
                className="w-full md:w-1/3 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-base text-slate-900"
                placeholder="Ví dụ: 10"
              />
            </div>

            {/* Field 4: Ghi chú thêm */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-slate-900">Ghi chú thêm cho gia sư</label>
              <textarea
                value={noteToTutor}
                onChange={(e) => setNoteToTutor(e.target.value)}
                className="w-full min-h-[160px] p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-base text-slate-900 placeholder:text-slate-400"
                placeholder="Ví dụ: Em muốn tập trung vào kỹ năng Speaking, đặc biệt là phần phát âm và nối âm trong các đoạn hội thoại hàng ngày..."
              ></textarea>
            </div>
          </div>

          {/* Bottom Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 border-t border-slate-200 pt-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Thời lượng</p>
                <p className="text-base font-bold text-slate-900">45 phút / buổi học thử</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Video size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Hình thức</p>
                <p className="text-base font-bold text-slate-900">Học trực tuyến (Google Meet)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-between items-center py-4">
          <Link
            to={`/book-trial/${tutorId}`}
            className="px-8 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition-colors active:scale-95"
          >
            Quay lại
          </Link>
          <button 
            onClick={handleContinue}
            disabled={isSubmitting}
            className={`px-10 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isSubmitting 
                ? "bg-indigo-400 text-white cursor-not-allowed shadow-none" 
                : "bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            Xác nhận Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
