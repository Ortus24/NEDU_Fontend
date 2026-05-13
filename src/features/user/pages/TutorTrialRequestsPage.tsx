import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  Settings,
  Calendar,
  Clock,
  MessageCircle,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

interface TrialRequest {
  id: string;
  studentName: string;
  grade: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  message: string;
  avatar: string;
  status: "pending" | "accepted" | "rejected";
}

const INITIAL_REQUESTS: TrialRequest[] = [
  {
    id: "1",
    studentName: "Nguyễn An",
    grade: "Lớp 12",
    subject: "Toán học",
    date: "Thứ Hai, 24 Tháng 5, 2024",
    time: "15:00 - 16:30",
    duration: "90 phút",
    message: "Em muốn ôn tập lại phần Đạo hàm để chuẩn bị cho kỳ thi sắp tới ạ.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAttEtQ814sOrMLb10irhPHRqY_68VBze3t22csV4EXc5h79VPViUj3-4B7PI19By_ziB2SluR27UmSRewdmZpiLsINRLz7Fv-zsy4uuEpSVc8ezjXEjcLs1HbCPnb0kZoDmPFGY-e9KXHk4QUreXoce-Jn-tp2Epfs_MGyQvXV4fcQ8mWpOFcmyVbzAjMXIIGMOfialFO4K2NxUnfJLLqhtwhMvRcURuQYdPgMuLWh3Ep8Y6ETaacIr0nYHQwCZI-QxNpTw6OjdUXg",
    status: "pending",
  },
  {
    id: "2",
    studentName: "Hoàng Việt",
    grade: "Lớp 11",
    subject: "Vật lý",
    date: "Thứ Tư, 26 Tháng 5, 2024",
    time: "19:30 - 21:00",
    duration: "90 phút",
    message: "Em cần hỗ trợ phần Quang hình học, em thấy phần này khá khó hiểu.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTfvaY2MDWjj_-zRsCx-m-rLJoM-2hs4G8ixfuYx84taJLjrxAubvNAAorh9WqBNNYYTfWMxj-wmWYdqxaws1YoMNbAL5a0qz0H396dusrSf--Sv9bwVKsSHEvSBUtY5k81sOdG574GA3778zJ3bQGsXMeq2W4fiSbf2xH_MAYV0cOvpNgxYJyRt4CpL92zOMT5j46Zo3dslbAv9Z4Q8QfXrlBJkZoUSRNfUH7VlDBCO2neD-u7wsltfL6GoHx-Wpb3bABVst6nhOw",
    status: "pending",
  },
  {
    id: "3",
    studentName: "Lê Linh Anh",
    grade: "Lớp 12",
    subject: "Tiếng Anh",
    date: "Thứ Năm, 27 Tháng 5, 2024",
    time: "10:00 - 11:30",
    duration: "90 phút",
    message: "Em muốn luyện tập thêm kỹ năng Writing cho kỳ thi IELTS cuối năm.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9YJ1k9rYaL8hzVr8OvZF4dB05Yx2oIeSKW8--ohrfhbkyH9D_aoSJNhVNp7iKmn4ywqFAe4Y3iAkZXA-OEDjGLkgkr9ruISCT70vol29s4Fem9zyueyjsIJKnkQfkTeCAQUOZqYW48vuo8t2nAr74T0A7ZJYuchPjbZbD16NE3U20bZSNFA7ZbIhfvuWFGml47KsrECTFh6Qh45MhmePDCFl2kgNp0hTjU8PZ00-6fQRSq_x883CfpK6n8cPV18huzyYYQjKWW8sV",
    status: "pending",
  },
];

