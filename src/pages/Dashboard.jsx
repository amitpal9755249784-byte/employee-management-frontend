import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get(
      "https://employee-management-backend-production-dc04.up.railway.app/api/employees"
    );

    setEmployees(response.data);
  };

  const totalEmployees = employees.length;

  const totalDepartments = [
    ...new Set(employees.map((emp) => emp.department)),
  ].length;

  return (
    <div className="container mt-4">

      <h2 className="mb-4 fw-bold">
        📊 Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card text-white bg-primary shadow-lg border-0">
            <div className="card-body text-center">
              <h5>Total Employees</h5>

              <h1>{totalEmployees}</h1>

              <p className="mb-0">
                👨 Employees
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-white bg-success shadow-lg border-0">
            <div className="card-body text-center">
              <h5>Departments</h5>

              <h1>{totalDepartments}</h1>

              <p className="mb-0">
                🏢 Departments
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-white bg-warning shadow-lg border-0">
            <div className="card-body text-center">
              <h5>System Status</h5>

              <h1>🟢</h1>

              <p className="mb-0">
                Online
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">
            Recent Employees
          </h4>
        </div>

        <div className="card-body">

          <table className="table table-hover">

            <thead>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
              </tr>

            </thead>

            <tbody>

              {employees.slice(0, 5).map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;