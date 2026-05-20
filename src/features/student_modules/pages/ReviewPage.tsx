import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Star, Loader2 } from "lucide-react";

export default function ReviewPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [userId] = useState(() => localStorage.getItem("userId") || "11111111-1111-1111-1111-111111111111");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [courseInfo, setCourseInfo] = useState<any>(null);
  const [reviewType, setReviewType] = useState<"COURSE" | "TRIAL" | null>(null);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  
  const [existingReview, setExistingReview] = useState<any>(null);

  useEffect(() => {
    setIsLoadingCourse(true);
    Promise.all([
      fetch(`http://localhost:8080/api/v1/enrollments/my-courses?userId=${userId}`),
      fetch(`http://localhost:8080/api/v1/bookings/my-bookings?userId=${userId}`),
      fetch(`http://localhost:8080/api/v1/student/reviews/my?userId=${userId}`)
    ])
    .then(async ([resEnroll, resBooking, resReviews]) => {
      const enrollData = await resEnroll.json();
      const bookingData = await resBooking.json();
      const reviewsData = resReviews.ok ? await resReviews.json() : { data: [] };
      
      const reviews = reviewsData.data || [];
      const foundReview = reviews.find((r: any) => r.enrollmentId === courseId || r.trialBookingId === courseId);
      if (foundReview) {
        setExistingReview(foundReview);
        setRating(foundReview.rating || 5);
        setComment(foundReview.comment || "");
        setIsAnonymous(!foundReview.isPublic);
      }
      
      let found = enrollData.data?.find((c: any) => c.id === courseId);
      if (found) {
        setCourseInfo(found);
        setReviewType("COURSE");
        return;
      }
      
      found = bookingData.data?.find((b: any) => b.id === courseId);
      if (found) {
        setCourseInfo(found);
        setReviewType("TRIAL");
      }
    })
    .catch(console.error)
    .finally(() => setIsLoadingCourse(false));
  }, [courseId, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá (từ 1 đến 5 sao).");
      return;
    }
    if (!reviewType) {
      alert("Không tìm thấy thông tin khóa học.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: any = {
        reviewType: reviewType,
        rating: rating,
        comment: comment,
        isPublic: !isAnonymous
      };

      if (reviewType === "COURSE") {
        payload.enrollmentId = courseId;
      } else {
        payload.trialBookingId = courseId;
      }

      const res = await fetch(`http://localhost:8080/api/v1/student/reviews?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.status === 201) {
        alert("🎉 Cảm ơn bạn đã gửi đánh giá thành công!");
        navigate("/courses");
      } else {
        alert("Lỗi: " + (data.message || "Bạn đã đánh giá khóa học này rồi hoặc có lỗi xảy ra."));
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi kết nối.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-right-4 duration-500">
      {/* Breadcrumbs / Back Action */}
      <div className="mb-8">
        <button 
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          <span>Quay lại Khóa học của tôi</span>
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {/* Course Summary Card */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          {isLoadingCourse ? (
             <div className="flex w-full items-center justify-center p-8 text-slate-400">
               <Loader2 className="animate-spin mr-2" size={24} /> Đang tải thông tin...
             </div>
          ) : courseInfo ? (
            <>
              <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                <img 
                  alt="Course Thumbnail" 
                  className="w-full h-full object-cover" 
                  src={reviewType === "TRIAL" ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop" : "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop"}
                />
              </div>
              <div className="flex-grow w-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 mb-2">
                      {courseInfo.roadmapTitle || `Lớp học thử với ${courseInfo.tutorName || 'Gia sư'}`}
                    </h1>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-indigo-50">
                        <img 
                          alt="Tutor Avatar" 
                          className="w-full h-full object-cover" 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${courseInfo.tutorName || "Tutor"}`}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-500">Gia sư: <strong className="text-slate-700">{courseInfo.tutorName || "Hệ thống"}</strong></span>
                    </div>
                  </div>
                  <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0">
                    <CheckCircle2 size={16} />
                    Đã hoàn thành
                  </span>
                </div>
                
                {reviewType === "COURSE" && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-500">Tiến độ: 100%</span>
                      <span className="text-indigo-600">{courseInfo.totalSessions}/{courseInfo.totalSessions} bài học</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full w-full"></div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="w-full text-center p-8 text-slate-500 font-bold">
              Không tìm thấy thông tin khóa học / học thử.
            </div>
          )}
        </section>

        {/* Review Form */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-indigo-600 mb-2">Đánh giá {reviewType === 'TRIAL' ? 'buổi học thử' : 'khóa học'}</h2>
            <p className="text-sm font-medium text-slate-500">Phản hồi của bạn sẽ giúp hệ thống và gia sư nâng cao chất lượng giảng dạy.</p>
          </div>

          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            
            {/* Rating */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">Chất lượng tổng thể</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={`rating-${star}`}
                    type="button"
                    disabled={!!existingReview}
                    onClick={() => setRating(star)}
                    className={`p-1 transition-transform ${!existingReview ? 'hover:scale-110 active:scale-95' : ''} ${rating >= star ? 'text-amber-400' : 'text-slate-200'}`}
                  >
                    <Star size={48} className={rating >= star ? 'fill-amber-400' : ''} />
                  </button>
                ))}
              </div>
              <p className="text-sm font-bold text-amber-500 min-h-[20px]">
                {rating === 1 && "Rất tệ"}
                {rating === 2 && "Tệ"}
                {rating === 3 && "Bình thường"}
                {rating === 4 && "Tốt"}
                {rating === 5 && "Tuyệt vời"}
              </p>
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Nhận xét chi tiết</label>
              <textarea 
                value={comment}
                disabled={!!existingReview}
                onChange={(e) => setComment(e.target.value)}
                className="w-full min-h-[140px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400 resize-y disabled:opacity-70 disabled:bg-slate-100" 
                placeholder="Hãy chia sẻ cảm nhận của bạn về chất lượng giảng dạy, tài liệu, hoặc sự nhiệt tình của gia sư..."
              ></textarea>
            </div>

            {/* Anonymous Checkbox */}
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 w-fit">
              <input 
                id="anonymous" 
                type="checkbox" 
                disabled={!!existingReview}
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 cursor-pointer disabled:opacity-50" 
              />
              <label htmlFor="anonymous" className="text-sm text-slate-700 cursor-pointer font-bold select-none">
                Gửi ẩn danh (Không hiển thị tên bạn trên Profile gia sư)
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              {!existingReview ? (
                <button 
                  type="submit" 
                  disabled={isSubmitting || rating === 0}
                  className="flex-grow bg-indigo-600 text-white font-black text-sm py-4 px-6 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                  Gửi đánh giá
                </button>
              ) : (
                <div className="flex-grow bg-emerald-50 text-emerald-600 font-black text-sm py-4 px-6 rounded-xl border border-emerald-200 flex justify-center items-center gap-2">
                  <CheckCircle2 size={20} />
                  Bạn đã đánh giá khóa học này
                </div>
              )}
              <button 
                type="button" 
                onClick={() => navigate("/courses")}
                disabled={isSubmitting}
                className="bg-white text-slate-600 border border-slate-200 font-black text-sm py-4 px-10 rounded-xl hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-50"
              >
                Bỏ qua
              </button>
            </div>

          </form>
        </section>
      </div>
    </div>
  );
}
