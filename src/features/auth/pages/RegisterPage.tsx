import {
  AlertCircle,
  Calendar,
  GraduationCap,
  Mail,
  Phone,
  User,
  X,
  Lock,
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  Info,
  Upload,
  FileText,
  Trash,
  ContactRound,
  CircleCheck,
  TrendingUp,
  Hourglass,
  Flag,
  Headset,
  Home,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../shared/components/Logo";

type Role = "student" | "tutor" | null;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [error, setError] = useState<string | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (error) {
      setIsErrorVisible(true);
      timeoutId = setTimeout(() => {
        setIsErrorVisible(false);
        // Đợi animation fade-out chạy xong rồi mới clear error state
        setTimeout(() => setError(null), 300);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  // Constants
  const isStudent = role === "student";
  const isTutor = role === "tutor";

  // Progress variables
  const currentStep = step;
  const totalSteps = isStudent ? 2 : 4;
  const progressPercent = ((currentStep - 1) / totalSteps) * 100;

  // Handles moving to next step
  const handleNext = () => {
    if (step === 1 && !role) {
      setError("Vui lòng chọn vai trò để tiếp tục!");
      return;
    }

    // If student finishes step 2, we just end the process
    if (isStudent && step === 2) {
      navigate("/"); // Navigate to home
      return;
    }

    // If tutor finishes step 4, just show success
    if (isTutor && step === 4) {
      navigate("/"); // Or navigate to dashboard
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  // Màn hình 1: Chọn Vai Trò
  if (step === 1) {
    return (
      <div className="relative flex min-h-[100vh] w-full flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        {/* Toast Notification */}
        {error && (
          <div
            className={`fixed right-6 z-50 flex items-center gap-3 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 p-4 text-red-700 shadow-xl dark:border-red-900/50 dark:from-red-950/50 dark:to-rose-950/50 dark:text-red-400 sm:max-w-md transition-all duration-300 ease-in-out ${
              isErrorVisible
                ? "top-6 translate-y-0 opacity-100"
                : "-top-20 -translate-y-full opacity-0"
            }`}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
              <AlertCircle
                size={24}
                strokeWidth={2}
                className="text-red-600 dark:text-red-400 animate-pulse-slow"
              />
            </div>
            <p className="text-sm font-semibold pr-2">{error}</p>
            <button
              type="button"
              onClick={() => setIsErrorVisible(false)}
              className="ml-auto flex items-center justify-center rounded-full p-1 border border-transparent hover:bg-red-200/50 dark:hover:bg-red-900/50 transition-colors"
            >
              <X
                size={20}
                strokeWidth={2}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              />
            </button>
          </div>
        )}
        <div className="flex h-full grow flex-col items-center">
          {/* Header */}
          <header className="flex w-full max-w-[1200px] items-center justify-between px-6 py-6 lg:px-10">
            <Link
              to="/"
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <GraduationCap
                size={32}
                strokeWidth={2}
                className="text-blue-600 transition-all hover:scale-110"
              />
              <h2 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-slate-100">
                NEDU
              </h2>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">
                Đã có tài khoản?
              </span>
              <Link
                className="text-sm font-bold text-primary hover:underline"
                to="/login"
              >
                Đăng nhập
              </Link>
            </div>
          </header>

          <main className="flex w-full max-w-[960px] flex-1 flex-col px-6 py-8">
            <div className="mb-12 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Bước 1 trên {totalSteps}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Chọn vai trò của bạn
                  </h3>
                </div>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                  {Math.round(progressPercent)}%
                </p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-10 text-center">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-4xl">
                Chào mừng đến với NEDU
              </h1>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Hãy chọn vai trò phù hợp để chúng tôi cá nhân hóa trải nghiệm
                của bạn.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Student Card */}
              <label className="group relative cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  className="peer sr-only"
                  checked={role === "student"}
                  onChange={() => {
                    setRole("student");
                    setError(null);
                  }}
                />
                <div className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-transparent bg-white p-6 shadow-md transition-all hover:shadow-xl peer-checked:border-primary dark:bg-slate-900">
                  <div className="mb-6 flex h-48 w-full items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                    <div className="relative h-40 w-40 overflow-hidden rounded-lg bg-indigo-100 transition-transform group-hover:scale-105 dark:bg-indigo-800/30">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsCbIaU1I3HtEIFUILkTtJXUrRJtwGQYLumPb8m7dQZjiw0XBDsfXti7IxsBw65DvVW3Y6GN4LimdZy-BRGa4IZKagNJh3jGBnrNugnqdvbANx_9o-hgJEMR84UiRQ01VwnFonlwPxDYgp1NeDGuiERvhvyrqhVmv5rm8VC_hKzx6rdTt-QEgofHfCM9k03Cls6VQUrEIUYRY8uSjYsUliIIocVh7TmidsEfMxmwY6BN7fOCSjGWc0QRTMeqKKzPkIXJap9j1zr0o')",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Tôi là Học sinh
                      </h3>
                      <div className="hidden h-6 w-6 items-center justify-center rounded-full bg-primary text-white peer-checked:flex">
                        <span className="material-symbols-outlined text-sm">
                          check
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      Tìm kiếm gia sư phù hợp, tham gia các khóa học chất lượng
                      và bắt đầu hành trình học tập cá nhân hóa ngay hôm nay.
                    </p>
                  </div>
                </div>
              </label>

              {/* Tutor Card */}
              <label className="group relative cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  className="peer sr-only"
                  checked={role === "tutor"}
                  onChange={() => {
                    setRole("tutor");
                    setError(null);
                  }}
                />
                <div className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-transparent bg-white p-6 shadow-md transition-all hover:shadow-xl peer-checked:border-primary dark:bg-slate-900">
                  <div className="mb-6 flex h-48 w-full items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <div className="relative h-40 w-40 overflow-hidden rounded-lg bg-amber-100 transition-transform group-hover:scale-105 dark:bg-amber-800/30">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMf50z8unHwS8HtqbPeQVp44S11e-UXyMej0SN9peIRyTmODKYv_q6FwadcNirPCqW75WMBNTnTKPUZZwwxmg0h4NzYQ5ptKWEjquyCrII5kVc7U2OKD9cQAjw5kblYjJlctg59IEnBQ_3eSdwiyAS_yCN4xX6CcL5nMcg8AoBzplihbEgKM4dCA1uyUpH4AJXjaVI8wAT9jSF838AhrJGSovB553NmGsGUCLhWGSNUXo9qvVchhxXlxJVEkFRnb8ge4xOSSU6Ep0')",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Tôi là Gia sư
                      </h3>
                      <div className="hidden h-6 w-6 items-center justify-center rounded-full bg-primary text-white peer-checked:flex">
                        <span className="material-symbols-outlined text-sm">
                          check
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      Chia sẻ kiến thức, kết nối với hàng ngàn học viên tiềm
                      năng và gia tăng thu nhập từ chính chuyên môn của bạn.
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <div className="mt-12 flex flex-col items-center gap-6">
              <button
                onClick={handleNext}
                className="flex h-14 w-full max-w-[400px] cursor-pointer items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Tiếp tục
              </button>
              <div className="flex items-center gap-1 text-slate-500">
                <span>Bạn gặp khó khăn?</span>
                <a
                  className="font-medium text-primary hover:underline"
                  href="#"
                >
                  Liên hệ hỗ trợ
                </a>
              </div>
            </div>
          </main>

          <footer className="py-10 text-center text-slate-400 text-xs">
            © 2024 NEDU Education Platform. All rights reserved.
          </footer>
        </div>
      </div>
    );
  }

  // Màn hình 2: Nhập Thông Tin Cá Nhân
  if (step === 2) {
    return (
      <div className="flex h-full grow flex-col items-center">
        {/* Header */}
        <header className="flex w-full max-w-[1200px] items-center justify-between px-6 py-6 lg:px-10">
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <GraduationCap
              size={32}
              strokeWidth={2}
              className="text-blue-600 transition-all hover:scale-110"
            />
            <h2 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-slate-100">
              NEDU
            </h2>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">
              Đã có tài khoản?
            </span>
            <Link
              className="text-sm font-bold text-primary hover:underline"
              to="/login"
            >
              Đăng nhập
            </Link>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center py-10 px-4">
          <div className="w-full max-w-[640px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Bước 2/{totalSteps}
                    </span>
                    <h1 className="text-2xl font-bold mt-1">
                      Thông tin cá nhân
                    </h1>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      Hoàn thành {Math.round(progressPercent)}%
                    </p>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <form
              className="p-6 md:p-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 col-span-full">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <User
                      size={18} // Tương đương text-lg (khoảng 18px)
                      strokeWidth={2}
                      className="opacity-70 text-slate-500"
                    />
                    Họ và tên
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                    placeholder="Nhập đầy đủ họ và tên"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Calendar
                      size={18}
                      strokeWidth={2}
                      className="opacity-70 text-slate-500"
                    />
                    Ngày tháng năm sinh
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    type="date"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Phone
                      size={18}
                      strokeWidth={2}
                      className="opacity-70 text-slate-500"
                    />
                    Số điện thoại
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                    placeholder="0xxx xxx xxx"
                    type="tel"
                  />
                </div>
                <div className="flex flex-col gap-2 col-span-full">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Mail
                      size={18}
                      strokeWidth={2}
                      className="opacity-70 text-slate-500"
                    />
                    Địa chỉ Email
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                    placeholder="example@gmail.com"
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Lock
                      size={18}
                      strokeWidth={2}
                      className="opacity-70 text-slate-500"
                    />
                    Mật khẩu
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Lock
                      size={18}
                      strokeWidth={2}
                      className="opacity-70 text-slate-500"
                    />
                    Nhập lại mật khẩu
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft
                    size={20}
                    strokeWidth={2}
                    className="opacity-70 text-slate-500"
                  />
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="flex-[2] px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isStudent ? "Hoàn tất đăng ký" : "Tiếp tục"}
                  <ArrowRight
                    size={20} // text-xl thường tương đương 20px
                    strokeWidth={2}
                    className="text-current transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Thông tin của bạn được bảo mật tuyệt đối theo{" "}
                <a
                  className="text-primary hover:underline font-medium"
                  href="#"
                >
                  Chính sách bảo mật
                </a>{" "}
                của NEDU.
              </p>
            </div>
          </div>

          <p className="mt-8 text-slate-500 dark:text-slate-400 text-sm">
            Bạn cần hỗ trợ?{" "}
            <a className="text-primary font-semibold hover:underline" href="#">
              Liên hệ chúng tôi
            </a>
          </p>
        </main>

        <div className="fixed top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      </div>
    );
  }

  // Màn hình 3: Bằng cấp & Chứng chỉ (Chỉ gia sư)
  if (step === 3 && isTutor) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <GraduationCap
                size={32}
                strokeWidth={2}
                className="text-white transition-all hover:scale-110"
              />
            </div>
            <div>
              <h2 className="text-blue-600 font-bold leading-tight tracking-tight">
                NEDU
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Cổng thông tin gia sư
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
              <Bell size={20} strokeWidth={2} className="text-slate-500" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <button className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 hover:bg-slate-200 transition-colors">
              <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={20} strokeWidth={2} className="text-primary" />
              </div>
              <span className="text-sm font-semibold">Tài khoản</span>
            </button>
          </div>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row max-w-[1440px] mx-auto w-full">
          <aside className="w-full lg:w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-xl font-bold">Ứng tuyển Gia sư</h1>
                <p className="text-slate-500 text-sm mt-1">
                  Hoàn thiện hồ sơ để bắt đầu giảng dạy
                </p>
              </div>
              <nav className="flex flex-col gap-2">
                <div className="flex items-center gap-4 px-4 py-3 rounded-xl border border-transparent">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                    <Check
                      size={20}
                      strokeWidth={2}
                      className="text-emerald-600"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-400">
                      Bước 1
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      Thông tin cá nhân
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-xl border border-transparent">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                    <Check
                      size={20}
                      strokeWidth={2}
                      className="text-emerald-600"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-400">
                      Bước 2
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      Kinh nghiệm & Kỹ năng
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                    <span className="text-sm font-bold">03</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Đang thực hiện
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Bằng cấp & Chứng chỉ
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-xl border border-transparent opacity-60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500">
                    <span className="text-sm font-bold">04</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-400">
                      Bước 4
                    </span>
                    <span className="text-sm font-medium">Hoàn tất</span>
                  </div>
                </div>
              </nav>
            </div>
            <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Tiến độ hồ sơ
                </span>
                <span className="text-sm font-bold text-primary">75%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1 italic">
                <Info size={14} strokeWidth={2} className="text-slate-500" />
                Hồ sơ của bạn sẽ được duyệt trong 24h
              </p>
            </div>
          </aside>

          <main className="flex-1 bg-white dark:bg-slate-900 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Bằng cấp & Chứng chỉ
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Vui lòng tải lên các giấy tờ để xác thực năng lực.
                </p>
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              >
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-1 bg-primary rounded-full"></div>
                    <h3 className="text-lg font-bold">
                      1. Bằng đại học hoặc Chứng chỉ liên quan
                    </h3>
                  </div>
                  <div className="relative group border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/20 transition-all cursor-pointer">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Upload
                        size={24} // text-2xl trong Tailwind thường là 24px
                        strokeWidth={2}
                        className="text-primary transition-transform group-hover:-translate-y-1"
                      />
                    </div>
                    <p className="text-slate-900 dark:text-white font-semibold text-sm">
                      Kéo và thả tệp vào đây
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Hoặc nhấp để chọn tệp
                    </p>
                    <input
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="file"
                    />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-md">
                          <FileText
                            size={24}
                            strokeWidth={2}
                            className="text-blue-500"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold">
                            Bang_tot_nghiep_DH.pdf
                          </p>
                          <p className="text-[10px] text-slate-400">
                            2.4 MB • Đã tải lên
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        type="button"
                      >
                        <Trash
                          size={24}
                          strokeWidth={2}
                          className="text-red-500"
                        />
                      </button>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-1 bg-primary rounded-full"></div>
                    <h3 className="text-lg font-bold">
                      2. Căn cước công dân (CCCD)
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                      <ContactRound
                        size={24} // Kích thước mặc định tương đương icon font
                        strokeWidth={2}
                        className="text-slate-400 group-hover:text-primary mb-1 transition-colors"
                      />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                        Mặt trước CCCD
                      </span>
                    </div>
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                      <ContactRound
                        size={24}
                        strokeWidth={2}
                        className="text-slate-400 group-hover:text-primary mb-1 transition-colors"
                      />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                        Mặt sau CCCD
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-1 bg-primary rounded-full"></div>
                    <h3 className="text-lg font-bold">
                      3. Mô tả thêm về bằng cấp
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <textarea
                      className="w-full min-h-[80px] rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm p-3"
                      placeholder="Các chứng chỉ bạn đã đạt được (VD: IELTS 8.0,...)"
                    ></textarea>
                  </div>
                </section>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm"
                  >
                    <ArrowLeft
                      size={24}
                      strokeWidth={2}
                      className="text-slate-400 group-hover:text-primary mb-1 transition-colors"
                    />
                    Quay lại
                  </button>
                  <div className="flex gap-3">
                    <button
                      className="px-5 py-2.5 rounded-lg text-slate-500 font-bold hover:text-slate-700 text-sm"
                      type="button"
                    >
                      Lưu nháp
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all text-sm"
                    >
                      Tiếp tục
                      <ArrowRight
                        size={24}
                        strokeWidth={2}
                        className="text-slate-400 group-hover:text-primary mb-1 transition-colors"
                      />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Màn hình 4: Khảo sát thành công (Hoàn tất 100%) - Gia sư
  if (step === 4 && isTutor) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <GraduationCap
                size={32}
                strokeWidth={2}
                className="text-white transition-all hover:scale-110"
              />
            </div>
            <div>
              <h2 className="text-blue-600 font-bold leading-tight tracking-tight">
                NEDU
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Cổng thông tin gia sư
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
              <Bell size={20} strokeWidth={2} className="text-slate-500" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <button className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 hover:bg-slate-200 transition-colors">
              <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={20} strokeWidth={2} className="text-primary" />
              </div>
              <span className="text-sm font-semibold">Tài khoản</span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center py-6 px-4 max-w-4xl mx-auto w-full">
          <div className="w-full mb-6">
            <div className="flex gap-4 justify-between items-end mb-1">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold">
                Bước 4 của 4
              </p>
              <p className="text-primary text-xs font-bold">Hoàn tất 100%</p>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center text-center space-y-4 mb-8">
            <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 mb-2">
              <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
              <div className="z-10 bg-white dark:bg-slate-800 p-6 rounded-full shadow-xl shadow-primary/10 border-4 border-primary/20">
                <CircleCheck
                  strokeWidth={1.5}
                  className="text-primary w-[48px] h-[48px] md:w-[60px] md:h-[60px] transition-all duration-500 animate-in zoom-in"
                />
              </div>
            </div>
            <div>
              <h1 className="text-slate-900 dark:text-white tracking-tight text-2xl md:text-3xl font-extrabold leading-tight mb-2">
                Cảm ơn bạn đã nộp hồ sơ!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
                Hồ sơ đã được ghi nhận. Đội ngũ NEDU sẽ đánh giá sớm nhất.
              </p>
            </div>
          </div>

          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl p-5 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp
                size={20}
                strokeWidth={2}
                className="text-primary transition-transform hover:scale-110"
              />
              Trạng thái hồ sơ
            </h3>
            <div className="relative space-y-5">
              <div className="absolute left-3.5 top-1 bottom-1 w-[2px] bg-slate-200 dark:bg-slate-800"></div>
              <div className="relative flex items-center gap-4 group">
                <div className="z-10 flex size-7 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
                  <Check size={14} strokeWidth={3} className="text-current" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">
                    Hồ sơ đã nộp
                  </p>
                  <p className="text-xs text-slate-500">
                    Đã nhận lúc 14:30, Hôm nay
                  </p>
                </div>
              </div>
              <div className="relative flex items-center gap-4 group">
                <div className="z-10 flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 outline outline-4 outline-primary/10">
                  <Hourglass
                    size={14}
                    strokeWidth={3}
                    className="text-current"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-primary">
                    Admin đang xem
                  </p>
                  <p className="text-xs text-slate-500">
                    Dự kiến trong 3-5 ngày làm việc
                  </p>
                </div>
              </div>
              <div className="relative flex items-center gap-4 group">
                <div className="z-10 flex size-7 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400">
                  <Flag size={14} strokeWidth={3} className="text-current" />
                </div>
                <div className="flex-1 opacity-50">
                  <p className="font-bold text-sm text-slate-500 dark:text-slate-400">
                    Kết quả
                  </p>
                  <p className="text-xs">Thông báo qua email</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl bg-primary/5 rounded-xl p-4 md:p-5 border border-primary/10 mb-6">
            <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
              <Info size={20} strokeWidth={3} className="text-primary" />
              Tiếp theo là gì?
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-xs">
              <li className="flex gap-2 items-center">
                <Mail size={20} strokeWidth={3} className="text-primary" />
                <span>Kiểm tra email để nhận bản sao hồ sơ.</span>
              </li>
              <li className="flex gap-2 items-center">
                <Headset
                  size={16}
                  strokeWidth={2}
                  className="text-primary transition-colors hover:text-primary-dark"
                />
                <span>Liên hệ hỗ trợ trong vòng 24h nếu có sai sót.</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 w-full max-w-2xl">
            <button
              onClick={() => navigate("/")}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-primary/20 text-sm"
            >
              <Home size={18} strokeWidth={3} className="text-white" />
              Về trang chủ
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold h-12 rounded-xl transition-all text-sm">
              <FileText
                size={18}
                strokeWidth={3}
                className="text-slate-700 dark:text-slate-200"
              />
              Xem hồ sơ đã nộp
            </button>
          </div>

          <footer className="mt-12 text-slate-400 text-sm flex items-center gap-2 pb-10">
            <Lock size={18} strokeWidth={3} className="text-slate-400" />
            Thông tin của bạn được bảo mật theo tiêu chuẩn NEDU Security
          </footer>
        </main>
      </div>
    );
  }

  return null;
}
