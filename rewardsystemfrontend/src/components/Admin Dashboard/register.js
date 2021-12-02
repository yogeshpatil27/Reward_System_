import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShowErrorMessage } from "../helper/helper";
import "./register.css";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Validator from "validator";
import isEmail from "validator/es/lib/isEmail";
import isEmpty from "validator/es/lib/isEmpty";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import AdminHeader from "../Header/AdminHeader";
import Admin from "./admin";
import { isAuthenticated } from "../../Authen";
import styled from "styled-components";
import Controls from "../Manager Dashboard/controls/Controls";

const Register = () => {
  const FormButtons = styled.div`
    display: flex;
  `;
  const history = useHistory();
  const [emailError, setemailError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [isSubmit, setisSubmit] = useState(true);
  const [ManagerList, setManagerData] = useState([]);

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
      console.log("I am a Admin");
      history.push("/register");
    } else {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    axios.get("http://localhost:9009/manage").then((res) => {
      setManagerData(res.data);
    });
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    designation: "Manager",
    department: "Development",
    manager: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const close = () => {
    history.push("/admin");
  };
  const [formError, setFormError]= useState({});

useEffect(()=>{
if(Object.keys(formError).length===0&&isSubmit){
  const { name, email, designation, department, manager, password } = user;

  axios.post("http://localhost:9009/employees", user).then((res) => {
    
  if(res.data.success===true){
  setSuccessMessage(res.data.message);
setemailError("")}
  else if(res.data.success===false){
    setemailError(res.data.message);
    setSuccessMessage("")
  }
    //alert(res.data.message)
    //setLoginUser(res.data.user)
  });
 // history.push("/admin");
}

},[formError])


const validate =(values , message)=>{
const error = {};
if(isEmpty(values.name)){
  error.name="Please enter name"
} 
if(isEmpty(values.email)){
  error.email="Please enter email"
} 
else if(!isEmail(values.email)){
error.email="Please enter valid email address"
}
else if(message){
  error.email=`${message}`
  }
if(!values.password){
  error.password="Please enter password";
}
else if(!isStrongPassword(values.password)){
  error.password="Password should atleast have minimum 8, 1 Lowercase, 1 Uppercase, 1 Number, 1 Special characters"
}

// if(isEmpty(values.manager)){
//   error.manager="Please select manager"
// }

 return error;
  }


  const register = (evt) => {
    evt.preventDefault();
    setFormError(validate(user, successMessage));
    setisSubmit(true);

  };

  return (
    <>
      <AdminHeader />
      <div className="setup">
        <Container className="SetupForm">
          <h2 className="heading">Register Employee</h2>
          <Form>
            <Form.Group as={Row} className="mb-2" controlId="formPlaintextName">
              <Form.Label column sm="4" className="left">
                Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="name"
                  type="text"
                  // onkeypress="return /[a-z]/i.test(event.key)"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                />
              </Col>
            </Form.Group>
            <p style={{ color: "red", marginTop: "2%", marginLeft: "30%" }}>
              {formError.name}
            </p>

            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="4" className="left">
                Email
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                />
              </Col>
            </Form.Group>
            <p style={{ color: "red", marginTop: "2%", marginLeft: "30%" }}>
              {formError.email}
            </p>
            <p style={{ color: "red", marginTop: "2%", marginLeft: "30%" }}>
              {emailError}
            </p>

            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="4" className="left">
                Designation
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  name="designation"
                  value={user.designation}
                  onChange={handleChange}
                >
                  {/* <option selected>Select Designation</option> */}
                  <option defaultValue value="Manager">
                    Manager
                  </option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Employee">Employee</option>
                </Form.Control>
              </Col>
            </Form.Group>

            {(user.designation === "Employee" ||
              user.designation === "Team Lead") && (
              <>
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column sm="4" className="left">
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
                    {/* <p style={{ color: "red", marginTop: "2%", marginLeft: "30%" }}>
              {formError.manager}
            </p> */}
                  </Col>
                </Form.Group>
              </>
            )}

            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="4" className="left">
                Department
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  name="department"
                  value={user.department}
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

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="4" className="left">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                />
              </Col>
            </Form.Group>
            <p style={{ color: "red", marginTop: "2%", marginLeft: "30%" }}>
              {formError.password}
            </p>
            <FormButtons>
              <div className="button">
                <Controls.Button
                  type="submit"
                  text="Register"
                  onClick={register}
                />
                <Controls.Button
                  text="Close"
                  color="secondary"
                  variant="outlined"
                  onClick={close}
                />
              </div>
            </FormButtons>
            <p style={{ color: "black",fontSize:"18px",fontWeight: "bold", marginTop: "5%" }}>
              {successMessage}
            </p>
          </Form>
        </Container>

        {/* <div>
        <p>{JSON.stringify(user)}</p>
      </div> */}
      </div>
    </>
  );
};

export default Register;
