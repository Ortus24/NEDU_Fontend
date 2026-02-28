import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import HomePage from "./features/user/pages/HomePage";
import TutorPage from "./features/user/pages/TutorPage";
import TutorDetailsPage from "./features/user/pages/TutorDetailsPage";
import "./App.css";
import RegisterPage from "./features/auth/pages/RegisterPage";
import UserLayout from "./features/user/layouts/UserLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          {/* Đường dẫn mặc định */}
          <Route path="/" element={<HomePage />} />

          {/* Đường dẫn nhánh Tìm gia sư */}
          <Route path="/tutor" element={<TutorPage />} />

          {/* Đường dẫn chi tiết gia sư */}
          <Route path="/tutor/:id" element={<TutorDetailsPage />} />
        </Route>

        {/* Đường dẫn localhost:5173/login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Đường dẫn phức tạp: /asdss/login */}
        <Route path="/asdss/login" element={<LoginPage />} />

        {/* Đường dẫn localhost:5173/register */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
