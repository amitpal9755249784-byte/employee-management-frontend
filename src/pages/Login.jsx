import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter email and password.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://employee-management-backend-production-dc04.up.railway.app/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Email or Password",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0d6efd,#6610f2)",
      }}
    >
      <div className="col-md-4">

        <div
          className="card shadow-lg border-0"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body p-4">

            <div className="text-center mb-4">

              <h1 style={{ fontSize: "60px" }}>
                👨‍💼
              </h1>

              <h3 className="fw-bold">
                Employee Management
              </h3>

              <p className="text-muted">
                Login to continue
              </p>

            </div>

            <form onSubmit={handleLogin}>

              <div className="mb-3">

                <label className="form-label fw-bold">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

              <div className="mb-3">

                <label className="form-label fw-bold">
                  Password
                </label>

                <div className="input-group">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              <div className="d-grid mb-3">

                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                >
                  🔐 Login
                </button>

              </div>

            </form>

            <div className="text-center">

              <span className="text-muted">
                Don't have an account?
              </span>

              <br />

              <Link
                to="/register"
                className="fw-bold text-decoration-none"
              >
                Register Here
              </Link>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;