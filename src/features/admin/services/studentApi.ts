import axiosInstance from "../../../services/axios";

export interface AdminStudentResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  gradeLevel: string | null;
  status: "ACTIVE" | "INACTIVE" | "BANNED";
  totalClasses: number;
  totalSpent: number;
  registeredAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  page: number;
}

export interface StudentStatsResponse {
  newThisWeek: number;
}

export interface GetStudentsParams {
  keyword?: string;
  status?: string;
  page?: number;
  size?: number;
}

// Lấy danh sách học sinh (phân trang, search, filter)
export async function fetchAdminStudents(
  params: GetStudentsParams
): Promise<PageResponse<AdminStudentResponse>> {
  const { data } = await axiosInstance.get("/admin/students", { params });
  return data.data;
}

// Lấy thống kê học sinh mới
export async function fetchStudentStats(): Promise<StudentStatsResponse> {
  const { data } = await axiosInstance.get("/admin/students/stats");
  return data.data;
}

// Cập nhật trạng thái học sinh (ban / unban / deactivate)
export async function updateStudentStatus(
  userId: string,
  status: "ACTIVE" | "INACTIVE" | "BANNED"
): Promise<AdminStudentResponse> {
  const { data } = await axiosInstance.patch(
    `/admin/students/${userId}/status`,
    { status }
  );
  return data.data;
}
