import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Đường dẫn mặc định */}
        <Route path="/" element={<Home />} />

        {/* Đường dẫn localhost:5173/login */}
        <Route path="/login" element={<Login />} />

        {/* Đường dẫn phức tạp: /asdss/login */}
        <Route path="/asdss/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
