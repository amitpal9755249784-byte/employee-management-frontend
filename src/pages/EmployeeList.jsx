import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  

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

  const filteredEmployees = employees
  .filter((employee) =>
    employee.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .sort((a, b) => {
    switch (sortBy) {

      case "idAsc":
        return a.id - b.id;

      case "idDesc":
        return b.id - a.id;

      case "nameAsc":
        return a.name.localeCompare(b.name);

      case "nameDesc":
        return b.name.localeCompare(a.name);

      case "deptAsc":
        return a.department.localeCompare(
          b.department
        );

      case "deptDesc":
        return b.department.localeCompare(
          a.department
        );

      default:
        return 0;
    }
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee =
    indexOfLastEmployee - employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            👨 Employee List
          </h2>

          <p className="text-muted mb-0">
            Total Employees :{" "}
            <strong>{employees.length}</strong>
          </p>
        </div>

        <Link
          to="/add"
          className="btn btn-primary"
        >
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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="row mb-3">

  <div className="col-md-3">

    <select
      className="form-select"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="">Sort By</option>

      <option value="idAsc">
          ID (Low to High)
      </option>

      <option value="idDesc">
          ID (High to Low)
      </option>

      <option value="nameAsc">
        Name (A-Z)
      </option>

      <option value="nameDesc">
        Name (Z-A)
      </option>

      <option value="deptAsc">
        Department (A-Z)
      </option>

      <option value="deptDesc">
        Department (Z-A)
      </option>

    </select>

  </div>

</div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>S.No.</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th width="170">
                    Action
                  </th>
                </tr>

              </thead>

              <tbody>

                {currentEmployees.length > 0 ? (

                  currentEmployees.map(
                    (employee, index) => (

                      <tr key={employee.id}>

                        <td>
                          {indexOfFirstEmployee + index + 1}
                        </td>

                        <td>{employee.id}</td>

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
                            to={`/view/${employee.id}`}
                            className="btn btn-info btn-sm me-2"
                          >
                            👁 View
                          </Link>

                          <Link
                            to={`/edit/${employee.id}`}
                            className="btn btn-warning btn-sm me-2"
                          >
                            ✏ Edit
                          </Link>

                          <button
                            className="btn btn-danger btn-sm "
                            onClick={() =>
                              deleteEmployee(employee.id)
                            }
                          >
                            🗑 Delete
                          </button>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-4"
                    >
                      No Employees Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">

            <small className="text-muted">

              Showing{" "}

              {filteredEmployees.length === 0
                ? 0
                : indexOfFirstEmployee + 1}

              {" "}to{" "}

              {Math.min(
                indexOfLastEmployee,
                filteredEmployees.length
              )}

              {" "}of{" "}

              {filteredEmployees.length}

              {" "}Employees

            </small>

            <nav>

              <ul className="pagination mb-0">

                <li
                  className={`page-item ${
                    currentPage === 1
                      ? "disabled"
                      : ""
                  }`}
                >

                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(
                        currentPage - 1
                      )
                    }
                  >
                    Previous
                  </button>

                </li>

                {Array.from(
                  { length: totalPages },
                  (_, i) => (

                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1
                          ? "active"
                          : ""
                      }`}
                    >

                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage(i + 1)
                        }
                      >
                        {i + 1}
                      </button>

                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    currentPage === totalPages ||
                    totalPages === 0
                      ? "disabled"
                      : ""
                  }`}
                >

                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(
                        currentPage + 1
                      )
                    }
                  >
                    Next
                  </button>

                </li>

              </ul>

            </nav>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeList;