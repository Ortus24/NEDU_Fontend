import React, { useState } from "react";
import { Link } from "react-router-dom";

function TutorPage() {
  const [selectedDays, setSelectedDays] = useState(["T2", "T5"]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-3xl font-bold">
                  school
                </span>
                <h1 className="text-2xl font-bold tracking-tight">NEDU</h1>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/tutor"
                  className="text-sm font-semibold hover:text-primary transition-colors text-primary"
                >
                  Tìm gia sư
                </Link>
                <a
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Lớp học mới
                </a>
                <a
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Trở thành gia sư
                </a>
                <a
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Tin tức
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Đăng nhập
              </Link>
              <button className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Header Section */}
      <section className="bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="relative flex items-center mb-6">
              <div className="absolute left-4 text-slate-400 flex items-center">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="w-full pl-12 pr-32 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none text-lg"
                placeholder="Tìm theo môn học, tên gia sư..."
                type="text"
              />
              <button className="absolute right-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center">
                Tìm kiếm
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500 mr-2">
                Gợi ý phổ biến:
              </span>
              <button className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full hover:bg-primary/20 transition-colors">
                Toán
              </button>
              <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full hover:bg-slate-200 transition-colors">
                IELTS
              </button>
              <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full hover:bg-slate-200 transition-colors">
                Tiếng Anh
              </button>
              <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full hover:bg-slate-200 transition-colors">
                Ngữ văn
              </button>
              <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full hover:bg-slate-200 transition-colors">
                Vật lý
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter Panel */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">filter_list</span>{" "}
                  Bộ lọc
                </h2>
                <button className="text-sm font-medium text-primary hover:underline">
                  Xóa tất cả
                </button>
              </div>

              {/* Môn học */}
              <div className="mb-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">
                  Môn học
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      defaultChecked
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">
                      Toán học
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">
                      Tiếng Anh
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">
                      Ngữ văn
                    </span>
                  </label>
                </div>
              </div>

              {/* Học phí slider */}
              <div className="mb-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">
                  Học phí / buổi
                </h3>
                <input
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary mb-2"
                  max="500"
                  min="50"
                  type="range"
                  defaultValue="250"
                />
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>50k</span>
                  <span>500k</span>
                </div>
              </div>

              {/* Đánh giá */}
              <div className="mb-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">
                  Đánh giá
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-5 h-5 border-slate-300 text-primary focus:ring-primary"
                      name="rating"
                      type="radio"
                    />
                    <div className="flex items-center gap-1 text-orange-400">
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="text-slate-600 text-sm ml-1">5.0</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-5 h-5 border-slate-300 text-primary focus:ring-primary"
                      name="rating"
                      type="radio"
                    />
                    <div className="flex items-center gap-1 text-orange-400">
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm text-slate-300">
                        star
                      </span>
                      <span className="text-slate-600 text-sm ml-1">4.0+</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Ngày dạy */}
              <div className="mb-8">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">
                  Ngày dạy
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => {
                    const isSelected = selectedDays.includes(day);
                    const isWeekend = day === "CN";

                    return (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`w-full aspect-square text-[10px] font-bold rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-primary text-white"
                            : `bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 ${isWeekend ? "text-red-500" : "text-slate-700 dark:text-slate-300"}`
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center justify-center">
                Áp dụng bộ lọc
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white dark:bg-background-dark p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="font-medium text-slate-600 dark:text-slate-400">
                Hiển thị{" "}
                <span className="text-slate-900 dark:text-white font-bold">
                  48
                </span>{" "}
                kết quả tìm kiếm
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Sắp xếp theo:</span>
                <select className="text-sm font-semibold bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-primary min-w-[160px] p-2 focus:outline-none">
                  <option>Phù hợp nhất</option>
                  <option>Đánh giá cao nhất</option>
                  <option>Học phí: Thấp - Cao</option>
                  <option>Học phí: Cao - Thấp</option>
                </select>
              </div>
            </div>

            {/* Tutor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Tutor Card 1 */}
              <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col hover:shadow-xl transition-shadow group">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      className="size-16 rounded-full object-cover"
                      data-alt="Female tutor profile headshot"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe6cd7ZzasOV2ydUQJUimMrpCa-u1_O6hlPf23qMcffV1EFGWa8OO4E3vTnrjRKGhxIdle4YBkeUnp7sxkUKS4u27t92Au9x6ipnL6L3N3mfuuBVxHWwDq6bQvKF4LzZxX6s2bAmUJJOh1Rua5AivRX4aWuS4KoXQjtBmqdo-iv59sh8SECTe-dgWrJvrzNkRKVgMhnGzV9cXFyZ3PkufIeSFi_dMl5LVvI6PWHURTxxYj2JXPcZX3W6lsilMc3jQx3g_9lw8gPqA"
                      alt="Tutor"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full flex items-center justify-center p-0.5 border-2 border-white dark:border-background-dark">
                      <span className="material-symbols-outlined text-[12px] font-bold">
                        check
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-orange-400 text-sm">
                      star
                    </span>
                    <span className="text-xs font-bold text-orange-600">
                      4.9
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (120)
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Nguyễn Thu Hà
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>{" "}
                  Cầu Giấy, Hà Nội
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase flex items-center">
                    Toán học
                  </span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase flex items-center">
                    Luyện thi ĐH
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 italic">
                  "5 năm kinh nghiệm luyện thi khối A. Giúp học sinh nắm vững
                  bản thân thông qua phương pháp sơ đồ tư duy."
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      Kinh nghiệm
                    </p>
                    <p className="text-sm font-bold">5 Năm</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      Học phí
                    </p>
                    <p className="text-sm font-bold text-primary">250k/buổi</p>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="w-full flex items-center justify-center py-2.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Hồ sơ
                  </button>
                  <button className="w-full flex items-center justify-center py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
                    Học thử
                  </button>
                </div>
              </div>

              {/* Tutor Card 2 */}
              <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col hover:shadow-xl transition-shadow group">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      className="size-16 rounded-full object-cover"
                      data-alt="Male tutor profile headshot"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVIqQ0Do1hnJCu-cz-GX9QOb6nmBUN6UVs6NO_-sG-MBklR6dbvgaIuxYZ7tMTybPd_IcOAweLm_hyJ05inQ5mswqyq_8hZwXZP8CZDvjXEQmR2C5qflBXyDwNFRw_Pj_hfE8MnJQojmnQ0luPlW6PJxSRXONb4Z_0h2O986ZY58kD8_TuOF7AY1kF_oPlUdHvXpoo7xQHcaxW9eLFgVaONoHvRW5niOG__UHETz668NjxpdaFhPHbKsncMa3xtLbUYAK_KuOPhhE"
                      alt="Tutor"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full flex items-center justify-center p-0.5 border-2 border-white dark:border-background-dark">
                      <span className="material-symbols-outlined text-[12px] font-bold">
                        check
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-orange-400 text-sm">
                      star
                    </span>
                    <span className="text-xs font-bold text-orange-600">
                      5.0
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (84)
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Trần Văn Tú
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>{" "}
                  Quận 1, TP. HCM
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase flex items-center">
                    IELTS 8.5
                  </span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase flex items-center">
                    Tiếng Anh
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 italic">
                  "Chuyên luyện Speaking &amp; Writing với giáo trình cá nhân
                  hóa. Đã giúp &gt;50 học viên đạt target."
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      Kinh nghiệm
                    </p>
                    <p className="text-sm font-bold">3 Năm</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      Học phí
                    </p>
                    <p className="text-sm font-bold text-primary">400k/buổi</p>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="w-full flex items-center justify-center py-2.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Hồ sơ
                  </button>
                  <button className="w-full flex items-center justify-center py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
                    Học thử
                  </button>
                </div>
              </div>

              {/* Tutor Card 3 */}
              <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col hover:shadow-xl transition-shadow group">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      className="size-16 rounded-full object-cover"
                      data-alt="Academic female tutor avatar"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj-FJdT2NQqmO5mHVvh3ct0Zb-BYjWAuyfA0wU0oyw7Fm1SxvuYojAWsxIEwSr86x65HwYnfmWVAWkB_HlqqMCIL25zjOT_fFbsWMDQJXqHuUJaXLHzHFXmdEn4tC6dfK3ABEnzdK9ZS8ubn_jBdmRSHCOuN8IJeoyxlrUlyD78aHd7WxEPQq7UgzDkJAmH4V8tQdjrXZ0wJUzjeWmJFS-oi0fTxEar60xJN1wF0U9xdCKzhMzVa_OXi7IuUMHpyAhnvhF6SjBuzo"
                      alt="Tutor"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full flex items-center justify-center p-0.5 border-2 border-white dark:border-background-dark">
                      <span className="material-symbols-outlined text-[12px] font-bold">
                        check
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-orange-400 text-sm">
                      star
                    </span>
                    <span className="text-xs font-bold text-orange-600">
                      4.8
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (215)
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Lê Minh Trang
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>{" "}
                  Hải Châu, Đà Nẵng
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase flex items-center">
                    Vật lý
                  </span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase flex items-center">
                    Hóa học
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 italic">
                  "Giảng viên trường chuyên với đam mê truyền cảm hứng khoa học
                  cho học sinh phổ thông."
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      Kinh nghiệm
                    </p>
                    <p className="text-sm font-bold">10 Năm</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      Học phí
                    </p>
                    <p className="text-sm font-bold text-primary">300k/buổi</p>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="w-full flex items-center justify-center py-2.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Hồ sơ
                  </button>
                  <button className="w-full flex items-center justify-center py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
                    Học thử
                  </button>
                </div>
              </div>

              {/* Tutor Card 4 */}
              <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col hover:shadow-xl transition-shadow group">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      className="size-16 rounded-full object-cover"
                      data-alt="Male teacher profile photo"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1yVnUMPDU-e9IzmxbDPB2rrPxw5MGbKWlwQHwUF0pwUXtVlmmo6w8dqHeyx0rFFKbGwI6bJ0iISGrrgI1xcDVV1THXGfdvfGJW9fTcZShjZyhq4TSdA8AOG21LKeiiOoKT4PxB51VmkSMZeo0HN9w2HfOAqrU01QCd0gtsj_7B2dWbyqwA3PeYBg9EK4pUFrPkRbKFwlJRufmbQbCU5wy_EyQk5SpNm9-FwwD8sZVQERFk6oaSS0_-JL-Z4HVj0_kzfi8qfCj6EM"
                      alt="Tutor"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full flex items-center justify-center p-0.5 border-2 border-white dark:border-background-dark">
                      <span className="material-symbols-outlined text-[12px] font-bold">
                        check
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-orange-400 text-sm">
                      star
                    </span>
                    <span className="text-xs font-bold text-orange-600">
                      4.7
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (42)
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Hoàng Anh Đức
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>{" "}
                  Đống Đa, Hà Nội
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase flex items-center">
                    Tin học
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 italic">
                  "Hỗ trợ lập trình Python, C++ cơ bản và nâng cao cho mọi lứa
                  tuổi."
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      Kinh nghiệm
                    </p>
                    <p className="text-sm font-bold">2 Năm</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      Học phí
                    </p>
                    <p className="text-sm font-bold text-primary">200k/buổi</p>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="w-full flex items-center justify-center py-2.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Hồ sơ
                  </button>
                  <button className="w-full flex items-center justify-center py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
                    Học thử
                  </button>
                </div>
              </div>

              {/* Pagination */}
              <nav className="flex justify-center mt-12 md:col-span-2 xl:col-span-3">
                <ul className="flex items-center gap-2">
                  <li>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary">
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold">
                      1
                    </button>
                  </li>
                  <li>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary font-bold">
                      2
                    </button>
                  </li>
                  <li>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary font-bold">
                      3
                    </button>
                  </li>
                  <li className="px-2 text-slate-400 font-bold">...</li>
                  <li>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary font-bold">
                      12
                    </button>
                  </li>
                  <li>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-background-dark flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 text-primary opacity-50">
              <span className="material-symbols-outlined text-2xl font-bold">
                school
              </span>
              <h1 className="text-xl font-bold tracking-tight">NEDU</h1>
            </div>
            <div className="flex gap-8 text-sm text-slate-500 font-medium">
              <a className="hover:text-primary" href="#">
                Về chúng tôi
              </a>
              <a className="hover:text-primary" href="#">
                Chính sách bảo mật
              </a>
              <a className="hover:text-primary" href="#">
                Điều khoản sử dụng
              </a>
              <a className="hover:text-primary" href="#">
                Liên hệ
              </a>
            </div>
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary cursor-pointer">
                <span className="material-symbols-outlined">
                  social_leaderboard
                </span>
              </span>
              <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary cursor-pointer">
                <span className="material-symbols-outlined">mail</span>
              </span>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-8">
            © 2024 NEDU Online Tutoring Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default TutorPage;
