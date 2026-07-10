import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://employee-management-backend-production-dc04.up.railway.app/api/employees"
      );

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const departments = {};

  employees.forEach((emp) => {
    departments[emp.department] =
      (departments[emp.department] || 0) + 1;
  });

  const colors = [
    "#0d6efd",
    "#198754",
    "#ffc107",
    "#dc3545",
    "#6f42c1",
    "#20c997",
    "#fd7e14",
    "#6610f2",
  ];

  const barData = {
    labels: Object.keys(departments),
    datasets: [
      {
        label: "Employees",
        data: Object.values(departments),
        backgroundColor: colors,
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(departments),
    datasets: [
      {
        data: Object.values(departments),
        backgroundColor: colors,
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="mt-3">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>No Employees Found</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            📊 Dashboard
          </h2>

          <p className="text-muted mb-0">
            Welcome Back 👋
          </p>

        </div>

        <span className="badge bg-primary p-3 fs-6">
          {new Date().toLocaleDateString()}
        </span>

      </div>

      {/* Cards */}

      <div className="row">

        <div className="col-md-3 mb-4">

          <div className="card shadow h-100 border-0 text-bg-primary">

            <div className="card-body">

              <h6>Total Employees</h6>

              <h1>{employees.length}</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-4">

          <div className="card shadow h-100 border-0 text-bg-success">

            <div className="card-body">

              <h6>Total Departments</h6>

              <h1>{Object.keys(departments).length}</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-4">

          <div className="card shadow h-100 border-0 text-bg-info">

            <div className="card-body">

              <h6>Active Employees</h6>

              <h1>{employees.length}</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-4">

          <div className="card shadow h-100 border-0 text-bg-dark">

            <div className="card-body">

              <h6>Latest Employee</h6>

              <h4>

                {employees.length
                  ? employees[employees.length - 1].name
                  : "-"}

              </h4>

            </div>

          </div>

        </div>

      </div>

      {/* Charts */}

      <div className="row">

        <div className="col-lg-6 mb-4">

          <div className="card shadow border-0 h-100">

            <div className="card-header fw-bold">
              📊 Department Wise Employees
            </div>

            <div
              className="card-body"
              style={{ height: "350px" }}
            >

              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />

            </div>

          </div>

        </div>

        <div className="col-lg-6 mb-4">

          <div className="card shadow border-0 h-100">

            <div className="card-header fw-bold">
              🥧 Employee Distribution
            </div>

            <div
              className="card-body"
              style={{ height: "350px" }}
            >

              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;