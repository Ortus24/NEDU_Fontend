import {
  ArrowRight,
  CalendarCheck,
  ChartLine,
  ShieldCheck,
  Star,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase w-fit">
                  Nâng tầm tri thức Việt
                </span>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] text-slate-900 dark:text-white">
                  Tìm Gia Sư Phù Hợp –{" "}
                  <span className="text-primary">Học Đúng Lộ Trình</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                  Hệ thống kết nối gia sư cá nhân hóa giúp học sinh nắm bắt kiến
                  thức hiệu quả và tối ưu thời gian học tập với lộ trình riêng
                  biệt.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/tutor"
                  className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                >
                  Tìm Gia Sư Ngay
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Đăng ký làm Gia sư
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    1,200+
                  </span>
                  <span className="text-sm text-slate-500">
                    Gia sư xác thực
                  </span>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    98%
                  </span>
                  <span className="text-sm text-slate-500">
                    Học sinh hài lòng
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  alt="Online Learning"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOI3wWbZ6waoHf8xzACfNqxDe4n-08OnixwFoGWLKaOwByfZ41L_FfInElcY6_ylaFlXU-AFrIXluH7WYn37fpDYPgupQrdql5f_Z1IgOUzBWW0TePp57J7-H6SlptWEzeLiWRojwpjxQauiPXxEOdS09hSUlTpE8IDOUVSL-ILTT5nPhPZzjUsJpOTaUY5BEC6Nxv0vdfFQWJf81sb49h6fhl-6d6-cwbzyYM7s3g2wz7MF6VPPouaPiOymKptuQED3YmItkTupc"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20">
                  <div className="size-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">videocam</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Buổi học Toán 12</p>
                    <p className="text-xs text-slate-500">
                      Gia sư: ThS. Nguyễn Văn A
                    </p>
                  </div>
                  <div className="ml-auto flex -space-x-2">
                    <div className="size-8 rounded-full border-2 border-white bg-slate-200"></div>
                    <div className="size-8 rounded-full border-2 border-white bg-slate-300"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 size-40 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 size-60 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Why Choose NEDU Section */}
        <section className="py-24 bg-white dark:bg-background-dark">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-black mb-4">Tại sao chọn NEDU?</h2>
              <p className="text-slate-500">
                Giải pháp học tập toàn diện, minh bạch và hiệu quả nhất cho học
                sinh Việt Nam
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck
                    size={30}
                    className="text-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Gia sư xác thực (eKYC)
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  100% hồ sơ gia sư được kiểm duyệt nghiêm ngặt qua căn cước
                  công dân và bằng cấp chuyên môn.
                </p>
              </div>
              <div className="p-10 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ChartLine
                    size={30}
                    className="text-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Lộ trình cá nhân hóa</h3>
                <p className="text-slate-500 leading-relaxed">
                  Chương trình học được thiết kế riêng biệt dựa trên kết quả bài
                  kiểm tra năng lực đầu vào.
                </p>
              </div>
              <div className="p-10 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CalendarCheck
                    size={30}
                    className="text-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Học thử miễn phí</h3>
                <p className="text-slate-500 leading-relaxed">
                  Trải nghiệm 30 phút học thử hoàn toàn miễn phí để đảm bảo sự
                  phù hợp giữa gia sư và học sinh.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-background-light dark:bg-slate-950">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <div className="mb-16">
              <h2 className="text-4xl font-black mb-4">
                Quy trình 4 bước đơn giản
              </h2>
              <p className="text-slate-500">
                Bắt đầu hành trình chinh phục tri thức chỉ trong vài phút
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>

              <div className="relative z-10 flex flex-col items-center text-center gap-6 bg-background-light dark:bg-slate-950 px-4">
                <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-black border-8 border-background-light dark:border-slate-950">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Tìm gia sư</h4>
                  <p className="text-sm text-slate-500">
                    Lọc theo môn học, trình độ và mức học phí mong muốn.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center gap-6 bg-background-light dark:bg-slate-950 px-4">
                <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-black border-8 border-background-light dark:border-slate-950">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Đặt lịch học thử</h4>
                  <p className="text-sm text-slate-500">
                    Chọn khung giờ rảnh và gửi yêu cầu học thử miễn phí.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center gap-6 bg-background-light dark:bg-slate-950 px-4">
                <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-black border-8 border-background-light dark:border-slate-950">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Nhận lộ trình</h4>
                  <p className="text-sm text-slate-500">
                    Gia sư thiết kế lộ trình học riêng biệt cho bạn.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center gap-6 bg-background-light dark:bg-slate-950 px-4">
                <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-black border-8 border-background-light dark:border-slate-950">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Bắt đầu học</h4>
                  <p className="text-sm text-slate-500">
                    Thanh toán an toàn và bắt đầu buổi học đầu tiên.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tutors Section */}
        <section className="py-24 bg-white dark:bg-background-dark">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-black mb-4">Gia sư nổi bật</h2>
                <p className="text-slate-500">
                  Đội ngũ gia sư xuất sắc từ các trường đại học hàng đầu
                </p>
              </div>
              <button className="text-primary font-bold flex items-center gap-2 hover:underline">
                Xem tất cả{" "}
                <ArrowRight
                  size={24}
                  strokeWidth={2}
                  className="text-primary transition-transform hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Tutor 1 */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img
                    alt="Tutor"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBLf-BY3B5f3wL-UBsF3NfpWxFCupty4_RkdwUZC9DqAX-Gv8Hq9gnzZbQY2I_zv3IEOiB8R-AiE2v3yGw4O27b0nBaam63hHL0yArgsJ8mRbmVelEkGUIrLGyzsikvnN_nCSU23VnauvOxsj-rpzVQtMfeHlzUSVHLNuAcKWeBq_IzONFdAfw-s7UCo1uCYEUtY4cQwX3XGnU3IookHCDWMYjQXCBg4XGQf-GZtDdnyEmT1WbFtGkagInvvi-BqWp9auXXLRkPUE"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold">
                    <Star
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />{" "}
                    4.9
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary text-xs font-bold uppercase mb-1">
                    Tiếng Anh • IELTS
                  </p>
                  <h4 className="text-lg font-bold mb-2">Trần Thị Minh Anh</h4>
                  <p className="text-slate-500 text-sm mb-4">
                    Đại học Ngoại Thương • 8.5 IELTS
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="font-bold">
                      250k
                      <span className="text-slate-400 text-xs font-normal">
                        /buổi
                      </span>
                    </p>
                    <button className="px-4 py-2 bg-primary/10 text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Xem profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Tutor 2 */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img
                    alt="Tutor"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFwLf2O_7_PCZRH2K3HBN_3wJJAmTgcGUdZlJbVtnNf9gY0tktgmXzK6_PCAiUv-cKBqAs-YcxucBw8oPW2G3QQ_MQx6XvnyHTAFhH3M12JI01SCfJdJTtnxkfh9ao8wrJVnCWC4qT-nveZuGyE9r22w65ey2Vz_IlbKjv7UQlYhYa3RKtd2z8YjhMOpx80h-TA3ugjBOikda3e0lQwu8MQlJugMjffQh7eAUvkp29V5YHeZq-hyQ7kYj_-0bryyONSs-T0JdDQpk"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold">
                    <Star
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />{" "}
                    5.0
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary text-xs font-bold uppercase mb-1">
                    Toán học • Lý học
                  </p>
                  <h4 className="text-lg font-bold mb-2">Nguyễn Hoàng Nam</h4>
                  <p className="text-slate-500 text-sm mb-4">
                    ĐH Bách Khoa Hà Nội • Giải Quốc gia
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="font-bold">
                      300k
                      <span className="text-slate-400 text-xs font-normal">
                        /buổi
                      </span>
                    </p>
                    <button className="px-4 py-2 bg-primary/10 text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Xem profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Tutor 3 */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img
                    alt="Tutor"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM-BPrn8v0eCavFwQHIvNsPlKsbBNIe_uGUCYVdUwCXQOrRsdK5g35lmyfGcuIjw1hVKb-vKrRv8DkSKois4KwGotpGQKcxy4hIh3Tb8U3TiOZvoJcjnUsWqH-nnFGtENQZOvrHENzx197fY2wiAilRG2l5LE2yV68HEdbhtGcVpP9NP0BOxBwisE-jVjlsu_cCtSD0XpgxAqVTlcc0wi7sc60gwIlsZJ3H4l6oJVAMz1PahbqPmAnC9hIWwXVGt2c3hsFqvmP4pY"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold">
                    <Star
                      size={14} // Tương đương text-sm (khoảng 14-16px)
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />{" "}
                    4.8
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary text-xs font-bold uppercase mb-1">
                    Ngữ văn • Lịch sử
                  </p>
                  <h4 className="text-lg font-bold mb-2">Phạm Quỳnh Hoa</h4>
                  <p className="text-slate-500 text-sm mb-4">
                    ĐH Sư phạm Hà Nội • Thạc sĩ GD
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="font-bold">
                      220k
                      <span className="text-slate-400 text-xs font-normal">
                        /buổi
                      </span>
                    </p>
                    <button className="px-4 py-2 bg-primary/10 text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Xem profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Tutor 4 */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img
                    alt="Tutor"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxfnejoEW-R5M_ocEDiMvGXOWsrXcEgw84FLPzQOi5ZIGpuETYv8dcfjJfsHlXyhyQsBPx4_4N9c0hCYaBXNtmHvZhlt79_DHspNZvftSLaIFKLssE9rn9Jl8FPeEhcinsKJecBJFDi5WAzMCXQKAH6UU6PJmoXOmP6gy9RduNnUb1Rp_W2lJbwHu9dDFPiFrFegsza4hKMpTPDY2KLvdFi2bSsTiStjgXqEkY_CSu2svvfTzN1Go2lO5rDC3LwTPJ80UK1nSenZU"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold">
                    <Star
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />{" "}
                    4.9
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary text-xs font-bold uppercase mb-1">
                    Lập trình • Tin học
                  </p>
                  <h4 className="text-lg font-bold mb-2">Lê Quang Mạnh</h4>
                  <p className="text-slate-500 text-sm mb-4">
                    ĐH FPT • Software Engineer
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="font-bold">
                      350k
                      <span className="text-slate-400 text-xs font-normal">
                        /buổi
                      </span>
                    </p>
                    <button className="px-4 py-2 bg-primary/10 text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Xem profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-background-light dark:bg-slate-950">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <div className="grid lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1">
                <h2 className="text-4xl font-black mb-6">
                  Học sinh &amp; Phụ huynh nói gì?
                </h2>
                <p className="text-slate-500 mb-8">
                  Hơn 5,000 học sinh đã cải thiện điểm số vượt bậc sau khi học
                  cùng gia sư tại NEDU.
                </p>
                <div className="flex -space-x-3">
                  <div className="size-12 rounded-full border-4 border-background-light bg-slate-200"></div>
                  <div className="size-12 rounded-full border-4 border-background-light bg-slate-300"></div>
                  <div className="size-12 rounded-full border-4 border-background-light bg-slate-400"></div>
                  <div className="size-12 rounded-full border-4 border-background-light bg-primary flex items-center justify-center text-white text-xs font-bold">
                    +2k
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-50 dark:border-slate-800">
                  <div className="flex gap-1 text-yellow-500 mb-4">
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 italic">
                    "Con tôi từ một học sinh sợ môn Tiếng Anh đã trở nên tự tin
                    hơn hẳn. Gia sư rất tận tâm và lộ trình học bám sát chương
                    trình trên lớp."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                      H
                    </div>
                    <div>
                      <p className="font-bold">Chị Hoàng Yến</p>
                      <p className="text-xs text-slate-400">
                        Phụ huynh bé lớp 9
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-50 dark:border-slate-800">
                  <div className="flex gap-1 text-yellow-500 mb-4">
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 italic">
                    "Em đã đạt được mục tiêu 8.0 IELTS nhờ sự hướng dẫn của thầy
                    Nam. Các buổi học rất thú vị và em được thực hành nghe nói
                    liên tục."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                      K
                    </div>
                    <div>
                      <p className="font-bold">Tuấn Kiệt</p>
                      <p className="text-xs text-slate-400">Học sinh lớp 12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-20 py-12">
          <div className="bg-primary rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                Bắt đầu hành trình học tập ngay hôm nay
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Đừng để hổng kiến thức cản trở tương lai của bạn. Đăng ký nhận
                tư vấn và học thử miễn phí cùng NEDU ngay bây giờ!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-10 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                  Đăng ký ngay
                </button>
                <button className="px-10 py-4 bg-primary/20 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-primary/30 transition-all">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 size-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 size-60 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
