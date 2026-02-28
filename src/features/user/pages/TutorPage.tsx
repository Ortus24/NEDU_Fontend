import React, { useState, useMemo } from "react";
import { mockTutors } from "../data/tutors";
import { TutorCard } from "../components/TutorCard";
import { ChevronLeft, ChevronRight, Filter, Search, Star } from "lucide-react";
const SUBJECTS = [
  "Toán học",
  "Tiếng Anh",
  "Ngữ văn",
  "Vật lý",
  "Hóa học",
  "Tin học",
  "Sinh học",
];

function TutorPage() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("Phù hợp nhất");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const tutorsPerPage = 6;

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
    setCurrentPage(1);
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedSubjects([]);
    setSelectedDays([]);
    setPriceRange([50, 500]);
    setSelectedRating(null);
    setSearchQuery("");
    setSortBy("Phù hợp nhất");
    setCurrentPage(1);
  };

  const filteredAndSortedTutors = useMemo(() => {
    let result = mockTutors.filter((tutor) => {
      // Search Query filter
      if (
        searchQuery &&
        !tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tutor.subjects.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      ) {
        return false;
      }

      // Subjects filter
      if (
        selectedSubjects.length > 0 &&
        !tutor.subjects.some((s) => selectedSubjects.includes(s))
      ) {
        return false;
      }

      // Price range filter
      if (
        tutor.pricePerSession < priceRange[0] ||
        tutor.pricePerSession > priceRange[1]
      ) {
        return false;
      }

      // Rating filter
      if (selectedRating !== null && tutor.rating < selectedRating) {
        return false;
      }

      // Days filter
      if (
        selectedDays.length > 0 &&
        !selectedDays.some((d) => tutor.availableDays.includes(d))
      ) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "Đánh giá cao nhất") return b.rating - a.rating;
      if (sortBy === "Học phí: Thấp - Cao")
        return a.pricePerSession - b.pricePerSession;
      if (sortBy === "Học phí: Cao - Thấp")
        return b.pricePerSession - a.pricePerSession;
      return 0; // "Phù hợp nhất" -> Giữ nguyên (hoặc tuỳ chỉnh)
    });

    return result;
  }, [
    selectedSubjects,
    priceRange,
    selectedRating,
    selectedDays,
    sortBy,
    searchQuery,
  ]);

  const totalPages = Math.ceil(filteredAndSortedTutors.length / tutorsPerPage);
  const currentTutors = filteredAndSortedTutors.slice(
    (currentPage - 1) * tutorsPerPage,
    currentPage * tutorsPerPage,
  );

  return (
    <>
      {/* Search Header Section */}
      <section className="bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="relative flex items-center mb-6">
              <div className="absolute left-4 text-slate-400 flex items-center">
                <Search
                  size={20}
                  strokeWidth={2}
                  className="text-gray-500 hover:text-primary transition-colors"
                />
              </div>
              <input
                className="w-full pl-12 pr-32 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none text-lg"
                placeholder="Tìm theo môn học, tên gia sư..."
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <button className="absolute right-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center">
                Tìm kiếm
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500 mr-2">
                Gợi ý phổ biến:
              </span>
              {["Toán", "IELTS", "Tiếng Anh", "Ngữ văn", "Vật lý"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSearchQuery(s);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full hover:bg-slate-200 transition-colors"
                >
                  {s}
                </button>
              ))}
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
                  <Filter
                    size={20}
                    strokeWidth={2}
                    className="text-gray-500 hover:text-primary transition-colors"
                  />
                  Bộ lọc
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Xóa tất cả
                </button>
              </div>

              {/* Môn học */}
              <div className="mb-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">
                  Môn học
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                  {SUBJECTS.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        checked={selectedSubjects.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                        type="checkbox"
                      />
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {subject}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Học phí range */}
              <div className="mb-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3">
                  Học phí / buổi ({priceRange[0]}k - {priceRange[1]}k)
                </h3>
                <div className="relative h-6 flex items-center mb-2">
                  <div className="absolute w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  <div
                    className="absolute h-1.5 bg-primary rounded-lg"
                    style={{
                      left: `${((priceRange[0] - 50) / 450) * 100}%`,
                      right: `${100 - ((priceRange[1] - 50) / 450) * 100}%`,
                    }}
                  ></div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val <= priceRange[1]) {
                        setPriceRange([val, priceRange[1]]);
                        setCurrentPage(1);
                      }
                    }}
                    className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-primary/40 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:shadow-primary/40 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
                  />
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= priceRange[0]) {
                        setPriceRange([priceRange[0], val]);
                        setCurrentPage(1);
                      }
                    }}
                    className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-primary/40 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:shadow-primary/40 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
                  />
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500">
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
                      checked={selectedRating === null}
                      onChange={() => {
                        setSelectedRating(null);
                        setCurrentPage(1);
                      }}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
                      Tất cả
                    </span>
                  </label>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1 rounded-md transition-colors"
                    >
                      <input
                        className="w-5 h-5 border-slate-300 text-primary focus:ring-primary cursor-pointer"
                        name="rating"
                        type="radio"
                        checked={selectedRating === rating}
                        onChange={() => {
                          setSelectedRating(rating);
                          setCurrentPage(1);
                        }}
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16} // Tương đương text-sm
                            // Tối ưu: fill (đổ màu nền) cho sao được chọn, stroke (viền) cho sao chưa chọn
                            className={`${
                              i < rating
                                ? "text-orange-400 fill-orange-400"
                                : "text-slate-300 dark:text-slate-700"
                            }`}
                          />
                        ))}
                        <span className="text-slate-600 dark:text-slate-400 text-sm ml-1 font-medium">
                          {rating === 5 ? "5.0" : `${rating}.0+`}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ngày dạy */}
              <div className="mb-0">
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
                            : `bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 ${
                                isWeekend
                                  ? "text-red-500"
                                  : "text-slate-700 dark:text-slate-300"
                              }`
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white dark:bg-background-dark p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="font-medium text-slate-600 dark:text-slate-400">
                Hiển thị{" "}
                <span className="text-slate-900 dark:text-white font-bold">
                  {filteredAndSortedTutors.length}
                </span>{" "}
                kết quả tìm kiếm
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Sắp xếp theo:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-sm font-semibold bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-primary min-w-[160px] p-2 focus:outline-none"
                >
                  <option>Phù hợp nhất</option>
                  <option>Đánh giá cao nhất</option>
                  <option>Học phí: Thấp - Cao</option>
                  <option>Học phí: Cao - Thấp</option>
                </select>
              </div>
            </div>

            {/* Tutor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentTutors.length > 0 ? (
                currentTutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                    search_off
                  </span>
                  <p className="font-medium">
                    Không tìm thấy gia sư phù hợp với bộ lọc.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="flex justify-center mt-12 md:col-span-full">
                <ul className="flex items-center gap-2">
                  <li>
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-600"
                    >
                      <ChevronLeft
                        size={24}
                        strokeWidth={2}
                        className="text-slate-600 hover:text-primary transition-all active:scale-90"
                      />
                    </button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold ${
                          currentPage === i + 1
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary"
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-600"
                    >
                      <ChevronRight
                        size={24}
                        strokeWidth={2}
                        className="text-slate-600 hover:text-primary transition-all active:scale-90"
                      />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default TutorPage;
