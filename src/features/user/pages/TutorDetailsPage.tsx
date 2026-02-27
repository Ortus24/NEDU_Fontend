import React from "react";
import { Link, useParams } from "react-router-dom";

function TutorDetailsPage() {
  const { id } = useParams();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">
                school
              </span>
              <h1 className="text-xl font-bold tracking-tight">NEDU</h1>
            </Link>
            <div className="relative hidden lg:block w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="Tìm kiếm gia sư, khóa học..."
                type="text"
              />
            </div>
          </div>
          <nav className="flex items-center gap-8">
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              to="/tutor"
            >
              Duyệt gia sư
            </Link>
            <a
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Cách hoạt động
            </a>
            <a
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Bảng giá
            </a>
            <div className="flex items-center gap-3 ml-4">
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-bold bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-bold bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Đăng ký
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <section className="relative p-8 rounded-xl bg-gradient-to-br from-primary/10 via-white to-white dark:from-primary/20 dark:via-background-dark dark:to-background-dark border border-slate-200 dark:border-slate-800">
              <div className="flex gap-8 items-start">
                <div className="relative">
                  <div className="size-[120px] rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                    <img
                      className="w-full h-full object-cover"
                      alt="Professional tutor portrait photo"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqcudjRm9jISJnFIeL7vzmiypWvPpzxwNZihw45rz08l4oWZW1OkmQ42plXUCcp4dAda_zFZsKMEW0er4AFkiXKDHNqV81ow5Z4kYqBkHIZJwMTCTVTDcH1KiRuITDvtgqS7ms--7HBZ21qLQDc9wE6sOtWihdirp3KG5R-QZ0pNgu05kT2sv8AHeJhv-x70BiBoRcDdM5dG6oyr7QmMN1eGO1H2iBlf5Djw7spSfK04jH3RjYnNKTHKUPRDk7llI-XiSpxcv_WrQ"
                    />
                  </div>
                  <div
                    className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1 shadow-md border-2 border-white dark:border-slate-800 flex items-center justify-center"
                    title="eKYC Verified"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">
                      verified
                    </span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold">Nguyễn Văn Minh</h2>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                      ELITE TUTOR
                    </span>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-3">
                    British Council Experienced Tutor • 3 years experience
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-lg">
                      IELTS 8.5
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg">
                      English Academic
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg">
                      Communication
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined fill-1">
                        star
                      </span>
                      <span className="text-slate-900 dark:text-slate-100 text-lg">
                        4.9
                      </span>
                    </div>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-600 dark:text-slate-400">
                      134 đánh giá
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-600 dark:text-slate-400">
                      1.2k giờ dạy
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-black aspect-video relative group">
              <img
                className="w-full h-full object-cover opacity-60"
                alt="Educational video thumbnail with modern workspace"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyrX_xjef8WHdCslQ_PGKbJIGSqUWYZcLEudMhMpWXdW_pKNbllm7aPY0SkdR45CNC5UJyjlxQpSgxEKkmzxhmxgKHv6iiDGRRq6JkXk2uxo5Jp2xfQ0NJ2yLXgA8DvvWnvt9KV2f4etA6qjVF_3aU7F0sLuiQT09UR18EFVrxjuqyADnyLHoRoNVz4Wmo9toXoHF5KetWFgSW3pWwp6yUom598UaoFz02oKSaoEPfTX2YO-NgskCwcPZDuScNwOPBzpVFmkgymnI"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="size-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl fill-1">
                    play_arrow
                  </span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold text-lg">
                  Giới thiệu bản thân &amp; Phương pháp giảng dạy
                </h3>
                <p className="text-white/70 text-sm">2:45 • Video giới thiệu</p>
              </div>
            </section>

            <div className="border-b border-slate-200 dark:border-slate-800">
              <nav className="flex gap-10">
                <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary tracking-wide">
                  GIỚI THIỆU
                </button>
                <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-700 border-b-2 border-transparent tracking-wide">
                  LỘ TRÌNH MẪU
                </button>
                <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-700 border-b-2 border-transparent tracking-wide">
                  ĐÁNH GIÁ
                </button>
                <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-700 border-b-2 border-transparent tracking-wide">
                  LỊCH RẢNH
                </button>
              </nav>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    person
                  </span>
                  Về tôi
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Chào các bạn, mình là Minh, hiện đang là giảng viên tiếng Anh
                  tự do với hơn 3 năm kinh nghiệm luyện thi IELTS và tiếng Anh
                  giao tiếp. Mình từng làm việc tại British Council, nơi giúp
                  mình hoàn thiện kỹ năng sư phạm chuyên nghiệp. Phương pháp dạy
                  của mình tập trung vào việc hiểu bản chất ngôn ngữ thay vì học
                  thuộc lòng, giúp học viên tự tin giao tiếp và đạt điểm cao
                  trong các kỳ thi quốc tế.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    workspace_premium
                  </span>
                  Bằng cấp &amp; Chứng chỉ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="size-12 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center text-red-600">
                      <span className="material-symbols-outlined">
                        picture_as_pdf
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">
                        IELTS Overall 8.5 (2023)
                      </p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">
                        Chứng chỉ quốc tế
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">
                      download
                    </span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">
                        Bachelor of English Linguistics
                      </p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">
                        ĐH Ngoại Ngữ - ĐHQG HN
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">
                      download
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    history_edu
                  </span>
                  Kinh nghiệm giảng dạy
                </h3>
                <div className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 size-5 rounded-full bg-primary border-4 border-white dark:border-slate-900 shadow-sm"></div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">
                      Senior IELTS Tutor - British Council
                    </h4>
                    <p className="text-sm text-primary font-semibold mb-2">
                      2021 - Hiện tại
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Chịu trách nhiệm giảng dạy các lớp IELTS Intensive, trực
                      tiếp biên soạn giáo trình và hỗ trợ 500+ học viên đạt band
                      6.5+.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 size-5 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-900 shadow-sm"></div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">
                      Freelance English Teacher
                    </h4>
                    <p className="text-sm text-slate-500 font-semibold mb-2">
                      2020 - 2021
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Dạy kèm 1-1 cho các đối tượng mất gốc, sinh viên và người
                      đi làm bận rộn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-[400px]">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark shadow-xl shadow-primary/5">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">
                      Học phí từ
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary">
                        150.000₫
                      </span>
                      <span className="text-slate-400 text-sm">/giờ</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-950 text-green-600 rounded-lg text-xs font-bold">
                    <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                    Đang trực tuyến
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-slate-400">
                      bolt
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      Phản hồi trong 15 phút
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-slate-400">
                      event_available
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      Có 12 lịch trống trong tuần này
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-slate-400">
                      verified_user
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      Thanh toán an toàn qua NEDU
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">
                      calendar_month
                    </span>
                    Đặt học thử ngay
                  </button>
                  <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">
                      chat_bubble
                    </span>
                    Nhắn tin
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400 mt-6">
                  Học thử 30 phút chỉ từ 50.000₫
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
                <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-slate-500">
                  Thống kê nhanh
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-xs text-slate-500 mb-1">Học viên cũ</p>
                    <p className="text-lg font-bold">240+</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-xs text-slate-500 mb-1">
                      Tỉ lệ hoàn thành
                    </p>
                    <p className="text-lg font-bold text-green-500">99%</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Lộ trình mẫu của Minh</h3>
            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
              Xem tất cả{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="IELTS intensive course books and stationary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyU9JZ_MLMrK3E1PNYIl6sHYkxz8sEnaibqFFj2WuXcBvFPnI9JEPj05KLKhIdsVntExAxsIPik7x9EJ_l6n0-PjtbWB0d227p41D7Hvt9z7s-97OoKcK4YYLjzvLu_2jMuu-9uGtUkI5fqqa5kOsd4sJ81hugpKLga1-JcBinJnNk9fvdjMjqtazAeueJceOl6sia9tNiia-G3YSwnRYi0J7pIt37bbgTrFEh_Png4gzsbaI3uMdHp8MMOhgAUxcJLtzoznXNHfc"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg uppercase">
                  Bán chạy
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  IELTS 6.5 Intensive Program
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>{" "}
                    24 buổi
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      history
                    </span>{" "}
                    3 tháng
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-primary">4.500.000₫</div>
                  <button className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="People communicating in office environment"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfsCDLtg_ald03ZZPtRWb4sXYE3XZUdLbGO-mZX9-1YOegouUcJFrTnXeooQiApWuHB2-v_xG8fTtVf-3p86xxK1HZP8TEcWnVfMgsV24623FJFjk2y916RPrO3BlaHEn3WWT6pg4IFKyUWHi5d-vX1kQcJ697ceN8OE5G_7wf_nRCMDRBDZSTuJ4fszt83fHJ66iBHVi_fy03Q-XIUfHo-fNQPbDk7iGlo0QM30_D9xfzXrsU5GKQtCTrbaa2kLlModu7yDzqQwc"
                />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  Giao tiếp cho người đi làm
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>{" "}
                    12 buổi
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      history
                    </span>{" "}
                    1.5 tháng
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-primary">2.800.000₫</div>
                  <button className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Close up of pen and paper for writing"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqIqSH3LhtvEOnXRxlGBiK2DwsKPCcfk8fEmTW1wnQHWBCYP2HMvouFrS0YL-_XDpKoXM9eZnf_LkdqqutWy-WCbUj8impxRENc7bOMHTnNNeyO9XCYkfRvAYs8lK70giu1XtnlOfFwzM4wq3NdedlH0W_8YH-3uROw8R71_m-D-N0Qoxt0vrIkWGATVWzq4430KPkKFVD6e_fhNRa9vW_MoOIYkNcCphGPPSUO5yVeJL09vYhn78Xdys7QXdPxYFjZfsEz62ksM8"
                />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  Mastering IELTS Writing
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>{" "}
                    8 buổi
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      history
                    </span>{" "}
                    1 tháng
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-primary">1.600.000₫</div>
                  <button className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-8">
          <h3 className="text-2xl font-bold">Lịch rảnh trong tuần</h3>
          <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden p-6 shadow-sm">
            <div className="grid grid-cols-8 border-b border-slate-100 dark:border-slate-800 mb-4 pb-4">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Thời gian
              </div>
              <div className="text-center font-bold text-sm">Thứ 2</div>
              <div className="text-center font-bold text-sm">Thứ 3</div>
              <div className="text-center font-bold text-sm">Thứ 4</div>
              <div className="text-center font-bold text-sm">Thứ 5</div>
              <div className="text-center font-bold text-sm text-primary">
                Thứ 6
              </div>
              <div className="text-center font-bold text-sm">Thứ 7</div>
              <div className="text-center font-bold text-sm text-red-500">
                Chủ Nhật
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-8 items-center gap-2 h-10">
                <div className="text-xs text-slate-500">08:00 - 10:00</div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
              </div>
              <div className="grid grid-cols-8 items-center gap-2 h-10">
                <div className="text-xs text-slate-500">14:00 - 16:00</div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
              </div>
              <div className="grid grid-cols-8 items-center gap-2 h-10">
                <div className="text-xs text-slate-500">19:00 - 21:00</div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-green-100 dark:bg-green-950/40 rounded border border-green-200 dark:border-green-900/50 h-full"></div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded h-full"></div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="size-4 bg-green-100 dark:bg-green-950 rounded border border-green-200 dark:border-green-900"></div>
                <span className="text-xs text-slate-500">
                  Sẵn sàng nhận học viên
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-slate-50 dark:bg-slate-800 rounded"></div>
                <span className="text-xs text-slate-500">
                  Đã kín lịch/Không rảnh
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">
                school
              </span>
              <h2 className="text-xl font-bold tracking-tight">NEDU</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Nền tảng kết nối gia sư và học viên hàng đầu Việt Nam. Chất lượng
              và uy tín là ưu tiên hàng đầu của chúng tôi.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest">
              Dành cho học viên
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  to="/tutor"
                >
                  Tìm gia sư
                </Link>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Lộ trình học tập
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Đánh giá gia sư
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest">
              Dành cho gia sư
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Đăng ký dạy
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Quản lý lớp học
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Kinh nghiệm dạy
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest">
              Liên hệ
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>{" "}
                contact@nedu.vn
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">call</span>{" "}
                1900 1234
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          © 2024 NEDU Education Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default TutorDetailsPage;
