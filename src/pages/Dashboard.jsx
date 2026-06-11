import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [count, setCount] = useState(0);

    useEffect(() => {
  fetchEmployees();
}, []);

const fetchEmployees = async () => {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/employees"
  );

  setCount(response.data.length);
};

  return (
    <div className="card text-bg-primary">
      <h2>Dashboard</h2>

      <div className="card border-primary">
        <div className="card-body">
          <h3>Total Employees</h3>
          <h1>{count}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;