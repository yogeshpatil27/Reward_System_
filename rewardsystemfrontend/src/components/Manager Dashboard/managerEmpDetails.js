import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import AdminHeader from "../Header/AdminHeader";
import { useHistory } from "react-router";
import { getLocalStorage } from "../../localstorage";
import axios from "axios";
import { Link } from "react-router-dom";

const ManagerEmpDetails = () => {
  const history = useHistory();

  const [managerEmp, setManagerEmp] = useState([]);

  useEffect(() => {
    setManagersDetails();
  }, []);

const setManagersDetails =async()=>{
  const loggeduser = getLocalStorage("user");
  const res = await axios.get(
    `http://localhost:9009/employees/mangersDetails/${loggeduser._id}`
  );
  setManagerEmp(res.data);
}

  return (
    <>
      <AdminHeader />
      <div>
        <br />
        <Container>
          <Table className="border shadow p-3 mb-5 bg-white rounded">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Designation</th>
                <th scope="col">Department</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {managerEmp?.map((e, index) => {
                return (
                  <tr key={e._id}>
                    <td scope="row">{index + 1}</td>
                    <td scope="row">{e.name}</td>
                    <td scope="row">{e.email}</td>
                    <td scope="row">{e.designation}</td>
                    <td scope="row">{e.department}</td>
                    <td>
                      <button

 onClick={() => history.push(`/NominateForm/${e._id}`)}
 component={Link}
 to={`/NominateForm/${e._id}`}
                      >
                        Nominate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default ManagerEmpDetails;
