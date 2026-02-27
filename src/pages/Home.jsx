import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Đây là trang Home</h1>
      <p>Chào mừng bạn đến với ứng dụng Vite + React!</p>
      <Link
        to="/login"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Đi tới trang Đăng nhập
      </Link>
    </div>
  );
}

export default Home;
