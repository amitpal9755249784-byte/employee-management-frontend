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
      className="text-white shadow"
      style={{
  width: "250px",
  minHeight: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  backgroundColor: "#1e1e2d",
}}
    >
      <div className="text-center py-4 border-bottom">
        <h3 className="fw-bold">
          <FaUsers className="me-2" />
          EMS
        </h3>

        <small>
          Employee Management
        </small>
      </div>

      <div className="p-3">

        <Link
          to="/dashboard"
          className={`nav-link text-white rounded p-3 mb-2 ${
            location.pathname === "/dashboard"
              ? "bg-light text-dark"
              : ""
          }`}
        >
          <FaTachometerAlt className="me-2" />
          Dashboard
        </Link>

        <Link
          to="/"
          className={`nav-link text-white rounded p-3 mb-2 ${
            location.pathname === "/"
              ? "bg-light text-dark"
              : ""
          }`}
        >
          <FaUsers className="me-2" />
          Employees
        </Link>

        <Link
          to="/add"
          className={`nav-link text-white rounded p-3 mb-2 ${
            location.pathname === "/add"
              ? "bg-light text-dark"
              : ""
          }`}
        >
          <FaUserPlus className="me-2" />
          Add Employee
        </Link>

      </div>

      <div
        className="position-absolute bottom-0 start-0 w-100 p-3 border-top"
      >

        <div className="mb-3">

          <strong>{user?.name}</strong>

          <br />

          <small>{user?.email}</small>

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