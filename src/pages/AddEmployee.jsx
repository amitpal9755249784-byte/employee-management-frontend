import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
  !employee.name ||
  !employee.email ||
  !employee.phone ||
  !employee.department
) 
 Swal.fire({
  title: "Error!",
  text: "All fields are required",
  icon: "error",
});


    try {
      await axios.post(
        "https://employee-management-backend-production-dc04.up.railway.app/api/employees",
        employee
      );


      Swal.fire({
  title: "Success!",
  text: "Employee Added Successfully",
  icon: "success",
  confirmButtonText: "OK",
});

      setEmployee({
        name: "",
        email: "",
        phone: "",
        department: "",
      });
    
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card">
        <div className="card-header">
          <h3>Add Employee</h3>
        </div>

        <div className="card-body">
           <form onSubmit={handleSubmit}>
       <div className="mb-3">
  <label className="form-label">Name</label>

  <input
    type="text"
    name="name"
    className="form-control"
    placeholder="Enter Name"
    value={employee.name}
    onChange={handleChange}
  />
</div>
        <br /><br />

    <div className="mb-3">
  <label className="form-label">Email</label>

  <input
    type="email"
    name="email"
    className="form-control"
    placeholder="Enter Email"
    value={employee.email}
    onChange={handleChange}
  />
</div>
        <br /><br />

      <div className="mb-3">
  <label className="form-label">Phone</label>

  <input
    type="text"
    name="phone"
    className="form-control"
    placeholder="Enter Phone"
    value={employee.phone}
    onChange={handleChange}
  />
</div>
        <br /><br />

      <div className="mb-3">
  <label className="form-label">Department</label>

  <input
    type="text"
    name="department"
    className="form-control"
    placeholder="Enter Department"
    value={employee.department}
    onChange={handleChange}
  />
</div>
        <br /><br />

      <button type="submit">
  Save Employee
</button>
      </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default AddEmployee;