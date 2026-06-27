import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ background: "#0d6efd" }}
    >
      <div className="container">

        <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
          👨‍💼 Employee Management
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item me-2">
              <Link
                to="/dashboard"
                className="btn btn-outline-light"
              >
                📊 Dashboard
              </Link>
            </li>

            <li className="nav-item me-2">
              <Link
                to="/"
                className="btn btn-outline-light"
              >
                👨 Employees
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link
                to="/add"
                className="btn btn-warning fw-bold"
              >
                ➕ Add Employee
              </Link>
            </li>

            {user && (
              <li className="nav-item me-3 text-white fw-bold">
                👋 {user.name}
              </li>
            )}

            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-danger"
              >
                🚪 Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;