import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Star,
  Clock,
  DollarSign,
  Camera,
  Save,
  CheckCircle,
  ChevronDown,
  X,
  Plus,
  GraduationCap,
  Globe,
  FileText,
  AlertCircle,
} from "lucide-react";
import TutorSidebar from "../components/TutorSidebar";
import { tutorApi } from "../api";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ProfileForm {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  teachingMode: string;
  hourlyRate: string;
  yearsExperience: string;
  education: string;
  university: string;
  languages: string[];
  subjects: string[];
  website: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const TEACHING_MODES = ["Online", "Offline", "Cả hai"];

const AVAILABLE_SUBJECTS = [
  "Toán",
  "Vật Lý",
  "Hóa Học",
  "Sinh Học",
  "Tiếng Anh",
  "Văn Học",
  "Lịch Sử",
  "Địa Lý",
  "Tin Học",
  "Toán Cao Cấp",
  "IELTS / TOEIC",
  "Hóa Hữu Cơ",
];

const AVAILABLE_LANGUAGES = ["Tiếng Việt", "Tiếng Anh", "Tiếng Pháp", "Tiếng Nhật", "Tiếng Trung"];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
        <span className="p-2 bg-primary/10 rounded-xl text-primary">{icon}</span>
        <h2 className="text-base font-bold text-slate-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  hint,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-11 ${icon ? "pl-10" : "pl-4"} pr-4 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400`}
        />
      </div>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function TagSelector({
  label,
  selected,
  options,
  onChange,
}: {
  label: string;
  selected: string[];
  options: string[];
  onChange: (tags: string[]) => void;
}) {
  const toggle = (item: string) => {
    onChange(selected.includes(item) ? selected.filter((s) => s !== item) : [...selected, item]);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                active
                  ? "bg-primary text-white border-primary shadow-sm shadow-primary/30"
                  : "bg-white text-slate-500 border-slate-200 hover:border-primary hover:text-primary"
              }`}
            >
              {active ? <X size={10} /> : <Plus size={10} />}
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TutorProfileEditPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string>(
    "https://i.pravatar.cc/200?img=12"
  );
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "professional" | "public">("basic");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    email: "",
    phone: "",
    location: "Quận 7, TP. Hồ Chí Minh",
    bio: "",
    teachingMode: "Cả hai",
    hourlyRate: "0",
    yearsExperience: "0",
    education: "Cử nhân Sư phạm Toán",
    university: "Trường Đại học Sư phạm TP.HCM",
    languages: ["Tiếng Việt"],
    subjects: [],
    website: "",
  });

  const set = (field: keyof ProfileForm) => (value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await tutorApi.getMyProfile();
        setForm((prev) => ({
          ...prev,
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
          experienceYears: String(data.experienceYears || "0"),
          hourlyRate: String(data.pricePerHour || "0"),
          subjects: data.subjects || [],
        }));
        if (data.avatarUrl) {
          setAvatar(data.avatarUrl);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await tutorApi.updateMyProfile({
        fullName: form.fullName,
        phone: form.phone,
        avatarUrl: avatar,
        bio: form.bio,
        experienceYears: parseInt(form.yearsExperience) || 0,
        pricePerHour: parseFloat(form.hourlyRate) || 0,
        subjects: form.subjects,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const TABS = [
    { key: "basic", label: "Thông tin cơ bản" },
    { key: "professional", label: "Hồ sơ gia sư" },
    { key: "public", label: "Trang cá nhân" },
  ] as const;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <TutorSidebar name={form.fullName} role="Gia sư" />

      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <main className="p-8 flex-1 w-full max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                CÀI ĐẶT TÀI KHOẢN
              </p>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Chỉnh sửa hồ sơ
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Hồ sơ đẹp giúp bạn thu hút nhiều học viên hơn.
              </p>
            </div>

            {/* Save button (Header) */}
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                saved
                  ? "bg-emerald-500 text-white shadow-emerald-200"
                  : "bg-primary text-white shadow-primary/30 hover:opacity-90 active:scale-95"
              } disabled:cursor-not-allowed`}
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Đang lưu...
                </>
              ) : saved ? (
                <>
                  <CheckCircle size={16} />
                  Đã lưu!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Lưu thay đổi
                </>
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
               <svg className="animate-spin w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
            </div>
          ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ─── CỘT TRÁI (Avatar + Điều hướng) ─── */}
            <div className="w-full lg:w-1/3 xl:w-[320px] flex flex-col gap-6 lg:sticky lg:top-8">
              
              {/* Avatar Card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center">
                <div className="relative group mb-4">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    <Camera size={24} className="text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                
                <h3 className="text-lg font-bold text-slate-900">{form.fullName || "Tên gia sư"}</h3>
                <p className="text-sm text-slate-500 mb-5">{form.email}</p>

                {/* Completion indicator */}
                <div className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-600">Độ hoàn thiện</span>
                    <span className="text-xs font-black text-primary">78%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                {/* Warning if incomplete */}
                <div className="w-full text-left flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-700 text-xs font-medium">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>Thêm website và cập nhật tiểu sử để đạt hồ sơ 100% hoàn thiện.</span>
                </div>
              </div>

              {/* Dọc Tab Navigation */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 flex flex-col gap-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold text-left transition-all flex items-center justify-between ${
                      activeTab === tab.key
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── CỘT PHẢI (Nội dung Form) ─── */}
            <div className="w-full lg:w-2/3 xl:w-[calc(100%-320px-2rem)] flex flex-col gap-6">
              
              {/* ─── TAB: Thông tin cơ bản ─── */}
              {activeTab === "basic" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SectionCard title="Thông tin cá nhân" icon={<User size={18} />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField
                        label="Họ và tên"
                        id="fullName"
                        value={form.fullName}
                        onChange={set("fullName")}
                        placeholder="Nguyễn Văn A"
                        icon={<User size={16} />}
                      />
                      <InputField
                        label="Email"
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="email@example.com"
                        icon={<Mail size={16} />}
                        hint="Email dùng để đăng nhập, không hiển thị công khai."
                      />
                      <InputField
                        label="Số điện thoại"
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="0912 345 678"
                        icon={<Phone size={16} />}
                      />
                      <InputField
                        label="Địa chỉ / Khu vực dạy"
                        id="location"
                        value={form.location}
                        onChange={set("location")}
                        placeholder="Quận 1, TP. Hồ Chí Minh"
                        icon={<MapPin size={16} />}
                      />
                    </div>

                    <TagSelector
                      label="Ngôn ngữ giảng dạy"
                      selected={form.languages}
                      options={AVAILABLE_LANGUAGES}
                      onChange={(v) => setForm((p) => ({ ...p, languages: v }))}
                    />
                  </SectionCard>
                </div>
              )}

              {/* ─── TAB: Hồ sơ gia sư ─── */}
              {activeTab === "professional" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  <SectionCard title="Kinh nghiệm & Chuyên môn" icon={<GraduationCap size={18} />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField
                        label="Học vấn / Bằng cấp"
                        id="education"
                        value={form.education}
                        onChange={set("education")}
                        placeholder="Cử nhân Sư phạm Toán"
                        icon={<GraduationCap size={16} />}
                      />
                      <InputField
                        label="Trường đại học / Học viện"
                        id="university"
                        value={form.university}
                        onChange={set("university")}
                        placeholder="Đại học Bách Khoa..."
                        icon={<BookOpen size={16} />}
                      />
                      <InputField
                        label="Số năm kinh nghiệm"
                        id="yearsExperience"
                        type="number"
                        value={form.yearsExperience}
                        onChange={set("yearsExperience")}
                        placeholder="5"
                        icon={<Star size={16} />}
                      />
                      <div className="space-y-1.5">
                        <label htmlFor="teachingMode" className="text-sm font-semibold text-slate-700">
                          Hình thức giảng dạy
                        </label>
                        <div className="relative">
                          <select
                            id="teachingMode"
                            value={form.teachingMode}
                            onChange={(e) => set("teachingMode")(e.target.value)}
                            className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-slate-800 transition-all appearance-none"
                          >
                            {TEACHING_MODES.map((m) => (
                              <option key={m}>{m}</option>
                            ))}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <TagSelector
                      label="Môn học giảng dạy"
                      selected={form.subjects}
                      options={AVAILABLE_SUBJECTS}
                      onChange={(v) => setForm((p) => ({ ...p, subjects: v }))}
                    />
                  </SectionCard>

                  <SectionCard title="Học phí" icon={<DollarSign size={18} />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField
                        label="Học phí / giờ (VND)"
                        id="hourlyRate"
                        value={form.hourlyRate}
                        onChange={set("hourlyRate")}
                        placeholder="200.000"
                        icon={<DollarSign size={16} />}
                        hint="Học phí hiển thị trên trang công khai của bạn."
                      />
                      <div className="flex items-end">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 w-full">
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Gợi ý</p>
                          <p className="text-xs text-slate-600">Học phí trung bình trong khu vực của bạn là <span className="font-bold text-slate-800">200,000 – 300,000 VND/giờ</span>.</p>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                </div>
              )}

              {/* ─── TAB: Trang cá nhân ─── */}
              {activeTab === "public" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  <SectionCard title="Giới thiệu bản thân" icon={<FileText size={18} />}>
                    <div className="space-y-1.5">
                      <label htmlFor="bio" className="text-sm font-semibold text-slate-700">
                        Tiểu sử / Mô tả bản thân
                      </label>
                      <textarea
                        id="bio"
                        rows={5}
                        value={form.bio}
                        onChange={(e) => set("bio")(e.target.value)}
                        placeholder="Mô tả ngắn gọn về bản thân, phong cách dạy học và điểm mạnh của bạn..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400 resize-none leading-relaxed"
                      />
                      <div className="flex justify-between">
                        <p className="text-xs text-slate-400">Tối thiểu 100 ký tự để được hiển thị trên kết quả tìm kiếm.</p>
                        <p className={`text-xs font-bold ${form.bio.length < 100 ? "text-amber-500" : "text-emerald-500"}`}>
                          {form.bio.length} ký tự
                        </p>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Liên kết ngoài" icon={<Globe size={18} />}>
                    <InputField
                      label="Website / Portfolio cá nhân"
                      id="website"
                      type="url"
                      value={form.website}
                      onChange={set("website")}
                      placeholder="https://yourwebsite.com"
                      icon={<Globe size={16} />}
                      hint="Không bắt buộc. Học viên có thể truy cập để xem thêm thông tin."
                    />
                  </SectionCard>

                  {/* Preview card */}
                  <div className="bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-50 rounded-2xl border border-primary/10 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                      <Star size={12} />
                      Xem trước hồ sơ công khai
                    </p>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-white flex gap-4">
                      <img src={avatar} alt="avatar" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-slate-900">{form.fullName || "Tên gia sư"}</h4>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin size={11} /> {form.location || "Địa chỉ chưa cập nhật"}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-primary font-black text-sm">{form.hourlyRate ? `${form.hourlyRate} VND` : "—"}</p>
                            <p className="text-xs text-slate-400">/giờ</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2">{form.bio || "Tiểu sử chưa được cập nhật."}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {form.subjects.slice(0, 3).map((s) => (
                            <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-semibold">{s}</span>
                          ))}
                          {form.subjects.length > 3 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full font-semibold">+{form.subjects.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Save (Desktop Only) */}
              <div className="hidden lg:flex justify-end pt-2 pb-8">
                <button
                  onClick={handleSave}
                  disabled={saving || saved}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    saved
                      ? "bg-emerald-500 text-white shadow-emerald-200"
                      : "bg-primary text-white shadow-primary/30 hover:opacity-90 active:scale-95"
                  } disabled:cursor-not-allowed`}
                >
                  {saving ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Đang lưu...</>
                  ) : saved ? (
                    <><CheckCircle size={16} />Đã lưu thành công!</>
                  ) : (
                    <><Save size={16} />Lưu thay đổi</>
                  )}
                </button>
              </div>
            </div>
          </div>
          )}
        </main>
      </div>
    </div>
  );
}
