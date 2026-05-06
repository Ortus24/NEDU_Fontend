import React, { useState } from "react";
import { Wallet, Lock, Send, Settings2, CheckCircle } from "lucide-react";
import { mockEscrowTransactions, mockPayoutRequests } from "../../api";
import type { EscrowTransaction, PayoutRequest, PlatformSettings } from "../../types";
import PageHeader from "../components/shared/PageHeader";
import { SummaryCard, EmptyState } from "../components/shared/ui";
import StatusBadge from "../components/shared/StatusBadge";
import ConfirmModal from "../components/shared/ConfirmModal";
import { useToast } from "../components/shared/Toast";

const fmt = (v: number) => new Intl.NumberFormat("vi-VN").format(v) + "đ";

// ============================================================
// Tab 1: Escrow
// ============================================================
const EscrowTab: React.FC = () => {
  const [txns] = useState<EscrowTransaction[]>(mockEscrowTransactions);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-slate-100">
            <tr>
              {["Mã GD", "Học sinh", "Gia sư", "Tên khóa học", "Tổng tiền", "Tiến độ", "Trạng thái", "Dự kiến giải ngân"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider first:pl-6">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {txns.map(t => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="pl-6 pr-4 py-4 text-xs font-mono text-slate-500">#{t.id.toUpperCase()}</td>
                <td className="px-4 py-4 text-sm font-medium text-slate-700">{t.studentName}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{t.tutorName}</td>
                <td className="px-4 py-4 text-sm text-slate-700">{t.courseTitle}</td>
                <td className="px-4 py-4 text-sm font-bold text-slate-800">{fmt(t.amount)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(t.completedSessions / t.totalSessions) * 100}%` }} />
                    </div>
                    <span className="text-xs text-slate-500">{t.completedSessions}/{t.totalSessions}</span>
                  </div>
                </td>
                <td className="px-4 py-4"><StatusBadge variant={t.status} /></td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  {t.releaseAt ? new Date(t.releaseAt).toLocaleDateString("vi-VN") : "Khi hoàn thành"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// Tab 2: Payouts
// ============================================================
const PayoutTab: React.FC = () => {
  const [payouts, setPayouts] = useState<PayoutRequest[]>(mockPayoutRequests);
  const [payTarget, setPayTarget] = useState<PayoutRequest | null>(null);
  const { showToast, ToastComponent } = useToast();

  const confirmPay = () => {
    if (!payTarget) return;
    setPayouts(prev => prev.map(p => p.id === payTarget.id ? { ...p, status: "paid" } : p));
    showToast(`✅ Đã đánh dấu giải ngân cho ${payTarget.tutorName}`);
    setPayTarget(null);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {payouts.length === 0 ? (
          <EmptyState icon={<Send size={28} />} title="Không có yêu cầu giải ngân nào" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-slate-100">
                <tr>
                  {["Gia sư", "Ngân hàng", "Số tài khoản", "Số tiền", "Ngày yêu cầu", "Trạng thái", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider first:pl-6 last:pr-6 last:text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payouts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="pl-6 pr-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {p.tutorName.charAt(0)}
                        </div>
                        <p className="text-sm font-semibold text-slate-800">{p.tutorName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{p.bankName}</td>
                    <td className="px-4 py-4 text-sm font-mono text-slate-500">{p.bankAccount}</td>
                    <td className="px-4 py-4 text-sm font-bold text-slate-800">{fmt(p.amount)}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {new Date(p.requestedAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-4"><StatusBadge variant={p.status} /></td>
                    <td className="pl-4 pr-6 py-4 text-right">
                      {p.status === "pending" && (
                        <button onClick={() => setPayTarget(p)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors ml-auto">
                          <CheckCircle size={13} /> Mark as Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmModal open={!!payTarget} variant="info"
        title="Xác nhận đã giải ngân?"
        description={`Bạn xác nhận đã chuyển khoản ${payTarget ? fmt(payTarget.amount) : ""} cho gia sư ${payTarget?.tutorName} (${payTarget?.bankAccount} – ${payTarget?.bankName})?`}
        confirmLabel="Xác nhận đã thanh toán" onConfirm={confirmPay} onCancel={() => setPayTarget(null)}
      />
      {ToastComponent}
    </>
  );
};

// ============================================================
// Tab 3: Config
// ============================================================
const ConfigTab: React.FC = () => {
  const [settings, setSettings] = useState<PlatformSettings>({
    platformFeePercent: 12,
    basicPlanPrice: 99000,
    standardPlanPrice: 199000,
    premiumPlanPrice: 349000,
    trialCancelHours: 2,
    rescheduleCancelHours: 24,
    maxKycResubmissions: 3,
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const { showToast, ToastComponent } = useToast();

  const handleSave = () => {
    showToast("✅ Đã lưu cấu hình nền tảng");
    setShowConfirm(false);
  };

  const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
    <div className="grid grid-cols-5 gap-4 items-start py-4 border-b border-slate-50 last:border-0">
      <div className="col-span-3">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
      </div>
      <div className="col-span-2">{children}</div>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-2">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">💰 Tài chính</h3>
        <Field label="Phí nền tảng (Platform Fee)" hint="Tỷ lệ % trích từ doanh thu mỗi buổi học">
          <div className="flex items-center gap-3">
            <input type="range" min={5} max={30} step={1} value={settings.platformFeePercent}
              onChange={e => setSettings(s => ({ ...s, platformFeePercent: +e.target.value }))}
              className="flex-1 accent-blue-600" />
            <span className="text-sm font-bold text-blue-600 w-10 text-right">{settings.platformFeePercent}%</span>
          </div>
        </Field>
        {(["basicPlanPrice", "standardPlanPrice", "premiumPlanPrice"] as const).map((key, i) => {
          const labels = ["Giá gói Basic (/tháng)", "Giá gói Standard (/tháng)", "Giá gói Premium (/tháng)"];
          return (
            <Field key={key} label={labels[i]}>
              <div className="flex items-center gap-2">
                <input type="number" value={settings[key]} step={1000}
                  onChange={e => setSettings(s => ({ ...s, [key]: +e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                <span className="text-xs text-slate-400 shrink-0">đ</span>
              </div>
            </Field>
          );
        })}

        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider pt-4 pb-2">⚙️ Vận hành</h3>
        <Field label="Hủy lịch không phạt (Học thử)" hint="Số giờ tối thiểu để hủy lịch không bị phạt">
          <input type="number" value={settings.trialCancelHours}
            onChange={e => setSettings(s => ({ ...s, trialCancelHours: +e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400" />
        </Field>
        <Field label="Thời gian đổi lịch tối thiểu" hint="Số giờ trước khi cần báo đổi lịch">
          <input type="number" value={settings.rescheduleCancelHours}
            onChange={e => setSettings(s => ({ ...s, rescheduleCancelHours: +e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400" />
        </Field>
        <Field label="Số lần nộp lại hồ sơ KYC tối đa">
          <input type="number" value={settings.maxKycResubmissions} min={1} max={5}
            onChange={e => setSettings(s => ({ ...s, maxKycResubmissions: +e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400" />
        </Field>

        <div className="pt-4 flex justify-end">
          <button onClick={() => setShowConfirm(true)}
            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm">
            Lưu thay đổi
          </button>
        </div>
      </div>
      <ConfirmModal open={showConfirm} variant="warning"
        title="Xác nhận lưu cấu hình?"
        description="Các thay đổi về phí và cấu hình sẽ có hiệu lực ngay lập tức cho các giao dịch mới."
        confirmLabel="Lưu cấu hình" onConfirm={handleSave} onCancel={() => setShowConfirm(false)}
      />
      {ToastComponent}
    </>
  );
};

// ============================================================
// Main FinancePage
// ============================================================
type FinanceTab = "escrow" | "payout" | "config";

const FinancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FinanceTab>("escrow");

  const tabs: { key: FinanceTab; label: string; icon: React.ReactNode }[] = [
    { key: "escrow", label: "Quỹ Escrow", icon: <Lock size={15} /> },
    { key: "payout", label: "Giải ngân", icon: <Send size={15} /> },
    { key: "config", label: "Cấu hình", icon: <Settings2 size={15} /> },
  ];

  const totalEscrow = mockEscrowTransactions.reduce((acc, t) => acc + (t.status === "in_escrow" ? t.amount : 0), 0);
  const pendingPayout = mockPayoutRequests.reduce((acc, p) => acc + (p.status === "pending" ? p.amount : 0), 0);

  return (
    <div>
      <PageHeader title="Quản lý Tài chính" subtitle="Escrow, giải ngân gia sư và cấu hình phí nền tảng"
        breadcrumbs={[{ label: "Admin", path: "/admin" }, { label: "Tài chính" }]}
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Tổng Escrow đang giữ" value={fmt(totalEscrow)} color="blue" icon={<Lock size={18} />} />
        <SummaryCard title="Chờ giải ngân" value={fmt(pendingPayout)} sub={`${mockPayoutRequests.filter(p => p.status === "pending").length} yêu cầu`} color="orange" icon={<Send size={18} />} />
        <SummaryCard title="Đã giải ngân tháng này" value={fmt(12500000)} color="green" icon={<CheckCircle size={18} />} />
        <SummaryCard title="Doanh thu phí (tháng)" value={fmt(149400000)} color="purple" icon={<Wallet size={18} />} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-5 w-fit">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === t.key ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {activeTab === "escrow" && <EscrowTab />}
      {activeTab === "payout" && <PayoutTab />}
      {activeTab === "config" && <ConfigTab />}
    </div>
  );
};

export default FinancePage;
