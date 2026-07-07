import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [dateTime, setDateTime] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      setDateTime(
        now.toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (location.pathname === "/login") return null;

  return (
    <nav
      className="navbar navbar-light bg-white shadow-sm px-3"
      style={{
        height: "70px",
        position: "sticky",
        top: 0,
        zIndex: 1030,
      }}
    >
      <div className="container-fluid">

        {/* Left */}
        <div className="d-flex align-items-center">

          <button
            className="btn btn-outline-primary me-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>

          <h5 className="fw-bold text-primary mb-0 d-none d-md-block">
            👨‍💼 Employee Management System
          </h5>

          <h6 className="fw-bold text-primary mb-0 d-md-none">
            EMS
          </h6>

        </div>

        
        {/* Right */}
        <div className="d-flex align-items-center">

          <div className="text-end me-3 d-none d-md-block">

    <div className="fw-bold">
      👋 Welcome, {user?.name}
    </div>

    <small className="text-muted">
      {dateTime}
    </small>

  </div>

  <div className="dropdown">

    <button
      type="button"
      className="btn btn-light dropdown-toggle d-flex align-items-center"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >

      <div
        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2"
        style={{
          width: "40px",
          height: "40px",
          fontWeight: "bold",
        }}
      >
        {user?.name?.charAt(0)?.toUpperCase()}
      </div>

      <span className="d-none d-md-inline">
        {user?.name}
      </span>

    </button>

    <ul className="dropdown-menu dropdown-menu-end shadow">

      <li>
        <button
          className="dropdown-item"
          onClick={() => navigate("/profile")}
        >
          👤 Profile
        </button>
      </li>

      <li>
        <button
          className="dropdown-item"
          onClick={() => navigate("/change-password")}
        >
          🔒 Change Password
        </button>
      </li>

      <li>
        <hr className="dropdown-divider" />
      </li>

      <li>
        <button
          className="dropdown-item text-danger"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </li>

    </ul>

  </div>

</div>

      </div>
    </nav>
  );
}

export default Navbar;