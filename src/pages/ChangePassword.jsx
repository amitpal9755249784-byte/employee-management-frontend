import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.current_password ||
      !formData.new_password ||
      !formData.new_password_confirmation
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill all fields.",
      });
      return;
    }

    if (
      formData.new_password !==
      formData.new_password_confirmation
    ) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Confirm Password does not match.",
      });
      return;
    }

    try {
      await axios.put(
        `https://employee-management-backend-production-dc04.up.railway.app/api/change-password/${user.id}`,
        formData
      );

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password Changed Successfully.\nPlease login again.",
      });

      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to change password.",
      });
    }
  };

  return (
    <div className="container mt-4">

      <div className="row justify-content-center">

        <div className="col-lg-6">

          <div className="card shadow border-0">

            <div className="card-header bg-primary text-white">

              <h3 className="mb-0">
                🔒 Change Password
              </h3>

            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Current Password
                  </label>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="form-control"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    New Password
                  </label>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="form-control"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="form-control"
                    name="new_password_confirmation"
                    value={
                      formData.new_password_confirmation
                    }
                    onChange={handleChange}
                  />

                </div>

                <div className="form-check mb-4">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() =>
                      setShowPassword(!showPassword)
                    }
                  />

                  <label
                    className="form-check-label"
                    htmlFor="showPassword"
                  >
                    Show Password
                  </label>

                </div>

                <div className="d-grid">

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                  >
                    🔒 Change Password
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ChangePassword;