import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ViewEmployee() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `https://employee-management-backend-production-dc04.up.railway.app/api/employees/${id}`
      );

       console.log(response.data);
       
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!employee) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-lg-6">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                👁 View Employee
              </h3>
            </div>

            <div className="card-body">

              <div className="text-center mb-4">

                <div
                  className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {employee.name?.charAt(0).toUpperCase()}
                </div>

              </div>

              <table className="table table-bordered">

                <tbody>

                  <tr>
                    <th width="35%">Employee ID</th>
                    <td>{employee.id}</td>
                  </tr>

                  <tr>
                    <th>Name</th>
                    <td>{employee.name}</td>
                  </tr>

                  <tr>
                    <th>Email</th>
                    <td>{employee.email}</td>
                  </tr>

                  <tr>
                    <th>Phone</th>
                    <td>{employee.phone}</td>
                  </tr>

                  <tr>
                    <th>Department</th>
                    <td>{employee.department}</td>
                  </tr>

                  <tr>
                    <th>Created At</th>
                    <td>
                      {new Date(employee.created_at).toLocaleDateString()}
                    </td>
                  </tr>

                </tbody>

              </table>

              <div className="d-flex justify-content-between">

                <Link
                  to="/"
                  className="btn btn-secondary"
                >
                  ← Back
                </Link>

                <Link
                  to={`/edit/${employee.id}`}
                  className="btn btn-warning"
                >
                  ✏ Edit
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewEmployee;