import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

const location = useLocation();

if (location.pathname === "/login") {
  return null;
}

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Employee Management
        </Link>

        <div className="d-flex align-items-center">

          <Link
            to="/dashboard"
            className="btn btn-primary me-2"
          >
            Dashboard
          </Link>

          <Link
            to="/"
            className="btn btn-success me-2"
          >
            Employees
          </Link>

          <Link
            to="/add"
            className="btn btn-warning me-3"
          >
            Add Employee
          </Link>

          {user && (
            <span className="text-white me-3">
              Welcome, {user.name}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="btn btn-danger"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;