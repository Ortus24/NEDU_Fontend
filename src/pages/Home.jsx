import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-white text-slate-900 font-display min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Navbar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-100 px-6 py-4 lg:px-20">
          <div className="flex items-center gap-4 text-slate-900">
            <div className="w-8 h-8 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">
              EduTutor
            </h2>
          </div>
          <div className="hidden lg:flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9">
              <a
                className="text-slate-900 hover:text-primary transition-colors text-sm font-medium leading-normal"
                href="#"
              >
                Find Tutors
              </a>
              <a
                className="text-slate-900 hover:text-primary transition-colors text-sm font-medium leading-normal"
                href="#"
              >
                Become a Tutor
              </a>
              <a
                className="text-slate-900 hover:text-primary transition-colors text-sm font-medium leading-normal"
                href="#"
              >
                About Us
              </a>
            </nav>
            <div className="flex gap-2">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-[#0e45b8] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
                <span className="truncate">Sign Up</span>
              </button>
              <Link
                to="/login"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
              >
                <span className="truncate">Login</span>
              </Link>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button className="lg:hidden text-slate-900">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <main className="flex-1">
          <div className="px-4 lg:px-20 py-8">
            <div className="mx-auto max-w-7xl">
              {/* Hero Section */}
              <div
                className="relative overflow-hidden rounded-xl bg-slate-900 text-white min-h-[500px] flex flex-col items-center justify-center p-8 text-center bg-cover bg-center"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0Q_r8BCnHQhpSmLr0CHrYK2o1PntxUxsrP3cm-hZ2gmGFfLU7RhZOTr5Q9Ytn4XG7yU1mHlUcf6H05j_R__O4BxYIn0r_FzJIFdsogM3LNerIrPIpyr3Vy57cUxFexsKxY1DEJbL-CwNIcbLaK1IuDfznfjyJnWFeuI6rHUQPBK-Zy7jv_imcEDdzrw49q1lCjJAxCb79CcKiNuzKGnVhYcc9S1wMXE6d4UPFSQBB1eOpVwH_dChDmv_HryUoMBYAzOurSYsYJig")',
                }}
              >
                <div className="relative z-10 max-w-3xl flex flex-col gap-6 items-center">
                  <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                    Find your perfect tutor today
                  </h1>
                  <h2 className="text-lg lg:text-xl font-normal text-slate-200 max-w-2xl">
                    Master any subject with expert tutors from around the world.
                    Personalized learning at your own pace.
                  </h2>
                  <div className="w-full max-w-xl mt-4">
                    <div className="flex w-full items-center rounded-lg bg-white p-2 shadow-lg">
                      <div className="flex items-center justify-center pl-3 text-slate-500">
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </div>
                      <input
                        className="flex-1 bg-transparent border-0 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-base"
                        placeholder="What do you want to learn?"
                        type="text"
                      />
                      <button className="hidden sm:flex h-12 items-center justify-center rounded-lg bg-primary hover:bg-[#0e45b8] px-8 text-base font-bold text-white transition-colors">
                        Search
                      </button>
                    </div>
                    <button className="sm:hidden mt-3 w-full h-12 items-center justify-center rounded-lg bg-primary hover:bg-[#0e45b8] px-8 text-base font-bold text-white transition-colors">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Subjects Grid */}
              <div className="py-12">
                <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight mb-6">
                  Browse by Subject
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* Subject Item */}
                  <a
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-50 p-6 hover:bg-slate-100 transition-colors"
                    href="#"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        calculate
                      </span>
                    </div>
                    <span className="font-medium text-slate-900">
                      Mathematics
                    </span>
                  </a>
                  <a
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-50 p-6 hover:bg-slate-100 transition-colors"
                    href="#"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>
                    </div>
                    <span className="font-medium text-slate-900">English</span>
                  </a>
                  <a
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-50 p-6 hover:bg-slate-100 transition-colors"
                    href="#"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        terminal
                      </span>
                    </div>
                    <span className="font-medium text-slate-900">
                      Computer Sci
                    </span>
                  </a>
                  <a
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-50 p-6 hover:bg-slate-100 transition-colors"
                    href="#"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">science</span>
                    </div>
                    <span className="font-medium text-slate-900">Physics</span>
                  </a>
                  <a
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-50 p-6 hover:bg-slate-100 transition-colors"
                    href="#"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">biotech</span>
                    </div>
                    <span className="font-medium text-slate-900">
                      Chemistry
                    </span>
                  </a>
                  <a
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-50 p-6 hover:bg-slate-100 transition-colors"
                    href="#"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">palette</span>
                    </div>
                    <span className="font-medium text-slate-900">Arts</span>
                  </a>
                </div>
              </div>

              {/* Featured Tutors */}
              <div className="py-12 border-t border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight">
                    Featured Tutors
                  </h2>
                  <a
                    className="text-primary font-medium hover:underline"
                    href="#"
                  >
                    View all tutors
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Tutor Card 1 */}
                  <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
                    <div className="h-48 bg-slate-100 relative">
                      <img
                        alt="Portrait of Sarah J. tutor"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh-urCItDDqxeyDKJucwgnC6VUBjdiyDUYuvC__UzuaJiTZ0yBIS7_BxuIr6W0QAF2CuGOaAfPvR-aQfh4Z-QFuve5l3wSC-_UOzWh3eT6RX99kItparJNUQqTVveKiUiQO78TK96VjnunoZeVoTpSeJSUhT2g3ghX7A4rQjRxmSvmfq9_lWV_CIPNkVtwO5SYM-dyihSjVnmlwML4ZUVeBxn-2X2aX_d8RvnqPcTZdtFWd6HXJHiaz2i5wOHr9_msh59vZAtqPIQ"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-white px-2 py-1 text-xs font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-400 text-sm">
                          star
                        </span>{" "}
                        4.9
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-lg font-bold text-slate-900">
                        Sarah Jenkins
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">
                        Mathematics Specialist
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-blue-700/10">
                          Algebra
                        </span>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-blue-700/10">
                          Calculus
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="font-bold text-slate-900">
                          $45
                          <span className="text-xs font-normal text-slate-500">
                            /hr
                          </span>
                        </span>
                        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-700">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Tutor Card 2 */}
                  <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
                    <div className="h-48 bg-slate-100 relative">
                      <img
                        alt="Portrait of David C. tutor"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR7G0-2_olxY4YbIElQAv_uKgIWPGb3dHLlFIAqTJOZ9df4qWFCw4Su_BzShYLYkXL-9nQCJiVjNA_zXOtONNcPDSHRNmek6SiCRyHug8fOr_GQoolzlySdncLKCQT767bfYZjGQbepdFEa3IAMQnd-JdjGfX4h7VQSnOqMsKGYcJoi80v0xvQXZ5sK108yNt1m75inUIJe_3WdDR5dlDRu203glGh_aUifMCmaZqWpyg9QX-l5OHSUwjHX5oiu_yO15kO56IAebA"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-white px-2 py-1 text-xs font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-400 text-sm">
                          star
                        </span>{" "}
                        5.0
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-lg font-bold text-slate-900">
                        David Chen
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">
                        Computer Science Expert
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-blue-700/10">
                          Python
                        </span>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-blue-700/10">
                          React
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="font-bold text-slate-900">
                          $60
                          <span className="text-xs font-normal text-slate-500">
                            /hr
                          </span>
                        </span>
                        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-700">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Tutor Card 3 */}
                  <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
                    <div className="h-48 bg-slate-100 relative">
                      <img
                        alt="Portrait of Emily R. tutor"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB481BHIWXN3W-11EZr_NnlrjjeJgMfZxeFoLYU3O-UM8hRkoCUxqtdphd92UWLUmBhJL3buaEv1qV3aC7ZaqcpfBEIdrib601EGjnlYy2BSNw0Z1RyqYaO4KmVdKaXtJcHiE0moXnclFFVsYoF2TsgvkQijJTo-Z69u3pBFKok9Yom6hBIaYCLs_oM92V4JFmhupA1CC3O_lPADmE6w0j0biBVrIFaVvUdy3DzBqxUsjIXTeb4yeHHNQc-P7S0fjUlIbRycy12eI4"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-white px-2 py-1 text-xs font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-400 text-sm">
                          star
                        </span>{" "}
                        4.8
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-lg font-bold text-slate-900">
                        Emily Rodriguez
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">
                        English Literature
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-blue-700/10">
                          Essay Writing
                        </span>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-blue-700/10">
                          ESL
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="font-bold text-slate-900">
                          $35
                          <span className="text-xs font-normal text-slate-500">
                            /hr
                          </span>
                        </span>
                        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-700">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Tutor Card 4 */}
                  <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
                    <div className="h-48 bg-slate-100 relative">
                      <img
                        alt="Portrait of Michael B. tutor"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD78ZcpoN9NPH2cOYu_GYfqg17Yj7qLa4Ot7TQbmv6NkgcqKCUm4uvvt-yOdorpKjaiCJlEKDHdOuR_77AVuokKhHqf1FL3eKEB7LkXQzhIYjg5b5INN-nsJ-WDB09GCdzCE6QDTN809MD10mnnfzmvP8C2j1ofjVjYUNB9mdACpbbbub6p37u8ykD6sSy-BCKE3KzFGGaoHra9i6cNdQ75rnpqRztlo8iXRI1jZTL5TjpH1j4phuBFg0wXJ6q5tLHLu7GzNSfmuEA"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-white px-2 py-1 text-xs font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-400 text-sm">
                          star
                        </span>{" "}
                        4.7
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-lg font-bold text-slate-900">
                        Michael Brown
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">
                        Physics &amp; Chemistry
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-blue-700/10">
                          Mechanics
                        </span>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-blue-700/10">
                          Organic Chem
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="font-bold text-slate-900">
                          $50
                          <span className="text-xs font-normal text-slate-500">
                            /hr
                          </span>
                        </span>
                        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-700">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How it Works Section */}
              <div className="py-16 bg-slate-50 -mx-4 lg:-mx-20 px-4 lg:px-20">
                <div className="mx-auto max-w-7xl">
                  <div className="text-center mb-12">
                    <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight mb-4">
                      How it works
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                      Getting started is easy. Whether you want to learn or
                      teach, we've got you covered.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    {/* For Students */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                          school
                        </span>
                        For Students
                      </h3>
                      <ul className="space-y-6">
                        <li className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              Find a Tutor
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Browse tutor profiles, read reviews, and filter by
                              price and specialty.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              Book a Lesson
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Choose a time that works for you and book your
                              session instantly.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              Start Learning
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Connect with your tutor via our virtual classroom
                              and start learning.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/* For Tutors */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                          cast_for_education
                        </span>
                        For Tutors
                      </h3>
                      <ul className="space-y-6">
                        <li className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              Create Profile
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Sign up, complete your profile, and highlight your
                              expertise.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              Set Your Schedule
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Control your availability and set your own hourly
                              rates.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              Earn Money
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Get paid securely for every lesson you teach on
                              our platform.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="py-20 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Ready to start your journey?
                </h2>
                <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                  Join thousands of students and tutors on EduTutor today. Sign
                  up for free and start exploring.
                </p>
                <div className="flex justify-center gap-4">
                  <button className="bg-primary hover:bg-[#0e45b8] text-white font-bold py-3 px-8 rounded-lg transition-colors">
                    Get Started
                  </button>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 py-12 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-slate-900 mb-4">
                <div className="w-6 h-6 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">
                    school
                  </span>
                </div>
                <span className="text-lg font-bold">EduTutor</span>
              </div>
              <p className="text-sm text-slate-500">
                Empowering students and tutors to connect, learn, and grow
                together.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a className="hover:text-primary" href="#">
                    Find Tutors
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Become a Tutor
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Online Classes
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a className="hover:text-primary" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Careers
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a className="hover:text-primary" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Safety Center
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2023 EduTutor Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a className="text-slate-400 hover:text-slate-600" href="#">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a className="text-slate-400 hover:text-slate-600" href="#">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
