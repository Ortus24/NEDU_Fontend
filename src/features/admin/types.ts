// ===== KPI / Dashboard Types =====
export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
}

export interface RevenueChartData {
  month: string;
  revenue: number;
  bookings: number;
}

// ===== Tutor / eKYC Types =====
export type TutorStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "banned";

export type SubscriptionPlan = "free" | "basic" | "standard" | "premium";

export interface Tutor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  subjects: string[];
  status: TutorStatus;
  reputationScore: number;
  subscriptionPlan: SubscriptionPlan;
  submittedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  totalEarnings: number;
  totalSessions: number;
}

// ===== Student Types =====
export type StudentStatus = "active" | "banned" | "inactive";

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  grade: string;
  status: StudentStatus;
  totalSpent: number;
  totalClasses: number;
  registeredAt: string;
}

// ===== Finance Types =====
export type TransactionStatus =
  | "in_escrow"
  | "released"
  | "refunded"
  | "disputed";

export interface EscrowTransaction {
  id: string;
  studentName: string;
  tutorName: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  status: TransactionStatus;
  paidAt: string;
  releaseAt?: string;
  courseTitle: string;
  totalSessions: number;
  completedSessions: number;
}

export type PayoutStatus = "pending" | "processing" | "paid" | "failed";

export interface PayoutRequest {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  bankName: string;
  bankAccount: string;
  amount: number;
  requestedAt: string;
  status: PayoutStatus;
}

// ===== Dispute Types =====
export type DisputeStatus = "new" | "processing" | "resolved" | "closed";
export type DisputeType = "tutor_absent" | "quality_issue" | "refund_request" | "other";
export type DisputeOutcome = "refund_student" | "release_tutor" | "partial_refund" | null;

export interface Dispute {
  id: string;
  ticketCode: string;
  createdBy: "student" | "tutor";
  creatorName: string;
  subjectName: string;
  type: DisputeType;
  status: DisputeStatus;
  outcome: DisputeOutcome;
  escrowAmount: number;
  completedSessions: number;
  totalSessions: number;
  createdAt: string;
  description: string;
}

// ===== Navigation Types =====
export interface NavItem {
  id: string;
  label: string;
  path: string;
  badge?: number;
}

// ===== Platform Settings Types =====
export interface PlatformSettings {
  platformFeePercent: number;
  basicPlanPrice: number;
  standardPlanPrice: number;
  premiumPlanPrice: number;
  trialCancelHours: number;
  rescheduleCancelHours: number;
  maxKycResubmissions: number;
}
