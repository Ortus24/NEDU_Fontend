// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "STUDENT" | "TUTOR";
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  email: string;
  role: string;
  userId: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
  fullName: string;
  avatarUrl: string | null;
}
