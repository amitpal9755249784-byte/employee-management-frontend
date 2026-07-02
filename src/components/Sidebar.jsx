import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (location.pathname === "/login") return null;

  return (
    <div
      className="text-white shadow d-flex flex-column"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#212529",
      }}
    >
      {/* Logo */}
      <div className="text-center py-4 border-bottom border-secondary">
        <h3 className="fw-bold mb-1">
          <FaUsers className="me-2" />
          EMS
        </h3>

        <small className="text-light">
          Employee Management
        </small>
      </div>

      {/* Menu */}
      <div className="p-3 flex-grow-1">

        <Link
          to="/dashboard"
          className={`nav-link rounded p-3 mb-2 ${
            location.pathname === "/dashboard"
              ? "bg-primary text-white"
              : "text-white"
          }`}
        >
          <FaTachometerAlt className="me-2" />
          Dashboard
        </Link>

        <Link
          to="/"
          className={`nav-link rounded p-3 mb-2 ${
            location.pathname === "/"
              ? "bg-primary text-white"
              : "text-white"
          }`}
        >
          <FaUsers className="me-2" />
          Employees
        </Link>

        <Link
          to="/add"
          className={`nav-link rounded p-3 mb-2 ${
            location.pathname === "/add"
              ? "bg-primary text-white"
              : "text-white"
          }`}
        >
          <FaUserPlus className="me-2" />
          Add Employee
        </Link>

      </div>

      {/* User & Logout */}
      <div className="p-3 border-top border-secondary">

        <div className="mb-3">

          <strong>{user?.name}</strong>

          <br />

          <small className="text-light">
            {user?.email}
          </small>

        </div>

        <button
          onClick={logout}
          className="btn btn-danger w-100"
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;