import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get(
      "https://employee-management-backend-production-dc04.up.railway.app/api/employees"
    );

    setEmployees(response.data);
  };

  const deleteEmployee = async (id) => {
    const result = await Swal.fire({
      title: "Delete Employee?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    await axios.delete(
      `https://employee-management-backend-production-dc04.up.railway.app/api/employees/${id}`
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Employee deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchEmployees();
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">👨 Employee List</h2>
          <p className="text-muted mb-0">
            Total Employees : <strong>{employees.length}</strong>
          </p>
        </div>

        <Link to="/add" className="btn btn-primary">
          ➕ Add Employee
        </Link>
      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <input
            type="text"
            className="form-control mb-4"
            placeholder="🔍 Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th width="170">Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee, index) => (
                    <tr key={employee.id}>

                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {employee.name}
                      </td>

                      <td>{employee.email}</td>

                      <td>{employee.phone}</td>

                      <td>
                        <span className="badge bg-success">
                          {employee.department}
                        </span>
                      </td>

                      <td>

                        <Link
                          to={`/edit/${employee.id}`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          ✏ Edit
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteEmployee(employee.id)
                          }
                        >
                          🗑 Delete
                        </button>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-muted py-4"
                    >
                      No Employees Found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeList;