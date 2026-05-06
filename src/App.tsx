import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import HomePage from "./features/user/pages/HomePage";
import TutorPage from "./features/user/pages/TutorPage";
import TutorDetailsPage from "./features/user/pages/TutorDetailsPage";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
