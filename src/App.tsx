import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import HomePage from "./features/user/pages/HomePage";
import TutorPage from "./features/user/pages/TutorPage";
import TutorDetailsPage from "./features/user/pages/TutorDetailsPage";
import "./App.css";
import RegisterPage from "./features/auth/pages/RegisterPage";
import UserLayout from "./features/user/layouts/UserLayout";

// Admin imports
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./features/admin/pages/DashboardPage";
import PlaceholderPage from "./features/admin/components/PlaceholderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============ USER ROUTES ============ */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tutor" element={<TutorPage />} />
          <Route path="/tutor/:id" element={<TutorDetailsPage />} />
        </Route>

        {/* ============ AUTH ROUTES ============ */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/asdss/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ============ ADMIN ROUTES ============ */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard - màn hình mặc định */}
          <Route index element={<DashboardPage />} />

          {/* Quản lý học sinh */}
          <Route
            path="students"
            element={
              <PlaceholderPage
                title="Quản lý Học sinh"
                description="Màn hình danh sách và chi tiết học sinh đang được phát triển."
              />
            }
          />

          {/* Quản lý gia sư */}
          <Route
            path="tutors"
            element={
              <PlaceholderPage
                title="Quản lý Gia sư"
                description="Màn hình danh sách gia sư đang được phát triển."
              />
            }
          />

          {/* Duyệt eKYC */}
          <Route
            path="kyc"
            element={
              <PlaceholderPage
                title="Duyệt hồ sơ eKYC"
                description="Màn hình kiểm duyệt hồ sơ gia sư (CCCD, bằng cấp, video) đang được phát triển."
              />
            }
          />
          <Route
            path="kyc/:id"
            element={
              <PlaceholderPage
                title="Chi tiết hồ sơ Gia sư"
                description="Màn hình xem chi tiết và phân xử hồ sơ gia sư đang được phát triển."
              />
            }
          />

          {/* Tài chính */}
          <Route
            path="finance"
            element={
              <PlaceholderPage
                title="Quản lý Tài chính"
                description="Màn hình Escrow, giải ngân và cấu hình phí nền tảng đang được phát triển."
              />
            }
          />

          {/* Tranh chấp */}
          <Route
            path="disputes"
            element={
              <PlaceholderPage
                title="Trung tâm Xử lý Tranh chấp"
                description="Màn hình tiếp nhận và phân xử ticket khiếu nại đang được phát triển."
              />
            }
          />
          <Route
            path="disputes/:id"
            element={
              <PlaceholderPage
                title="Chi tiết Tranh chấp"
                description="Màn hình xử lý ticket tranh chấp đang được phát triển."
              />
            }
          />

          {/* Cài đặt */}
          <Route
            path="settings"
            element={
              <PlaceholderPage
                title="Cài đặt Nền tảng"
                description="Màn hình cấu hình phí và gói subscription đang được phát triển."
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
