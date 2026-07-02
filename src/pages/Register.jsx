import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please fill all fields",
      });
      return;
    }

    if (user.password !== user.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
      return;
    }

    try {
      await axios.post(
        "https://employee-management-backend-production-dc04.up.railway.app/api/register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration Successful",
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Registration Failed",
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

        <div className="card shadow-lg border-0">

          <div className="card-body p-4">

            <h2 className="text-center mb-4">
              Register
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-3"
                value={user.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={user.email}
                onChange={handleChange}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                value={user.password}
                onChange={handleChange}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-control mb-3"
                value={user.confirmPassword}
                onChange={handleChange}
              />

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() =>
                    setShowPassword(!showPassword)
                  }
                />

                <label className="form-check-label">
                  Show Password
                </label>
              </div>

              <button
                className="btn btn-primary w-100"
              >
                Register
              </button>

            </form>

            <div className="text-center mt-3">

              Already have an account?

              <br />

              <Link to="/login">
                Login Here
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;