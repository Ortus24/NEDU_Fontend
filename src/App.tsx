import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import HomePage from "./features/user/pages/HomePage";
import TutorPage from "./features/user/pages/TutorPage";
import TutorDetailsPage from "./features/user/pages/TutorDetailsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Đường dẫn mặc định */}
        <Route path="/" element={<HomePage />} />

        {/* Đường dẫn nhánh Tìm gia sư */}
        <Route path="/tutor" element={<TutorPage />} />

        {/* Đường dẫn chi tiết gia sư */}
        <Route path="/tutor/:id" element={<TutorDetailsPage />} />

        {/* Đường dẫn localhost:5173/login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Đường dẫn phức tạp: /asdss/login */}
        <Route path="/asdss/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
