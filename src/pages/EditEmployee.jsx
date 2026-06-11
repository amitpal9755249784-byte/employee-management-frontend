import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/employees/${id}`
    );

    setEmployee(response.data);
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://127.0.0.1:8000/api/employees/${id}`,
      employee
    );

 Swal.fire({
  title: "Updated!",
  text: "Employee Updated Successfully",
  icon: "success",
});

    navigate("/");
  };

  return (
    <div>
      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Update Employee
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;