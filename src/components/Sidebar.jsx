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

  const menuStyle = (path) => ({
    backgroundColor:
      location.pathname === path ? "#0d6efd" : "transparent",
    color: "#fff",
    borderRadius: "10px",
    padding: "12px 15px",
    marginBottom: "10px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "0.3s",
    fontWeight: "500",
  });

  return (
    <div
      className="d-flex flex-column shadow"
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
      <div
        className="text-center text-white py-4"
        style={{
          borderBottom: "1px solid #495057",
        }}
      >
        <h3 className="fw-bold mb-1">
          <FaUsers className="me-2" />
          EMS
        </h3>

        <small className="text-secondary">
          Employee Management
        </small>
      </div>

      {/* Menu */}
      <div className="p-3 flex-grow-1">

        <Link
          to="/dashboard"
          style={menuStyle("/dashboard")}
        >
          <FaTachometerAlt className="me-3" />
          Dashboard
        </Link>

        <Link
          to="/"
          style={menuStyle("/")}
        >
          <FaUsers className="me-3" />
          Employees
        </Link>

        <Link
          to="/add"
          style={menuStyle("/add")}
        >
          <FaUserPlus className="me-3" />
          Add Employee
        </Link>

      </div>

      {/* User */}
      <div
        className="p-3 text-white"
        style={{
          borderTop: "1px solid #495057",
        }}
      >
        <div
          className="mb-3 p-2 rounded"
          style={{
            backgroundColor: "#343a40",
          }}
        >
          <strong>{user?.name}</strong>
          <br />
          <small className="text-secondary">
            {user?.email}
          </small>
        </div>

        <button
          className="btn btn-danger w-100"
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;