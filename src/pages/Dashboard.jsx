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

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get(
      "https://employee-management-backend-production-dc04.up.railway.app/api/employees"
    );

    setEmployees(response.data);
  };

  const departments = {};

  employees.forEach((emp) => {
    departments[emp.department] =
      (departments[emp.department] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(departments),
    datasets: [
      {
        label: "Employees",
        data: Object.values(departments),
      },
    ],
  };

  const pieData = {
    labels: Object.keys(departments),
    datasets: [
      {
        data: Object.values(departments),
      },
    ],
  };

  return (
    <div className="container-fluid">

      <h2 className="mb-4 fw-bold">
        Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4 mb-4">

          <div className="card text-bg-primary shadow">

            <div className="card-body">

              <h5>Total Employees</h5>

              <h1>{employees.length}</h1>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="card text-bg-success shadow">

            <div className="card-body">

              <h5>Total Departments</h5>

              <h1>{Object.keys(departments).length}</h1>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="card text-bg-warning shadow">

            <div className="card-body">

              <h5>Today's Date</h5>

              <h5>{new Date().toLocaleDateString()}</h5>

            </div>

          </div>

        </div>

      </div>

      <div className="row">

        <div className="col-lg-6 mb-4">

          <div className="card shadow">

            <div className="card-header">
              Department Wise Employees
            </div>

            <div className="card-body">
              <Bar data={barData} />
            </div>

          </div>

        </div>

        <div className="col-lg-6 mb-4">

          <div className="card shadow">

            <div className="card-header">
              Employee Distribution
            </div>

            <div className="card-body">
              <Pie data={pieData} />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;