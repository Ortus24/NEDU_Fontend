import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Briefcase, Globe, MessageCircle, ArrowRight, Loader2, Calendar, User, Quote } from "lucide-react";

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
  availabilitySlots: {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
}

interface Review {
  id: string;
  enrollmentId?: string;
  trialBookingId?: string;
  rating: number;
  comment: string;
  isPublic: boolean;
  studentName?: string;
  createdAt: string;
}

interface TutorReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: number[];
  reviews: Review[];
}

export default function TutorDetailPage() {
  const { tutorId } = useParams<{ tutorId: string }>();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState<TutorDetail | null>(null);
  const [reviewSummary, setReviewSummary] = useState<TutorReviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [resTutor, resReviews] = await Promise.all([
          fetch(`http://localhost:8080/api/v1/tutors/${tutorId}`),
          fetch(`http://localhost:8080/api/v1/student/reviews/tutor/${tutorId}`)
        ]);

        if (resTutor.ok) {
          const json = await resTutor.json();
          setTutor(json.data);
        }

        if (resReviews.ok) {
          const json = await resReviews.json();
          setReviewSummary(json.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin gia sư:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (tutorId) {
      fetchData();
    }
  }, [tutorId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  if (!tutor) {
    return <div className="text-center p-8 text-red-500 font-bold">Không tìm thấy thông tin gia sư.</div>;
  }

  const daysOfWeek = [
    { label: "Th 2", value: "T2" },
    { label: "Th 3", value: "T3" },
    { label: "Th 4", value: "T4" },
    { label: "Th 5", value: "T5" },
    { label: "Th 6", value: "T6" },
    { label: "Th 7", value: "T7" },
    { label: "CN", value: "CN" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full pb-20">
      {/* Left / Main Content */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        
        {/* Header Profile Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <img
            alt="Tutor Profile"
            className="w-32 h-32 rounded-2xl object-cover shadow-md"
            src={tutor.avatar || "https://via.placeholder.com/150"}
          />
          <div className="flex-1">
            <h1 className="text-3xl font-black text-slate-900 mb-2">{tutor.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 mb-4">
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
                <Star size={16} className="fill-amber-500 text-amber-500" />
                <span className="font-bold">{tutor.rating.toFixed(1)}</span>
                <span className="opacity-80">({tutor.reviewsCount} đánh giá)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-slate-400" />
                {tutor.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={16} className="text-slate-400" />
                {tutor.experienceYears} năm kinh nghiệm
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map(sub => (
                <span key={sub} className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Giới thiệu */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <User size={24} className="text-indigo-600" />
            Giới thiệu về tôi
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap">
            {tutor.description || "Gia sư chưa cập nhật phần giới thiệu chi tiết."}
          </div>
        </div>

        {/* Đánh giá học viên */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <MessageCircle size={24} className="text-indigo-600" />
            Đánh giá từ Học viên
          </h2>

          {reviewSummary && reviewSummary.totalReviews > 0 ? (
            <div className="flex flex-col gap-8">
              {/* Summary Stats */}
              <div className="flex flex-col sm:flex-row gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex flex-col items-center justify-center min-w-[120px]">
                  <h3 className="text-5xl font-black text-slate-900">{reviewSummary.averageRating.toFixed(1)}</h3>
                  <div className="flex gap-1 text-amber-400 my-2">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={16} className={s <= Math.round(reviewSummary.averageRating) ? "fill-amber-400" : "text-slate-300"} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-500">{reviewSummary.totalReviews} đánh giá</span>
                </div>
                
                <div className="flex-1 w-full space-y-2">
                  {[5,4,3,2,1].map((stars, idx) => {
                    const count = reviewSummary.ratingDistribution[stars - 1] || 0;
                    const percent = reviewSummary.totalReviews > 0 ? (count / reviewSummary.totalReviews) * 100 : 0;
                    return (
                      <div key={stars} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <span className="w-8 text-right">{stars} sao</span>
                        <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>
                        <span className="w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {reviewSummary.reviews.map(review => (
                  <div key={review.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {review.isPublic && review.studentName ? review.studentName.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {review.isPublic ? review.studentName : "Học viên ẩn danh"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={14} className={s <= review.rating ? "fill-amber-400" : "text-slate-300"} />
                        ))}
                      </div>
                    </div>
                    <div className="relative pl-4">
                      <Quote size={20} className="absolute left-0 top-0 text-slate-200 -translate-x-2 -translate-y-1 transform rotate-180" />
                      <p className="text-slate-700 italic text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              Chưa có đánh giá nào cho gia sư này.
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="lg:col-span-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
          <div className="mb-6 pb-6 border-b border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Học phí dự kiến</p>
            <p className="text-4xl font-black text-indigo-600">{tutor.pricePerSession}k <span className="text-lg text-slate-400 font-medium">/ buổi</span></p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-indigo-600" />
              Lịch trống trong tuần
            </h3>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map(day => {
                const isAvailable = tutor.availableDays.includes(day.value);
                return (
                  <div key={day.value} className={`flex-1 min-w-[40px] text-center py-2 rounded-lg text-xs font-bold ${isAvailable ? "bg-indigo-50 text-indigo-600 border border-indigo-100" : "bg-slate-50 text-slate-400"}`}>
                    {day.label}
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            onClick={() => navigate(`/book-trial/${tutor.id}`)}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-lg shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Đăng ký học thử <ArrowRight size={20} />
          </button>

          <p className="text-center text-xs text-slate-400 font-medium mt-4">
            Buổi học thử kéo dài 45 phút
          </p>
        </div>
      </aside>
    </div>
  );
}
