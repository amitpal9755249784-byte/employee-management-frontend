import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://employee-management-backend-production-dc04.up.railway.app/api/profile/${user.id}`,
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile Updated Successfully",
      });

      setIsEdit(false);

      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to update profile",
      });
    }
  };

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
                {formData.name.charAt(0).toUpperCase()}
              </div>

              <h3>{formData.name}</h3>

              <p className="mb-0">
                Employee
              </p>

            </div>

            <div className="card-body">

              <table className="table table-bordered">

                <tbody>

                  <tr>

                    <th width="35%">
                      Name
                    </th>

                    <td>

                      {isEdit ? (

                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />

                      ) : (
                        formData.name
                      )}

                    </td>

                  </tr>

                  <tr>

                    <th>Email</th>

                    <td>

                      {isEdit ? (

                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />

                      ) : (
                        formData.email
                      )}

                    </td>

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

              <div className="text-center">

                {!isEdit ? (

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setIsEdit(true)
                    }
                  >
                    ✏ Edit Profile
                  </button>

                ) : (

                  <>

                    <button
                      className="btn btn-success me-2"
                      onClick={handleUpdate}
                    >
                      💾 Save Changes
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsEdit(false);

                        setFormData({
                          name: user.name,
                          email: user.email,
                        });
                      }}
                    >
                      Cancel
                    </button>

                  </>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;