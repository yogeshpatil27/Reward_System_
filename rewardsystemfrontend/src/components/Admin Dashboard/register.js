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

import Admin from "./admin";
import { isAuthenticated } from "../../Authen";
import styled from "styled-components";

const Register = () => {
  const FormButtons = styled.div`
    display: flex;
    justify-content: space-between;
  `;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
      console.log("I am a Admin");
      history.push("/Register");
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

  const [user, setUser] = useState({
    name: "",
    email: "",
    designation: "Manager",
    department: "Development",
    manager: "",
    password: "",
    errormsg: false,
  });


  

  const [ManagerList, setManagerData] = useState([]);

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
const [isSubmit, setisSubmit]=useState(false);

useEffect(()=>{
if(Object.keys(formError).length===0&&isSubmit){
  const { name, email, designation, department, manager, password } = user;

  axios.post("http://localhost:9009/employees", user).then((res) => {
    alert(res.data.message);
    // //            setLoginUser(res.data.user)
  });
  history.push("/admin");
}

},[formError])


  const validate =(values)=>{
const error = {};

if(isEmpty(values.name)){
  error.name="Please Enter Name"
} 
if(!isEmail(values.email)){
error.email="Please enter valid Email address"
}
if(!values.password){
  error.password="Please enter password";
}
else if(!isStrongPassword(values.password)){
  error.password="Password should atleast have minimum 8, 1 Lowercase, 1 Uppercase, 1 Number, 1 Special characters"
}

 return error;
  }


  const register = (evt) => {
    evt.preventDefault();
    //const { name, email, designation, department, manager, password } = user;


    // if (
    //   isEmpty(name) ||
    //   isEmpty(email) ||
    //   isEmpty(designation) ||
    //   isEmpty(department) ||
    //   isEmpty(password)
    // ) {
    //   setUser({
    //     ...user,
    //     errormsg: "All fields are required",
    //   });
    //   alert("All fields are required");
    // } else if (!isEmail(email)) {
    //   setUser({
    //     ...user,
    //     errormsg: "Invalid Email",
    //   });
    //   alert("Invalid Email");
    // }

    setFormError(validate(user));

    setisSubmit(true);
    // if(user){
    
    // }
    // else {
    //   const { name, email, designation, department, manager, password } = user;

    //   axios.post("http://localhost:9009/employees", user).then((res) => {
    //     alert(res.data.message);
    //     // //            setLoginUser(res.data.user)
    //   });
    //   history.push("/admin");
    // }
  };

  return (
    <div className="setup">

      <Container className="SetupForm">
        <Form>
        <h2 className='heading'>Register Employee</h2>
          <Form.Group as={Row} className="mb-2" controlId="formPlaintextName">
            <Form.Label column sm="4">
              Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your Name"
              />
            </Col>
          </Form.Group>
          <p style={{color:"red", marginTop:"2%",marginLeft:"30%"}}>{formError.name}</p>

          <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
            <Form.Label column sm="4">
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
          <p style={{color:"red", marginTop:"2%",marginLeft:"30%"}}>{formError.email}</p>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4">
              Designation
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                name="designation"
                value={user.designation}
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

          {(user.designation === "Employee" ||
            user.designation === "Team Lead") && (
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
            <Form.Label column sm="4">
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
          <p style={{color:"red", marginTop:"2%",marginLeft:"30%"}}>{formError.password}</p>
          <FormButtons>
            <div className="d-grid gap-2 mb-2">
              <Button className="mb-1" size="lg" variant="dark" onClick={close}>
                Close
              </Button>
            </div>
            <div className="d-grid gap-2 mb-2">
              <Button
                className="mb-1"
                size="lg"
                variant="success"
                onClick={register}
              >
                Register
              </Button>
            </div>
          </FormButtons>
        </Form>
      </Container>

      {/* <div>
        <p>{JSON.stringify(user)}</p>
      </div> */}
    </div>
  );
};

export default Register;
