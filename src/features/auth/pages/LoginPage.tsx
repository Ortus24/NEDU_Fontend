import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// --- Sub-component: Icon Eye (Lucide-like) ---
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

// --- Component: Login Page ---
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100">
      {/* Left Side: Visual & Brand (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]"></div>

        <div className="absolute inset-0 z-0">
          <img
            alt="Students studying"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
          />
          {/* Gradient Overlay for professional look */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 via-indigo-800/60 to-transparent mix-blend-multiply"></div>
        </div>

        {/* Content over image */}
        <div className="relative z-10 w-full flex flex-col justify-between p-16 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/30">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 48 48"
              >
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
              </svg>
            </div>
            <Link to="/">
              <span className="text-2xl font-bold tracking-tight">Nedu</span>
            </Link>
          </div>

          <div className="max-w-xl">
            <h1 className="text-5xl xl:text-6xl font-extrabold leading-[1.1] mb-6 drop-shadow-sm">
              Unlock Your Potential <br />
              <span className="text-blue-300">With Expert Guidance.</span>
            </h1>
            <p className="text-lg text-blue-50/90 leading-relaxed font-light mb-8 max-w-md">
              Join the world's most supportive learning community. Master
              skills, build projects, and advance your career.
            </p>

            {/* Floating Testimonial Card */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-blue-500/50 object-cover"
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  />
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold">50,000+ Students</div>
                <div className="text-xs text-blue-200">
                  Joined this month alone
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-blue-100/60">
            © 2024 EduConnect Inc. Built for the future of education.
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col bg-white dark:bg-slate-900 shadow-[-20px_0_50px_-20px_rgba(0,0,0,0.1)]">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            EduConnect
          </div>
          <Link to="/signup" className="text-sm font-semibold text-blue-600">
            Sign Up
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-12">
          <div className="w-full max-w-[440px] mx-auto">
            {/* Header Text */}
            <div className="mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                Welcome back
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Welcome back! Please enter your details to continue your
                learning journey.
              </p>
            </div>

            {/* Social Login */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button className="flex-1 flex items-center justify-center gap-3 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  className="w-5 h-5"
                  alt="Facebook"
                />
                Facebook
              </button>
            </div>

            <div className="relative mb-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
              </div>
              <span className="relative px-4 bg-white dark:bg-slate-900 text-xs font-bold uppercase tracking-widest text-slate-400">
                Or email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label
                    className="text-sm font-bold text-slate-700 dark:text-slate-300"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-slate-500 dark:text-slate-400 cursor-pointer select-none"
                >
                  Keep me signed in
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                Sign In
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                New to EduConnect?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 mt-auto flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-slate-50 dark:border-slate-800 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <a
            href="#"
            className="hover:text-slate-600 dark:hover:text-slate-200"
          >
            Support
          </a>
          <a
            href="#"
            className="hover:text-slate-600 dark:hover:text-slate-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-slate-600 dark:hover:text-slate-200"
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
