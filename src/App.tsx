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
import StudentProfilePage from "./features/student_modules/StudentProfilePage";
import CoursePage from "./features/student_modules/CoursePage";
import StudentLearningProgressPage from "./features/student_modules/StudentLearningProgressPage";
import StudentBillingPage from "./features/student_modules/StudentBillingPage";
import StudentPortalLayout from "./features/student_modules/layouts/StudentPortalLayout";
import StudentTutorPage from "./features/student_modules/TutorPage";
import "./App.css";
import RegisterPage from "./features/auth/pages/RegisterPage";
import UserLayout from "./features/user/layouts/UserLayout";
import NotFoundPage from "./shared/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          {/* Đường dẫn mặc định */}
          <Route path="/" element={<HomePage />} />

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

        {/* Đường dẫn localhost:5173/login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Đường dẫn phức tạp: /asdss/login */}
        <Route path="/asdss/login" element={<LoginPage />} />

        {/* Đường dẫn localhost:5173/register */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
