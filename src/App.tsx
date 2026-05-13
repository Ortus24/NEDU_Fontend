import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import HomePage from "./features/user/pages/HomePage";
import TutorPage from "./features/user/pages/TutorPage";
import TutorDetailsPage from "./features/user/pages/TutorDetailsPage";
import TutorDashboardPage from "./features/user/pages/TutorDashboardPage";
import TutorClassesPage from "./features/user/pages/TutorClassesPage";
import TutorSchedulePage from "./features/user/pages/TutorSchedulePage";
import TutorFinancesPage from "./features/user/pages/TutorFinancesPage";
import TutorClassDetailPage from "./features/user/pages/TutorClassDetailPage";
import TutorAvailabilityPage from "./features/user/pages/TutorAvailabilityPage";
import TutorTrialRequestsPage from "./features/user/pages/TutorTrialRequestsPage";
import TutorTrialRequestDetailPage from "./features/user/pages/TutorTrialRequestDetailPage";
import StudentProfilePage from "./features/student_modules/StudentProfilePage";
import CoursePage from "./features/student_modules/CoursePage";
import StudentLearningProgressPage from "./features/student_modules/StudentLearningProgressPage";
import StudentBillingPage from "./features/student_modules/StudentBillingPage";
import StudentPortalLayout from "./features/student_modules/layouts/StudentPortalLayout";
import StudentTutorPage from "./features/student_modules/TutorPage";
import "./App.css";
import RegisterPage from "./features/auth/pages/RegisterPage";
import UserLayout from "./features/user/layouts/UserLayout";

// Admin Layout
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import DashboardPage from "./features/admin/pages/DashboardPage";
import TutorManagementPage from "./features/admin/pages/TutorManagementPage";
import KycListPage from "./features/admin/pages/KycListPage";
import KycDetailPage from "./features/admin/pages/KycDetailPage";
import StudentManagementPage from "./features/admin/pages/StudentManagementPage";
import FinancePage from "./features/admin/pages/FinancePage";
import DisputeListPage from "./features/admin/pages/DisputeListPage";
import DisputeDetailPage from "./features/admin/pages/DisputeDetailPage";
import SettingsPage from "./features/admin/pages/SettingsPage";
import NotFoundPage from "./shared/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============ USER ROUTES ============ */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tutor" element={<TutorPage />} />

          {/* Đường dẫn nhánh Tìm gia sư */}
          {/* <Route path="/tutor" element={<TutorPage />} /> */}

          {/* Đường dẫn chi tiết gia sư */}
          <Route path="/tutor/:id" element={<TutorDetailsPage />} />

          {/* Dashboard gia sư */}
          <Route path="/tutor/dashboard" element={<TutorDashboardPage />} />

          {/* Danh sách lớp học của gia sư */}
          <Route path="/tutor/classes" element={<TutorClassesPage />} />

          {/* Chi tiết lớp học của gia sư */}
          <Route path="/tutor/classes/:id" element={<TutorClassDetailPage />} />

          {/* Lịch dạy của gia sư */}
          <Route path="/tutor/schedule" element={<TutorSchedulePage />} />

          {/* Quản lý tài chính */}
          <Route path="/tutor/finances" element={<TutorFinancesPage />} />

          {/* Cài đặt thời gian rảnh */}
          <Route path="/tutor/availability" element={<TutorAvailabilityPage />} />

          {/* Yêu cầu học thử */}
          <Route path="/tutor/trial-requests" element={<TutorTrialRequestsPage />} />
          <Route path="/tutor/trial-requests/:id" element={<TutorTrialRequestDetailPage />} />
        </Route>

        {/* Nhóm các trang Student Portal sử dụng chung Layout */}
        <Route element={<StudentPortalLayout />}>
          <Route path="/profile/:userId" element={<StudentProfilePage />} />
          <Route
            path="/learning-progress"
            element={<StudentLearningProgressPage />}
          />
          <Route path="/progress" element={<CoursePage />} />
          <Route path="/tutor" element={<StudentTutorPage />} />
          <Route path="/billing" element={<StudentBillingPage />} />
        </Route>

        {/* ============ AUTH ROUTES ============ */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/asdss/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ============ ADMIN ROUTES ============ */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="tutors" element={<TutorManagementPage />} />
          <Route path="students" element={<StudentManagementPage />} />
          <Route path="kyc" element={<KycListPage />} />
          <Route path="kyc/:id" element={<KycDetailPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="disputes" element={<DisputeListPage />} />
          <Route path="disputes/:id" element={<DisputeDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
