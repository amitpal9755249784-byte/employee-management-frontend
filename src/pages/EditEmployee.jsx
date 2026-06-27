import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const response = await axios.get(
      `https://employee-management-backend-production-dc04.up.railway.app/api/employees/${id}`
    );

    setEmployee(response.data);
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `https://employee-management-backend-production-dc04.up.railway.app/api/employees/${id}`,
      employee
    );

 Swal.fire({
  title: "Updated!",
  text: "Employee Updated Successfully",
  icon: "success",
});

    navigate("/");
  };

 return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header bg-warning text-dark">
            <h3 className="mb-0 text-center">
              Edit Employee
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={employee.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  className="form-control"
                  value={employee.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-warning"
                >
                  Update Employee
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

export default EditEmployee;