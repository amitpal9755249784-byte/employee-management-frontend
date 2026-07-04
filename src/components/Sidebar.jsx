import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen, isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();

const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
  localStorage.removeItem("user");

  if (isMobile) {
    setSidebarOpen(false);
  }

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
    whiteSpace: "nowrap",
    overflow: "hidden",
    transition: "0.3s",
    fontWeight: "500",
  });

  return (
    <div
  className="d-flex flex-column shadow"
  style={{
    width: sidebarOpen ? "250px" : "80px",
    height: "100vh",
    position: "fixed",
    top: 0,

    left: isMobile
      ? sidebarOpen
        ? "0"
        : "-250px"
      : "0",

    backgroundColor: "#212529",

    transition: "all .3s ease",

    zIndex: 1050,
  }}
>
  {isMobile && sidebarOpen && (
  <div
    onClick={() => setSidebarOpen(false)}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,.5)",
      zIndex: -1,
    }}
  />
)}
      {/* Logo */}
      <div
        className="text-center text-white py-4"
        style={{
          borderBottom: "1px solid #495057",
        }}
      >
        <h3 className="fw-bold mb-1">
          <FaUsers />
          {sidebarOpen && (
            <span className="ms-2">EMS</span>
          )}
        </h3>

        {sidebarOpen && (
          <small className="text-secondary">
            Employee Management
          </small>
        )}
      </div>

      {/* Menu */}
      <div className="p-3 flex-grow-1">

        <Link
  to="/dashboard"
  style={menuStyle("/dashboard")}
  onClick={() => isMobile && setSidebarOpen(false)}
>
          <FaTachometerAlt size={20} />
          {sidebarOpen && (
            <span className="ms-3">
              Dashboard
            </span>
          )}
        </Link>

        <Link
  to="/"
  style={menuStyle("/")}
  onClick={() => isMobile && setSidebarOpen(false)}
>
          <FaUsers size={20} />
          {sidebarOpen && (
            <span className="ms-3">
              Employees
            </span>
          )}
        </Link>

       <Link
  to="/add"
  style={menuStyle("/add")}
  onClick={() => isMobile && setSidebarOpen(false)}
>
          <FaUserPlus size={20} />
          {sidebarOpen && (
            <span className="ms-3">
              Add Employee
            </span>
          )}
        </Link>

      </div>

      {/* User */}
      <div
        className="p-3 text-white"
        style={{
          borderTop: "1px solid #495057",
        }}
      >
        {sidebarOpen && (
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
        )}

        <button
          className="btn btn-danger w-100"
          onClick={logout}
        >
          <FaSignOutAlt />
          {sidebarOpen && (
            <span className="ms-2">
              Logout
            </span>
          )}
        </button>

      </div>
    </div>
  );
}

export default Sidebar;