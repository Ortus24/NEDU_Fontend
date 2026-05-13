import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Mail,
  Video,
  Languages,
  Target,
  Zap,
  BookOpen,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";

export default function TutorTrialRequestDetailPage() {
  const { id } = useParams();

  // Mock data for the specific request
  const student = {
    name: "Minh Anh",
    grade: "Grade 11",
    subject: "IELTS Preparation",
    requestId: "#NEDU-8821",
    location: "Hanoi, Vietnam (Online)",
    joined: "October 2023",
    englishLevel: "Intermediate (B2)",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY3jJLCWkNU1LvvaeciZW4t3hzzSpxzZwF2zNdoDqKKnX8Jj1jg2YXrxOgHfK-SOSJgTWSW5raizym7NuJET1MQFPpsCBypWSAHG8qBRJQKKludseNhcOEOEsMKMghVspHeFI66_p8AJcqk51XAeh9KN1SDj9_-mKSV_rFcXCPsjVJmhTJVSxpo9mg41_lRJy2fmhwrATZR_DZMp7leYVSOE7KbjjU_SIUb2hzSU-pLvXCIZKl9AMdKA4Hg1UAA8ZJmdjZBjhFHlZ-",
    message: "Chào thầy ạ, em hiện đang học lớp 11 và muốn cải thiện kỹ năng nói IELTS của mình. Em thấy phương pháp dạy của thầy rất phù hợp nên muốn đăng ký học thử một buổi. Em mong muốn đạt band 7.5 Speaking trong kỳ thi sắp tới. Rất mong nhận được phản hồi từ thầy!",
    goals: [
      { icon: <Languages size={18} />, title: "Improve IELTS Speaking", desc: "Focus on fluency and lexical resource for Part 2.", color: "bg-blue-50 text-blue-600" },
      { icon: <Target size={18} />, title: "Band 7.5 Target", desc: "Targeting exam date in early March 2024.", color: "bg-orange-50 text-orange-600" },
      { icon: <Zap size={18} />, title: "Vocabulary Expansion", desc: "Acquiring academic idioms and collocations.", color: "bg-purple-50 text-purple-600" },
      { icon: <BookOpen size={18} />, title: "Exam Strategies", desc: "Techniques for structuring complex answers.", color: "bg-slate-100 text-slate-600" },
    ],
    schedule: {
      date: "Friday, Nov 24, 2023",
      time: "19:30 - 20:30 (GMT+7)",
      fee: "450.000đ",
      duration: "60 mins",
      platform: "Google Meet"
    }
  };

  return (
    <div className="flex bg-[#fcf8ff] min-h-screen font-['Inter']">
      <TutorSidebar name="Alex Johnson" role="Premium Tutor" />

      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Breadcrumb */}
          <Link
            to="/tutor/trial-requests"
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Requests
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Profile Header Card */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
                  <img
                    src={student.avatar}
                    className="w-32 h-32 rounded-[24px] object-cover shadow-2xl shadow-slate-200 border-4 border-white"
                    alt={student.name}
                  />
                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{student.name}</h2>
                        <div className="flex gap-2 mt-2">
                          <span className="px-4 py-1 bg-primary/5 text-primary rounded-full font-black text-[10px] uppercase tracking-widest">
                            {student.grade}
                          </span>
                          <span className="px-4 py-1 bg-slate-100 text-slate-500 rounded-full font-black text-[10px] uppercase tracking-widest">
                            {student.subject}
                          </span>
                        </div>
                      </div>
                      <div className="md:text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Request ID</p>
                        <p className="font-black text-lg text-primary">{student.requestId}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                        <p className="text-sm font-bold text-slate-700">{student.location}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Joined</p>
                        <p className="text-sm font-bold text-slate-700">{student.joined}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">English Level</p>
                        <p className="text-sm font-bold text-slate-700">{student.englishLevel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <MessageCircle size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Message from Student</h3>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
                  <span className="absolute -top-3 left-6 bg-white px-3 text-primary">
                    <Zap size={20} />
                  </span>
                  <p className="text-slate-600 italic leading-relaxed text-lg">
                    "{student.message}"
                  </p>
                </div>
              </div>

              {/* Learning Goals */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Target size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Learning Goals</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {student.goals.map((goal, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                      <div className={`p-3 rounded-xl ${goal.color} group-hover:scale-110 transition-transform`}>
                        {goal.icon}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm">{goal.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{goal.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Proposed Schedule Card */}
              <div className="bg-white rounded-[32px] p-8 border-2 border-primary/10 shadow-2xl shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                  Trial Session
                </div>
                
                <div className="flex items-center gap-3 mb-8 text-primary">
                  <Calendar size={24} />
                  <h4 className="text-xl font-black">Proposed Schedule</h4>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary text-white rounded-3xl flex flex-col items-center justify-center shadow-xl shadow-primary/30">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Nov</span>
                      <span className="text-2xl font-black leading-none mt-1">24</span>
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{student.schedule.date}</p>
                      <p className="text-xs text-slate-500 font-bold mt-1">{student.schedule.time}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-[24px] border border-primary/10 flex items-center justify-between group hover:bg-primary/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                        < Zap size={18} />
                      </div>
                      <span className="font-bold text-sm text-slate-600">Proposed Fee</span>
                    </div>
                    <span className="text-2xl font-black text-primary">{student.schedule.fee}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Duration</span>
                      <span className="font-black text-slate-800">{student.schedule.duration}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Platform</span>
                      <span className="font-black text-slate-800">{student.schedule.platform}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full py-5 bg-primary text-white rounded-[24px] font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                  <CheckCircle2 size={20} />
                  Chấp nhận yêu cầu
                </button>
                <button className="w-full py-5 bg-white border-2 border-primary text-primary rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-primary/5 active:scale-95 transition-all">
                  <Mail size={20} />
                  Nhắn tin cho học sinh
                </button>
                <button className="w-full py-5 text-red-500 hover:bg-red-50 rounded-[24px] font-black flex items-center justify-center gap-3 transition-all active:scale-95">
                  <XCircle size={20} />
                  Từ chối
                </button>
              </div>

              {/* Map Mockup */}
              <div className="rounded-[32px] border border-slate-100 overflow-hidden h-56 relative shadow-xl shadow-slate-200/40 group">
                <img
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjIRoxBZ_yIqxSZgn__FCu0YekrkyKr7CRao0-xi7DZpnTD1fVSxjCDib06u1IHHYuTynRIY1O-q6olNvgnSuTAKfe1Osy7c6GjwXs-v0oylEamKmxJNzI_niAVhECgdAslsEVbzJOGPJw_3-XHyhLEzgKVtO_b8lLemZ77q3lAo5YcHEjH5OcHIrv444zWNc6VKFFTVYPMiyrtN0jfvIQ2eZZFDfr4hURAGgXNX9hh-515OEHlgaU_EXcArZxk3vnfGq5l9QwZHK0"
                  alt="Location"
                />
                <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                    <MapPin className="text-primary" size={32} style={{ fill: 'currentColor' }} />
                  </div>
                  <span className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-xl text-[12px] font-black mt-4 border border-white">
                    Hà Nội, Việt Nam
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
