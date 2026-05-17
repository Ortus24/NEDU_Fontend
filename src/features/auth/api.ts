import axiosInstance, { setAccessToken } from "../../services/axios";
import { LoginRequest, LoginResponse, RegisterRequest } from "./types";

// Backend trả về: { status, message, data: LoginResponse }
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    credentials
  );
  const data = response.data.data;

  // Lưu access token vào memory qua setter
  setAccessToken(data.accessToken);

  return data;
};

export const logoutApi = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.error("Logout API failed", error);
  } finally {
    setAccessToken(null);
    localStorage.removeItem("user");
  }
};

export const registerApi = async (
  data: RegisterRequest
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
    "/auth/register",
    data
  );
  const result = response.data.data;

  setAccessToken(result.accessToken);

  return result;
};
