import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const [dateTime, setDateTime] = useState("");

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
      className="navbar navbar-light bg-white shadow-sm px-4"
      style={{
        height: "70px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">

        <div className="d-flex align-items-center">

          <button
            className="btn btn-outline-primary me-3"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >
            <FaBars />
          </button>

          <h4 className="fw-bold text-primary mb-0">
            Employee Management System
          </h4>

        </div>

        <div className="d-flex align-items-center">

          <div className="text-end me-3">

            <div className="fw-bold">
              👋 Welcome, {user?.name}
            </div>

            <small className="text-muted">
              {dateTime}
            </small>

          </div>

          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
            style={{
              width: "45px",
              height: "45px",
              fontWeight: "bold",
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;