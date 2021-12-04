import styled from "styled-components";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { isAuthenticated } from "../../Authen";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./edituser.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import isEmail from "validator/es/lib/isEmail";
import isEmpty from "validator/es/lib/isEmpty";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import Controls from "../Manager Dashboard/controls/Controls";
import AdminHeader from '../Header/AdminHeader'

const Edituser = (props) => {
  const FormButtons = styled.div`
    display: flex;
  `;

  const [successMessage, setsuccessMessage] = useState();
  const [ErrorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const { id } = useParams();

  const [ManagerList, setManagerData] = useState([]);

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
      history.push("/edit/" + id);
    } else {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    axios.get("http://localhost:9009/manage").then((res) => {
      setManagerData(res.data);
      console.log(ManagerList);
    });
  }, []);

  const close = () => {
    history.push("/EmployeeDetails");
  };
  const [isSubmit, setisSubmit] = useState(true);
  const [formError, setFormError] = useState({});
  const [empDetails, setEmployee] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...empDetails,
      [name]: value,
    });
  };

  const validate = (values) => {
    const error = {};

    if (isEmpty(values.name)) {
      error.name = "Please enter name";
    }
    if (isEmpty(values.email)) {
      error.email = "Please enter email";
    } else if (!isEmail(values.email)) {
      error.email = "Please enter valid email address";
    }
    return error;
  };

  useEffect(() => {
    axios.get("http://localhost:9009/employees/" + id).then((res) => {
      console.log("res", res);
      setEmployee(res?.data?.[0]);
    });
  }, [id]);

  const update = () => {
    if (isSubmit === true) {
      setFormError(validate(empDetails));
      setisSubmit(false);
    }
    if (isSubmit === false) {
      const { name, email, designation, department, manager } = empDetails;
      if (name && email) {
        axios.put("http://localhost:9009/employees", empDetails).then((res) => {
          // alert(res.data.message)
          console.log("update res", res);
          if (res?.data?.success === true) {
            setsuccessMessage(res?.data?.message);
            setErrorMessage("");
            setFormError("");
          } else if (res?.data?.success === false) {
            setErrorMessage(res?.data?.message);
          }
        });
      }
    }
  };

  return (
    <>
    <AdminHeader />
      <Container className="SetupForm">
        <h2 className="heading-1">Update Employee Details</h2>
        {/*<div className="card-body">*/}
        <Form>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4">
              Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="name"
                type="text"
                value={empDetails.name}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <p style={{ color: "red", marginLeft: "30%" }}>{formError.name}</p>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4">
              Email
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="email"
                type="email"
                value={empDetails.email}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <p style={{ color: "red", marginLeft: "30%" }}>
            {formError.email || ErrorMessage}
          </p>
          {/* <p style={{ color: "red", marginLeft: "30%" }}>
              {formError.email}
            </p> */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4">
              Designation
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                name="designation"
                value={empDetails.designation}
                onChange={handleChange}
              >
                <option defaultValue value="Manager">
                  Manager
                </option>
                <option value="Team Lead">Team Lead</option>
                <option value="Employee">Employee</option>
              </Form.Control>
            </Col>
          </Form.Group>

          {(empDetails.designation === "Employee" ||
            empDetails.designation === "Team Lead") && (
            <>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="4">
                  Manager
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    onChange={handleChange}
                    name="manager"
                  >
                    <option>Please Select Manager</option>
                    {ManagerList?.map((ef) => {
                      return (
                        <>
                          <option value={ef._id} key={ef._id}>
                            {ef.name}
                          </option>
                        </>
                      );
                    })}
                  </Form.Control>
                </Col>
              </Form.Group>
            </>
          )}

          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4">
              Department
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                name="department"
                value={empDetails.department}
                onChange={handleChange}
              >
                <option defaultValue value="Development">
                  Development
                </option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Digital Assurance">Digital Assurance</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <FormButtons>
            <div className="button">
              <Controls.Button text="Update" onClick={update} />
              <Controls.Button
                text="Close"
                color="secondary"
                variant="outlined"
                onClick={close}
              />
            </div>
          </FormButtons>
        </Form>
        <p style={{ color: "black",fontSize:"18px",fontWeight: "bold", marginTop: "5%" }}>{successMessage}</p>
      </Container>
    </>
  );
};

export default Edituser;
