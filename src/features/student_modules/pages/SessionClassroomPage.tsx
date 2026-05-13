import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Settings,
  Video,
  Link as LinkIcon,
  Zap,
  Info,
  LogOut,
  GraduationCap,
  User,
  Clock
} from "lucide-react";

export default function SessionClassroomPage() {
  return (
    <>
      <style>{`
        .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(16px); }
        .gradient-mesh {
            background-color: #fcf8ff;
            background-image: 
                radial-gradient(at 0% 0%, hsla(241, 64%, 90%, 1) 0px, transparent 50%),
                radial-gradient(at 100% 0%, hsla(180, 50%, 95%, 1) 0px, transparent 50%),
                radial-gradient(at 100% 100%, hsla(241, 64%, 95%, 1) 0px, transparent 50%),
                radial-gradient(at 0% 100%, hsla(180, 50%, 95%, 1) 0px, transparent 50%);
        }
        .pattern-dots {
            background-image: radial-gradient(#4648d410 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .animate-pulse-soft {
            animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-soft {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
      `}</style>

      <div className="min-h-screen flex flex-col gradient-mesh font-sans">
        {/* Top Navigation Bar */}
        <header className="w-full z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md shadow-sm h-16 shrink-0">
          <div className="flex justify-between items-center px-6 h-full w-full max-w-[1600px] mx-auto">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold text-indigo-600">NEDU</span>
              <nav className="hidden md:flex gap-6 items-center">
                <Link
                  className="font-sans text-sm font-medium tracking-tight text-slate-600 hover:text-indigo-600"
                  to="#"
                >
                  Dashboard
                </Link>
                <Link
                  className="font-sans text-sm font-medium tracking-tight text-indigo-600 border-b-2 border-indigo-600 pb-1"
                  to="#"
                >
                  Courses
                </Link>
                <Link
                  className="font-sans text-sm font-medium tracking-tight text-slate-600 hover:text-indigo-600"
                  to="#"
                >
                  Resources
                </Link>
                <Link
                  className="font-sans text-sm font-medium tracking-tight text-slate-600 hover:text-indigo-600"
                  to="#"
                >
                  Schedule
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <Bell size={20} />
              </button>
              <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden border-2 border-white shadow-sm">
                <img
                  alt="avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Fty83THbBCn_peDQrW1MyYn79t1oLj1DJsXOPObmeoOvg8Yj71oE4kyWiP--HGvsRRlIsgjaMI50N2iU_pnGAvkVrXJomQRgV9GTgfSqKTOkINR7nY16gF-_QVa6r4KmcYBAi32IK3nNzjGhHDr9s6nTEvFRPI2iB2grkKnI5EvCCmACjedsHbhCGX3AftAV1r-yCjoZ0GNxRw_wdoOnZzC-Qth1sl6faPTgi1-6wWUcDbLoWeKRsSxo9uA36-QVb4jubejnZJ-h"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Workspace Container */}
        <main className="flex-1 flex">
          {/* Left Side: Learning Area (Main) */}
          <section className="flex-1 flex flex-col p-6 gap-6">
            {/* Workspace Header */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-5 px-6 rounded-2xl shadow-sm border border-white/40">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-full border border-rose-100 animate-pulse-soft">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Trực tiếp
                  </span>
                </div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Module 02: Advanced Prototyping - Interactive Components
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                  <Settings size={20} />
                </button>
              </div>
            </div>

            {/* Main Presentation Canvas */}
            <div className="relative flex-1 glass-panel rounded-2xl shadow-xl border border-white/40 overflow-hidden flex flex-col">
              {/* Slide Content Area */}
              <div className="flex-1 flex items-center justify-center p-8 pattern-dots">
                <div className="max-w-xl w-full mx-auto p-12 bg-white rounded-[32px] shadow-2xl shadow-indigo-500/5 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/20 via-indigo-600 to-indigo-600/20"></div>
                  <div className="w-24 h-24 bg-indigo-50 rounded-[24px] flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Video className="text-indigo-600" size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                    Tham gia Google Meet
                  </h2>
                  <p className="text-slate-500 text-lg mb-10 max-w-[80%]">
                    Nhập đường dẫn cuộc họp để bắt đầu phiên thảo luận trực tiếp
                    cùng giảng viên và các học viên khác.
                  </p>
                  <div className="w-full flex flex-col gap-6">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <LinkIcon size={20} />
                      </div>
                      <input
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none text-lg placeholder:text-slate-400"
                        placeholder="https://meet.google.com/xxx-xxxx-xxx"
                        type="text"
                      />
                    </div>
                    <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-[0.98]">
                      <Zap size={24} />
                      Tham gia lớp học ngay
                    </button>
                  </div>
                  <div className="mt-10 pt-8 border-t border-slate-50 w-full">
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-sm italic">
                      <Info size={16} />
                      Lưu ý: Bạn sẽ được chuyển hướng sang tab mới của Google
                      Meet.
                    </div>
                  </div>
                </div>
              </div>

              {/* Classroom Footer Controls */}
              <div className="h-20 bg-white/90 backdrop-blur-md border-t border-slate-100 px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                    24 Học viên đang online
                  </span>
                </div>
                <button className="px-6 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold hover:bg-rose-100 transition-all flex items-center gap-2 border border-rose-100 text-sm">
                  <LogOut size={20} />
                  Rời khỏi lớp học
                </button>
              </div>
            </div>
          </section>

          {/* Right Side: Sidebar Info (Fixed 300-400px width) */}
          <aside className="hidden xl:flex w-[400px] flex-col p-6 pl-0 gap-6">
            <div className="flex-1 glass-panel rounded-2xl border border-white/40 p-6 flex flex-col gap-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  Thông tin buổi học
                </h3>
                <Info size={20} className="text-slate-400" />
              </div>

              {/* Illustration / Pattern Area */}
              <div className="relative bg-indigo-50 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-indigo-100 overflow-hidden min-h-[240px]">
                {/* Abstract educational blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl"></div>
                <GraduationCap
                  size={80}
                  className="text-indigo-600/30 mb-4 select-none"
                />
                <p className="text-indigo-600/80 font-medium text-sm">
                  Nâng cao kỹ năng thiết kế Prototyping chuyên nghiệp
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-white/50 border border-white/80">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Giảng viên
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      Alex Nguyen
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white/50 border border-white/80">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Thời gian
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      19:00 - 21:00 (Hôm nay)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
