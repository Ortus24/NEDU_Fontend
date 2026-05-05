import React, { useState } from "react";
import {
  Pencil,
  Camera,
  Info,
  BookOpen,
  ChevronDown,
  Users,
  X,
  Plus,
} from "lucide-react";

// ─── Form Field Component ────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  colSpan?: boolean;
}

function FormField({ label, children, required, disabled, colSpan }: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${colSpan ? "md:col-span-2" : ""}`}>
      <label className="text-xs font-semibold tracking-wide text-slate-600 uppercase flex items-center gap-1">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <div className={disabled ? "opacity-70" : ""}>{children}</div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function StudentProfilePage() {
  const [editingSection, setEditingSection] = useState<"general" | "learning" | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [fullName, setFullName] = useState("Nguyễn Thành An");
  const [phone, setPhone] = useState("0987 654 321");
  const [address, setAddress] = useState("123 Đường ABC, Quận 1, TP. HCM");
  const [dob, setDob] = useState("2006-05-20");
  const [grade, setGrade] = useState("Lớp 12");
  const [learningStyle, setLearningStyle] = useState<"online" | "offline" | "hybrid">("online");
  const [parentName, setParentName] = useState("Nguyễn Văn B");
  const [parentPhone, setParentPhone] = useState("0912 345 678");
  const [goal, setGoal] = useState("Đạt IELTS 7.5 và đỗ vào trường Đại học mơ ước.");
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Toán học" },
    { id: 2, name: "Tiếng Anh" },
  ]);

  const [snapshot, setSnapshot] = useState<any>(null);

  const handleEdit = (section: "general" | "learning") => {
    setSnapshot({
      fullName, phone, address, dob, grade, learningStyle, parentName, parentPhone, goal, subjects
    });
    setEditingSection(section);
  };

  const handleCancel = () => {
    if (snapshot) {
      setFullName(snapshot.fullName);
      setPhone(snapshot.phone);
      setAddress(snapshot.address);
      setDob(snapshot.dob);
      setGrade(snapshot.grade);
      setLearningStyle(snapshot.learningStyle);
      setParentName(snapshot.parentName);
      setParentPhone(snapshot.parentPhone);
      setGoal(snapshot.goal);
      setSubjects(snapshot.subjects);
    }
    setEditingSection(null);
    setSnapshot(null);
  };

  const removeSubject = (id: number) => {
    if (editingSection !== "learning") return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setEditingSection(null);
      setSnapshot(null);
    }, 1500);
  };

  const inputClass = "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none";
  const disabledInputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed outline-none";

  return (
    <>
      <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Thiết lập hồ sơ
            </h1>
            <p className="text-slate-500 mt-1.5 text-sm md:text-base">
              Cập nhật thông tin cá nhân và hồ sơ học tập của bạn.
            </p>
          </div>
        </div>

        {/* ── General Info Card ───────────────────────────────────────────── */}
        <div id="general-info" className="bg-white border border-slate-200 rounded-2xl p-5 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-indigo-600"><Info size={20} /></span>
              <h3 className="text-lg font-semibold text-slate-800">Thông tin chung</h3>
            </div>
            {!editingSection && (
              <button
                onClick={() => handleEdit("general")}
                className="flex items-center gap-2 px-3 py-1.5 border border-indigo-200 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-all"
              >
                <Pencil size={12} />
                Sửa
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md group">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=nedu-main" alt="Avatar" className="w-full h-full object-cover" />
                {editingSection === "general" && (
                  <button className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={22} className="text-white" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Họ và tên" required>
                <input className={editingSection === "general" ? inputClass : disabledInputClass} type="text" value={fullName} readOnly={editingSection !== "general"} onChange={(e) => setFullName(e.target.value)} />
              </FormField>
              <FormField label="Số điện thoại">
                <input className={editingSection === "general" ? inputClass : disabledInputClass} type="tel" value={phone} readOnly={editingSection !== "general"} onChange={(e) => setPhone(e.target.value)} />
              </FormField>
              <FormField label="Email" disabled colSpan>
                <input className={disabledInputClass} type="email" value="an.nguyen@nedu.edu.vn" disabled />
              </FormField>
              <FormField label="Địa chỉ" colSpan>
                <input className={editingSection === "general" ? inputClass : disabledInputClass} type="text" value={address} readOnly={editingSection !== "general"} onChange={(e) => setAddress(e.target.value)} />
              </FormField>
            </div>
          </div>
        </div>

        {/* ── Learning Profile Card ────────────────────────────────────────── */}
        <div id="learning-profile" className="bg-white border border-slate-200 rounded-2xl p-5 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-indigo-600"><BookOpen size={20} /></span>
              <h3 className="text-lg font-semibold text-slate-800">Hồ sơ học tập</h3>
            </div>
            {!editingSection && (
              <button onClick={() => handleEdit("learning")} className="flex items-center gap-2 px-3 py-1.5 border border-indigo-200 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-all">
                <Pencil size={12} /> Sửa
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Ngày sinh">
              <input className={editingSection === "learning" ? inputClass : disabledInputClass} type="date" value={dob} readOnly={editingSection !== "learning"} onChange={(e) => setDob(e.target.value)} />
            </FormField>
            <FormField label="Khối lớp / Trình độ">
              <div className="relative">
                <select className={`${editingSection === "learning" ? inputClass : disabledInputClass} w-full appearance-none pr-10`} value={grade} disabled={editingSection !== "learning"} onChange={(e) => setGrade(e.target.value)}>
                  <option>Lớp 10</option><option>Lớp 11</option><option>Lớp 12</option><option>Đại học - Năm 1</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </FormField>

            <div className="md:col-span-2 flex flex-col gap-3">
              <label className="text-xs font-semibold tracking-wide text-slate-600 uppercase">Hình thức học ưu tiên</label>
              <div className="flex flex-wrap gap-4">
                {["online", "offline", "hybrid"].map((style) => (
                  <label key={style} className="flex items-center gap-2">
                    <input type="radio" name="style" value={style} checked={learningStyle === style} disabled={editingSection !== "learning"} onChange={() => setLearningStyle(style as any)} />
                    <span className="text-sm text-slate-600 capitalize">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-sky-500" />
                <h4 className="text-xs font-bold uppercase text-slate-600">Thông tin phụ huynh</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className={editingSection === "learning" ? inputClass : disabledInputClass} placeholder="Họ tên" value={parentName} readOnly={editingSection !== "learning"} onChange={(e) => setParentName(e.target.value)} />
                <input className={editingSection === "learning" ? inputClass : disabledInputClass} placeholder="SĐT" value={parentPhone} readOnly={editingSection !== "learning"} onChange={(e) => setParentPhone(e.target.value)} />
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wide text-slate-600 uppercase">Môn học</label>
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[52px]">
                {subjects.map((s) => (
                  <span key={s.id} className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
                    {s.name} {editingSection === "learning" && <X size={12} className="cursor-pointer" onClick={() => removeSubject(s.id)} />}
                  </span>
                ))}
                {editingSection === "learning" && <button className="text-xs font-semibold text-slate-400 flex items-center gap-1"><Plus size={14} /> Thêm</button>}
              </div>
            </div>

            <FormField label="Mục tiêu" colSpan>
              <textarea className={editingSection === "learning" ? inputClass : disabledInputClass} rows={3} value={goal} readOnly={editingSection !== "learning"} onChange={(e) => setGoal(e.target.value)} />
            </FormField>
          </div>
        </div>
      </section>

      {/* Sticky Footer */}
      {editingSection && (
        <footer className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-[60] shadow-lg animate-in slide-in-from-bottom-2">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-end gap-4">
            <button onClick={handleCancel} className="px-6 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors rounded-xl hover:bg-slate-100">Hủy bỏ</button>
            <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:bg-indigo-700 disabled:opacity-60 transition-all flex items-center gap-2">
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </footer>
      )}
    </>
  );
}