export default function TutorTrialRequestsPage() {
  const [requests, setRequests] = useState<TrialRequest[]>(INITIAL_REQUESTS);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted">("all");

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  const handleStatusUpdate = (id: string, newStatus: TrialRequest["status"]) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  return (
    <div className="flex bg-[#fcf8ff] min-h-screen font-['Inter']">
      <TutorSidebar name="Minh Tran" role="Professional Tutor" />

      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center h-16">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm học sinh hoặc yêu cầu..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
              <Settings size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Minh Tran</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                  Tutor
                </p>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrjjAfqiaLQwxE0ZFiWaVH_YLkJrZycz-1aKANaHHl1s3NqBHBfhgkzo2XElREE4r9ypjkFnxFcIOUbi9zux-vFUwHGAwdEpYSJwoOvNVppHHXLy2w6v2dcl0JxvkV3D5TJdnb2urQdFVlNJO4OJ6ozfZruVCfjOUwJlVc1exnVSa8Yfg_D1UImCnhRURculBe20N5_acdCBCkpbaAGWXksUb6egNfvY6jipv02YmBHKLW8DBi_d5D2c7cnHi-y_aLzAIh39tFpwsZ"
                className="w-9 h-9 rounded-full border-2 border-primary-container object-cover"
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Trial Booking Requests
              </h1>
              <p className="text-slate-500 mt-1">
                Quản lý và phản hồi các yêu cầu học thử từ học sinh.
              </p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
              {(["all", "pending", "accepted"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    filter === t
                      ? "bg-white text-primary shadow-md"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Requests List */}
            <div className="lg:col-span-8 space-y-6">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                >
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 left-0 bottom-0 w-2 ${
                    req.status === 'pending' ? 'bg-orange-400' : 
                    req.status === 'accepted' ? 'bg-emerald-400' : 'bg-red-400'
                  }`} />

                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <img
                          src={req.avatar}
                          className="w-20 h-20 rounded-3xl object-cover shadow-lg shadow-slate-200"
                          alt={req.studentName}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                          <div className={`w-4 h-4 rounded-full ${
                            req.status === 'pending' ? 'bg-orange-400 animate-pulse' : 'bg-emerald-400'
                          }`} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">
                          {req.studentName}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="bg-primary/5 text-primary px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {req.grade}
                          </span>
                          <span className="bg-secondary/5 text-secondary px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {req.subject}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${
                        req.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                        req.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {req.status}
                      </span>
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 py-6 border-y border-slate-50">
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-primary">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngày học thử</p>
                        <p className="font-bold text-sm">{req.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời gian</p>
                        <p className="font-bold text-sm">{req.time} ({req.duration})</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <MessageCircle className="text-slate-300 shrink-0 mt-1" size={18} />
                    <p className="text-sm text-slate-500 italic">"{req.message}"</p>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Link 
                      to={`/tutor/trial-requests/${req.id}`}
                      className="flex-1 py-3 px-6 border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                      Xem chi tiết
                      <ChevronRight size={16} />
                    </Link>
                    {req.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusUpdate(req.id, "accepted")}
                        className="flex-1 py-3 px-6 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={18} />
                        Chấp nhận
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filteredRequests.length === 0 && (
                <div className="bg-white rounded-[32px] p-20 border-2 border-dashed border-slate-100 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <XCircle size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Không tìm thấy yêu cầu nào</h3>
                  <p className="text-slate-400 mt-2">Hãy thử thay đổi bộ lọc hoặc quay lại sau.</p>
                </div>
              )}
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-primary rounded-[32px] p-8 text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
                <TrendingUp className="absolute -right-4 -bottom-4 w-40 h-40 text-white/10 group-hover:scale-125 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Hoạt động tuần này</h3>
                  <p className="text-white/70 text-sm mb-8 leading-relaxed">
                    Bạn có {requests.filter(r => r.status === 'pending').length} yêu cầu mới. Tỷ lệ phản hồi nhanh giúp tăng 20% khả năng được học sinh lựa chọn.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Mới</p>
                      <p className="text-3xl font-black">03</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Đã nhận</p>
                      <p className="text-3xl font-black">08</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <h4 className="text-lg font-black text-slate-900 mb-6">Gợi ý phát triển</h4>
                <div className="space-y-6">
                  {[
                    "Cập nhật lịch rảnh thường xuyên để học sinh dễ dàng chọn lịch học thử.",
                    "Chuẩn bị kỹ tài liệu cho buổi học thử đầu tiên.",
                    "Gửi tin nhắn chào mừng sau khi chấp nhận yêu cầu."
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm text-slate-500 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
