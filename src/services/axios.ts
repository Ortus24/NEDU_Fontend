import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

// ─── Cookie Helpers ─────────────────────────────────────────────────────────
// accessToken lưu trong cookie (không httpOnly để JS đọc được)
// expires = 15 phút, tương đương với thời gian sống của JWT access token

const COOKIE_KEY = "accessToken";

function setCookie(name: string, value: string, minutesTTL: number) {
  const expires = new Date(Date.now() + minutesTTL * 60 * 1000).toUTCString();
  // SameSite=Strict để bảo vệ CSRF; không dùng Secure vì đang dev ở localhost HTTP
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

function getCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}

// ─── Axios Instance ──────────────────────────────────────────────────────────
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Cho phép gửi/nhận cookie HttpOnly (refreshToken từ backend)
});

// Cache token trong memory để tránh đọc cookie nhiều lần
let _memToken: string | null = getCookie(COOKIE_KEY);

export const setAccessToken = (token: string | null) => {
  _memToken = token;
  if (token) {
    setCookie(COOKIE_KEY, token, 15); // Hết hạn sau 15 phút
  } else {
    deleteCookie(COOKIE_KEY);
  }
};

export const getAccessToken = () => _memToken || getCookie(COOKIE_KEY);

// ─── Request Interceptor ─────────────────────────────────────────────────────
// Tự động gắn Authorization header từ cookie mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = _memToken || getCookie(COOKIE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────────────────
// Nếu 401 → tự động gọi refresh-token, nếu refresh cũng fail → logout
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Không retry nếu đang ở các API auth (tránh vòng lặp vô tận)
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token được gửi tự động qua HttpOnly cookie
        const res = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data?.data?.accessToken || res.data?.accessToken;
        setAccessToken(newToken); // Lưu vào cookie + memory
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        // Refresh thất bại → clear mọi thứ, chuyển về login
        setAccessToken(null);
        deleteCookie("user");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
