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
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h3 className="text-center mb-4">
        👨‍💼 EMS
      </h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link
            to="/dashboard"
            className="nav-link text-white"
          >
            📊 Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/"
            className="nav-link text-white"
          >
            👨 Employees
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/add"
            className="nav-link text-white"
          >
            ➕ Add Employee
          </Link>
        </li>

      </ul>

      <hr />

      <p>
        👋 {user?.name}
      </p>

      <button
        className="btn btn-danger w-100"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;