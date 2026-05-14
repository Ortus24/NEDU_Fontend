import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Star } from "lucide-react";

export default function ReviewPage() {
  const { courseId } = useParams<{ courseId: string }>();
  
  const [teachingRating, setTeachingRating] = useState(0);
  const [supportRating, setSupportRating] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-right-4 duration-500">
      {/* Breadcrumbs / Back Action */}
      <div className="mb-8">
        <Link 
          to="/courses" 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          <span>Quay lại Khóa học của tôi</span>
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        {/* Course Summary Card */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-slate-100">
            <img 
              alt="Course Thumbnail" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop"
            />
          </div>
          <div className="flex-grow w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Tiếng Anh IELTS Cấp tốc (Target 7.5)</h1>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                    <img 
                      alt="Tutor Avatar" 
                      className="w-full h-full object-cover" 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lê Thanh Tùng"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-500">Gia sư: <strong className="text-slate-700">Lê Thanh Tùng</strong></span>
                </div>
              </div>
              <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 size={16} />
                Đã hoàn thành
              </span>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-500">Tiến độ: 100%</span>
                <span className="text-indigo-600">20/20 bài học</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Review Form */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-600 mb-2">Đánh giá khóa học</h2>
            <p className="text-base text-slate-500">Phản hồi của bạn sẽ giúp NEDU và gia sư cải thiện chất lượng giảng dạy tốt hơn.</p>
          </div>

          <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); alert("Cảm ơn bạn đã gửi đánh giá!"); window.history.back(); }}>
            
            {/* Rating 1: Quality */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold text-slate-900">Chất lượng giảng dạy</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={`teach-${star}`}
                    type="button"
                    onClick={() => setTeachingRating(star)}
                    className={`p-1 transition-transform hover:scale-110 active:scale-95 ${teachingRating >= star ? 'text-amber-400' : 'text-slate-200'}`}
                  >
                    <Star size={48} className={teachingRating >= star ? 'fill-amber-400' : ''} />
                  </button>
                ))}
              </div>
            </div>

            {/* Rating 2: Support */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold text-slate-900">Sự hỗ trợ & Nhiệt tình</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={`support-${star}`}
                    type="button"
                    onClick={() => setSupportRating(star)}
                    className={`p-1 transition-transform hover:scale-110 active:scale-95 ${supportRating >= star ? 'text-amber-400' : 'text-slate-200'}`}
                  >
                    <Star size={48} className={supportRating >= star ? 'fill-amber-400' : ''} />
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Nhận xét chi tiết</label>
              <textarea 
                className="w-full min-h-[160px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400 resize-y" 
                placeholder="Hãy chia sẻ cảm nhận của bạn về khóa học này..."
              ></textarea>
            </div>

            {/* Anonymous Checkbox */}
            <div className="flex items-center gap-3">
              <input 
                id="anonymous" 
                type="checkbox" 
                className="w-5 h-5 text-indigo-600 bg-slate-50 border-slate-300 rounded focus:ring-indigo-500" 
              />
              <label htmlFor="anonymous" className="text-base text-slate-600 cursor-pointer font-medium select-none">
                Gửi ẩn danh
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button 
                type="submit" 
                className="flex-grow bg-indigo-600 text-white font-bold text-lg py-4 px-6 rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md shadow-indigo-200"
              >
                Gửi đánh giá
              </button>
              <button 
                type="button" 
                onClick={() => window.history.back()}
                className="bg-slate-100 text-slate-600 font-bold text-lg py-4 px-10 rounded-2xl hover:bg-slate-200 active:scale-[0.98] transition-all"
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
