import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

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

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
  console.log(error.response?.data);

  alert(
    JSON.stringify(
      error.response?.data || error.message
    )
  );
}
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>

            <div className="card-body">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;