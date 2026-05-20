import React, { useState, useEffect } from "react";
import { Star, History, Briefcase, Globe, Calendar, List, HelpCircle, Clock, Video, ArrowRight } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface AvailabilitySlot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface TutorDetail {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  location: string;
  subjects: string[];
  description: string;
  experienceYears: number;
  pricePerSession: number;
  availableDays: string[];
  availabilitySlots: AvailabilitySlot[];
}

export default function TrialBookingPage() {
  const { tutorId } = useParams<{ tutorId: string }>();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<TutorDetail | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId] = useState(() => localStorage.getItem("userId") || "11111111-1111-1111-1111-111111111111");
  const [hasBookedTrial, setHasBookedTrial] = useState(false);

  useEffect(() => {
    const fetchTutorAndBookings = async () => {
      try {
        const [resTutor, resBookings] = await Promise.all([
          fetch(`http://localhost:8080/api/v1/tutors/${tutorId}`),
          fetch(`http://localhost:8080/api/v1/bookings/my-bookings?userId=${userId}`)
        ]);

        if (resTutor.ok) {
          const json = await resTutor.json();
          setTutor(json.data);
        }

        if (resBookings.ok) {
          const bookingsJson = await resBookings.json();
          const bookings = bookingsJson.data || [];
          // Check if there is already a booking for this tutor (assuming tutorId is returned)
          // If the backend doesn't return tutorId directly, we might check by tutorName. Let's check both to be safe.
          const alreadyBooked = bookings.some((b: any) => b.tutorId === tutorId);
          setHasBookedTrial(alreadyBooked);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin gia sư:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (tutorId) {
      fetchTutorAndBookings();
    }
  }, [tutorId, userId]);

  const handleContinue = () => {
    if (selectedSlotId) {
      navigate(`/book-trial/${tutorId}/goals?slotId=${selectedSlotId}`);
    }
  };

  const daysOfWeek = [
    { label: "Th 2", value: "T2" },
    { label: "Th 3", value: "T3" },
    { label: "Th 4", value: "T4" },
    { label: "Th 5", value: "T5" },
    { label: "Th 6", value: "T6" },
    { label: "Th 7", value: "T7" },
    { label: "CN", value: "CN" },
  ];

  if (isLoading) {
    return <div className="text-center p-8 text-slate-500">Đang tải thông tin gia sư...</div>;
  }

  if (!tutor) {
    return <div className="text-center p-8 text-red-500">Không tìm thấy thông tin gia sư.</div>;
  }

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
              src={tutor.avatar || "https://via.placeholder.com/150"}
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{tutor.name}</h2>
              <div className="flex items-center gap-1 text-amber-500 mt-1">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-medium text-slate-700">{tutor.rating} ({tutor.reviewsCount} đánh giá)</span>
              </div>
              {tutor.subjects.length > 0 && (
                <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                  {tutor.subjects[0]}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-500 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <Briefcase size={18} className="text-indigo-500" />
              <span>{tutor.experienceYears} năm kinh nghiệm</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-indigo-500" />
              <span>{tutor.location}</span>
            </div>
          </div>
        </div>

        {/* Flow Indicators */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-indigo-600">Chọn Lịch Hẹn</span>
              <span className="text-xs text-slate-500">Ngày &amp; Giờ phù hợp</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Mục Tiêu Học Tập</span>
              <span className="text-xs text-slate-500">Thông tin bổ trợ cho gia sư</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Xác Nhận</span>
              <span className="text-xs text-slate-500">Kiểm tra &amp; Gửi yêu cầu</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area: Booking Step 1 */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start md:items-center mb-8 flex-col md:flex-row gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-slate-900">Đăng ký học thử</h1>
              <p className="text-base text-slate-500">Vui lòng chọn thời gian bạn muốn bắt đầu buổi trải nghiệm.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 shrink-0">
              <button className="p-2 bg-white shadow-sm rounded-md text-slate-700">
                <Calendar size={20} />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-700">
                <List size={20} />
              </button>
            </div>
          </div>

          {hasBookedTrial ? (
            <div className="text-center py-12 bg-indigo-50 border border-indigo-100 rounded-xl">
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Bạn đã đăng ký học thử với gia sư này</h3>
              <p className="text-sm text-indigo-700 mb-6">Mỗi học sinh chỉ được đăng ký học thử 1 lần với mỗi gia sư.</p>
              <button 
                onClick={() => navigate("/courses")}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors"
              >
                Quản lý khóa học của tôi
              </button>
            </div>
          ) : (
            <>
              {/* Weekly Calendar View */}
              <div className="-mx-8 px-8 md:mx-0 md:px-0 overflow-x-auto pb-4">
            <div className="grid grid-cols-7 gap-2 border-t border-slate-100 pt-8 min-w-[600px] md:min-w-0">
              {/* Week Header */}
              {daysOfWeek.map((d, i) => {
                const isActive = tutor.availableDays.includes(d.value);
                return (
                  <div
                    key={i}
                    className={`text-center pb-4 border-b-2 ${
                      isActive ? "border-indigo-600" : "border-transparent border-b-slate-50"
                    }`}
                  >
                    <span
                      className={`block text-xs uppercase tracking-wider font-bold mb-1 ${
                        isActive ? "text-indigo-600" : "text-slate-400"
                      }`}
                    >
                      {d.label}
                    </span>
                  </div>
                );
              })}

              {/* Availability Slots */}
              {daysOfWeek.map((day) => {
                const slotsForDay = tutor.availabilitySlots.filter(s => s.dayOfWeek === day.value);
                return (
                  <div key={day.value} className="flex flex-col gap-2 pt-4">
                    {slotsForDay.length > 0 ? (
                      slotsForDay.map(slot => {
                        const isSelected = selectedSlotId === slot.id;
                        return (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlotId(slot.id)}
                            className={`w-full py-2 px-1 text-xs rounded-lg font-medium transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white font-bold ring-2 ring-indigo-600 ring-offset-2"
                                : "border border-indigo-100 text-indigo-600 hover:bg-indigo-50"
                            }`}
                          >
                            {slot.startTime.substring(0, 5)}
                          </button>
                        );
                      })
                    ) : (
                      <div className="w-full py-2 px-1 text-xs border border-slate-100 rounded-lg text-slate-400 cursor-not-allowed bg-slate-50 text-center">
                        Nghỉ
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500">
              <Globe size={18} />
              <span className="text-sm">Múi giờ: Vietnam (GMT+7)</span>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={() => navigate(-1)}
                className="flex-1 md:flex-none px-6 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handleContinue}
                disabled={!selectedSlotId}
                className={`flex-1 md:flex-none px-8 py-2 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                  selectedSlotId 
                    ? "bg-indigo-600 text-white shadow-indigo-200 hover:opacity-90" 
                    : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                }`}
              >
                Tiếp tục
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          </>
          )}
        </div>

        {/* Information Cards: Asymmetric Bento Grid Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 rounded-xl flex items-start gap-4 shadow-sm">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Thời lượng</h4>
              <p className="text-sm text-slate-500">Buổi học thử kéo dài 45 phút bao gồm kiểm tra trình độ và tư vấn lộ trình.</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 rounded-xl flex items-start gap-4 shadow-sm">
            <div className="bg-sky-100 p-3 rounded-lg text-sky-600 shrink-0">
              <Video size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Hình thức</h4>
              <p className="text-sm text-slate-500">Trực tuyến qua nền tảng NEDU Classroom với bảng trắng tương tác.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAB for Support */}
      <button className="fixed bottom-8 right-8 bg-white border border-slate-200 shadow-xl p-4 rounded-full flex items-center gap-2 hover:scale-105 transition-transform z-50">
        <HelpCircle size={20} className="text-indigo-600" />
        <span className="font-bold text-sm text-slate-900 pr-1">Hỗ trợ</span>
      </button>
    </div>
  );
}
