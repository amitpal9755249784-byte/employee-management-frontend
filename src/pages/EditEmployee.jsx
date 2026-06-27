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
    try {
      const response = await axios.get(
        `https://employee-management-backend-production-dc04.up.railway.app/api/employees/${id}`
      );

      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employee.name ||
      !employee.email ||
      !employee.phone ||
      !employee.department
    ) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all fields.",
      });
      return;
    }

    try {
      await axios.put(
        `https://employee-management-backend-production-dc04.up.railway.app/api/employees/${id}`,
        employee
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Employee Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong.",
      });

      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <div className="card shadow border-0">

            <div className="card-header bg-warning">
              <h3 className="text-center mb-0">
                ✏ Edit Employee
              </h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Employee Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Employee Name"
                    value={employee.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={employee.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={employee.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Department
                  </label>

                  <select
                    className="form-select"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option>IT</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg"
                  >
                    💾 Update Employee
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