import axiosInstance from "../../../services/axios";
import type { PageResponse } from "./studentApi";

export interface AdminTutorResponse {
  id: string;             // tutor_profile id
  userId: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  kycStatus: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  userStatus: "ACTIVE" | "INACTIVE" | "BANNED";
  reputationScore: number;
  reputationStatus: string;
  subjects: string[];
  subscriptionPlan: string;
  totalSessions: number;
  totalEarnings: number;
  pricePerHour: number | null;
  experienceYears: number | null;
  registeredAt: string;
}

export interface GetTutorsParams {
  keyword?: string;
  kycStatus?: string;
  page?: number;
  size?: number;
}

// Map kycStatus backend → variant của StatusBadge
export const KYC_STATUS_BADGE: Record<string, string> = {
  DRAFT: "draft",
  SUBMITTED: "pending",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export async function fetchAdminTutors(
  params: GetTutorsParams
): Promise<PageResponse<AdminTutorResponse>> {
  const { data } = await axiosInstance.get("/admin/tutors", { params });
  return data.data;
}

export async function fetchTutorStats(): Promise<{ newThisWeek: number }> {
  const { data } = await axiosInstance.get("/admin/tutors/stats");
  return data.data;
}

export async function updateTutorStatus(
  tutorProfileId: string,
  status: "ACTIVE" | "INACTIVE" | "BANNED"
): Promise<AdminTutorResponse> {
  const { data } = await axiosInstance.patch(
    `/admin/tutors/${tutorProfileId}/status`,
    { status }
  );
  return data.data;
}
