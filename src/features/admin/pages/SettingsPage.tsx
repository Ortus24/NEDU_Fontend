import React, { useState } from "react";
import { Settings, Percent, Package, Clock, Star, Save } from "lucide-react";
import PageHeader from "../components/shared/PageHeader";
import ConfirmModal from "../components/shared/ConfirmModal";
import { useToast } from "../components/shared/Toast";

interface ReputationRule { label: string; points: number }

const SettingsPage: React.FC = () => {
  const { showToast, ToastComponent } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);

  // Finance
  const [platformFee, setPlatformFee] = useState(12);
  const [basicPrice, setBasicPrice] = useState(99000);
  const [standardPrice, setStandardPrice] = useState(199000);
  const [premiumPrice, setPremiumPrice] = useState(349000);

  // Operations
  const [trialCancelH, setTrialCancelH] = useState(2);
  const [rescheduleH, setRescheduleH] = useState(24);
  const [maxKyc, setMaxKyc] = useState(3);
  const [slaKycDays, setSlaKycDays] = useState(5);

  // Reputation
  const [repRules] = useState<ReputationRule[]>([
    { label: "Đánh giá >= 4 sao", points: +2 },
    { label: "Trả lời request < 12h", points: +1 },
    { label: "Hoàn thành đúng lộ trình", points: +5 },
    { label: "Đánh giá < 3 sao", points: -3 },
    { label: "Từ chối học thử liên tục", points: -5 },
    { label: "Hủy lịch dạy", points: -2 },
  ]);

  const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string }> = ({ icon, title, subtitle }) => (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );

  const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
    <div className="grid grid-cols-5 gap-4 items-center py-3.5 border-b border-slate-50 last:border-0">
      <div className="col-span-3">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
      </div>
      <div className="col-span-2">{children}</div>
    </div>
  );

  const NumberInput: React.FC<{ value: number; onChange: (v: number) => void; suffix?: string; min?: number; max?: number; step?: number }> = ({
    value, onChange, suffix, min, max, step = 1,
  }) => (
    <div className="flex items-center gap-2">
      <input type="number" value={value} min={min} max={max} step={step}
        onChange={e => onChange(+e.target.value)}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
      {suffix && <span className="text-xs text-slate-400 shrink-0">{suffix}</span>}
    </div>
  );

  return (
    <div>
      <PageHeader title="Cài đặt Nền tảng" subtitle="Cấu hình các thông số vận hành của NEDU"
        breadcrumbs={[{ label: "Admin", path: "/admin" }, { label: "Cài đặt" }]}
        actions={
          <button onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors shadow-sm">
            <Save size={15} /> Lưu tất cả thay đổi
          </button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Card 1: Tài chính */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <SectionHeader icon={<Percent size={17} />} title="Tài chính" subtitle="Phí nền tảng và giá các gói gia sư" />
          <Field label="Platform Fee" hint="% trích từ mỗi buổi dạy hoàn thành">
            <div className="space-y-2">
              <input type="range" min={5} max={30} value={platformFee}
                onChange={e => setPlatformFee(+e.target.value)} className="w-full accent-blue-600" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">5%</span>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{platformFee}%</span>
                <span className="text-xs text-slate-400">30%</span>
              </div>
            </div>
          </Field>
          <Field label="Giá gói Basic" hint="99,000đ/tháng – mặc định">
            <NumberInput value={basicPrice} onChange={setBasicPrice} suffix="đ/tháng" step={1000} min={0} />
          </Field>
          <Field label="Giá gói Standard" hint="199,000đ/tháng – mặc định">
            <NumberInput value={standardPrice} onChange={setStandardPrice} suffix="đ/tháng" step={1000} min={0} />
          </Field>
          <Field label="Giá gói Premium" hint="349,000đ/tháng – mặc định">
            <NumberInput value={premiumPrice} onChange={setPremiumPrice} suffix="đ/tháng" step={1000} min={0} />
          </Field>
        </div>

        {/* Card 2: Vận hành */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <SectionHeader icon={<Clock size={17} />} title="Vận hành" subtitle="Thời gian và quy tắc xử lý" />
          <Field label="Hủy lịch học thử không phạt" hint="Phải báo trước X giờ để không bị phạt">
            <NumberInput value={trialCancelH} onChange={setTrialCancelH} suffix="giờ" min={1} max={24} />
          </Field>
          <Field label="Đổi lịch tối thiểu" hint="Yêu cầu đổi lịch phải gửi trước X giờ">
            <NumberInput value={rescheduleH} onChange={setRescheduleH} suffix="giờ" min={1} max={48} />
          </Field>
          <Field label="Nộp lại hồ sơ KYC tối đa" hint="Số lần gia sư được phép nộp lại sau khi bị từ chối">
            <NumberInput value={maxKyc} onChange={setMaxKyc} suffix="lần" min={1} max={5} />
          </Field>
          <Field label="SLA duyệt hồ sơ eKYC" hint="Số ngày làm việc tối đa Admin phải xử lý hồ sơ">
            <NumberInput value={slaKycDays} onChange={setSlaKycDays} suffix="ngày" min={1} max={10} />
          </Field>
        </div>

        {/* Card 3: Điểm uy tín */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 xl:col-span-2">
          <SectionHeader icon={<Star size={17} />} title="Hệ thống Điểm Uy tín (Reputation Score)" subtitle="Cấu hình điểm cộng/trừ cho từng hành động của gia sư (thang 100 điểm)" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Plus rules */}
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3">➕ Điểm cộng</p>
              <div className="space-y-2">
                {repRules.filter(r => r.points > 0).map((rule, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-sm text-slate-700">{rule.label}</span>
                    <span className="text-sm font-bold text-emerald-600 shrink-0">+{rule.points} điểm</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Minus rules */}
            <div>
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">➖ Điểm trừ</p>
              <div className="space-y-2">
                {repRules.filter(r => r.points < 0).map((rule, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                    <span className="text-sm text-slate-700">{rule.label}</span>
                    <span className="text-sm font-bold text-red-500 shrink-0">{rule.points} điểm</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Threshold warnings */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs font-bold text-amber-700">⚠️ Cảnh báo: Dưới 50 điểm</p>
              <p className="text-xs text-amber-600 mt-0.5">Gia sư nhận email cảnh báo từ hệ thống</p>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-xs font-bold text-red-700">🔒 Khóa nhận lớp: Dưới 30 điểm</p>
              <p className="text-xs text-red-600 mt-0.5">Tài khoản tự động bị giới hạn nhận lớp mới</p>
            </div>
          </div>
        </div>

        {/* Card 4: Gói giới hạn buổi dạy */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 xl:col-span-2">
          <SectionHeader icon={<Package size={17} />} title="Giới hạn buổi dạy theo Gói" subtitle="Số buổi tối đa mỗi tuần theo từng gói subscription" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { plan: "Free", limit: "2", color: "border-slate-200 bg-slate-50", textColor: "text-slate-600" },
              { plan: "Basic", limit: "8", color: "border-sky-200 bg-sky-50", textColor: "text-sky-700" },
              { plan: "Standard", limit: "∞", color: "border-blue-200 bg-blue-50", textColor: "text-blue-700" },
              { plan: "Premium", limit: "∞ + ưu tiên", color: "border-violet-200 bg-violet-50", textColor: "text-violet-700" },
            ].map(p => (
              <div key={p.plan} className={`p-4 rounded-2xl border-2 ${p.color} text-center`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${p.textColor}`}>{p.plan}</p>
                <p className={`text-2xl font-black mt-2 ${p.textColor}`}>{p.limit}</p>
                <p className="text-xs text-slate-400 mt-1">buổi/tuần</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmModal open={showConfirm} variant="warning"
        title="Lưu cấu hình nền tảng?"
        description="Tất cả thay đổi sẽ có hiệu lực ngay lập tức cho các giao dịch mới. Hành động này không thể hoàn tác tự động."
        confirmLabel="💾 Lưu thay đổi"
        onConfirm={() => { showToast("✅ Đã lưu cấu hình nền tảng"); setShowConfirm(false); }}
        onCancel={() => setShowConfirm(false)}
      />
      {ToastComponent}
    </div>
  );
};

export default SettingsPage;
