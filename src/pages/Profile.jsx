import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="container mt-4">

      <div className="row justify-content-center">

        <div className="col-lg-6">

          <div className="card shadow border-0">

            <div className="card-header bg-primary text-white text-center py-4">

              <div
                className="rounded-circle bg-white text-primary d-flex justify-content-center align-items-center mx-auto mb-3"
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <h3>{user?.name}</h3>

              <p className="mb-0">
                Employee
              </p>

            </div>

            <div className="card-body">

              <table className="table table-bordered">

                <tbody>

                  <tr>
                    <th width="35%">Name</th>
                    <td>{user?.name}</td>
                  </tr>

                  <tr>
                    <th>Email</th>
                    <td>{user?.email}</td>
                  </tr>

                  <tr>
                    <th>Role</th>
                    <td>Employee</td>
                  </tr>

                  <tr>
                    <th>Status</th>
                    <td>
                      <span className="badge bg-success">
                        Active
                      </span>
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;