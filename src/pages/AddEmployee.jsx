import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

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
      await axios.post(
        "https://employee-management-backend-production-dc04.up.railway.app/api/employees",
        employee
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Employee Added Successfully",
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

            <div className="card-header bg-primary text-white">

              <h3 className="mb-0 text-center">
                ➕ Add Employee
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
                    <option value="">
                      Select Department
                    </option>

                    <option>IT</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </div>

                <div className="d-grid">

                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                  >
                    💾 Save Employee
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

export default AddEmployee;