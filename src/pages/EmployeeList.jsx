import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);

    const response = await axios.get(
      "http://127.0.0.1:8000/api/employees"
    );

    await new Promise(resolve => setTimeout(resolve, 2000));

    setEmployees(response.data);

    setLoading(false);
  };

  const deleteEmployee = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    await axios.delete(
      `http://127.0.0.1:8000/api/employees/${id}`
    );

    Swal.fire({
      title: "Deleted!",
      text: "Employee Deleted Successfully",
      icon: "success",
    });

    fetchEmployees();
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-2">
          Loading Employees...
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Employee List</h2>

      <Link
        to="/add"
        className="btn btn-primary mb-3"
      >
        Add Employee
      </Link>

      <input
        type="text"
        placeholder="Search Employee"
        className="form-control mb-3"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees
            .filter((employee) =>
              employee.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>

                <td>
                  <Link
                    to={`/edit/${employee.id}`}
                  >
                    <button className="btn btn-warning btn-sm me-2">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteEmployee(employee.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;