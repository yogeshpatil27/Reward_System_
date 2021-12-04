import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "./login.css";
import { getCookie, setCookies } from "../../cookies";
import { getLocalStorage, setLocalStorage } from "../../localstorage";
import { setAuthentification, isAuthenticated } from "../../Authen";
import Controls from "../Manager Dashboard/controls/Controls";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import Link from "@mui/material/Link";
import isEmpty from "validator/es/lib/isEmpty";

const Login = () => {
  const FormButtons = styled.div`
    display: flex;
  `;

  const [formError, setFormError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const history = useHistory();
  // const context = useContext(contextValue);

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
      //  console.log("I am a Admin");
      history.push("/admin");
    } else if (
      isAuthenticated() &&
      isAuthenticated().designation === "Manager"
    ) {
      //  console.log("I am a Manager");
      history.push("/manager");
    } else if (
      isAuthenticated() &&
      isAuthenticated().designation === "Team Lead"
    ) {
      //  console.log("I am Team Lead");
      history.push("/employee");
    } else if (
      isAuthenticated() &&
      isAuthenticated().designation === "Employee"
    ) {
      // console.log("I am a Employee");
      history.push("/employee");
    }
  }, []);

  const validate = (values, message) => {
    const error = {};

    if (isEmpty(values.email)) {
      error.email = "Please enter Email";
    } else if (message) {
      error.message = `${message}`;
    }
    if (!values.password) {
      error.password = "Please enter Password";
    }

    return error;
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (evt) => {
    evt.preventDefault();

    await axios
      .post("http://localhost:9009/login", user)
      .then((res) => {
        //alert(res.data.message);
        setFormError(validate(user, res.data.message));
        setisSubmit(true);
        setAuthentification(res?.data?.token, res?.data?.user);

        if (isAuthenticated() && isAuthenticated().designation == "Admin") {
          history.push("/admin");
        } else if (
          isAuthenticated() &&
          isAuthenticated().designation === "Manager"
        ) {
          history.push("/manager");
        } else if (
          isAuthenticated() &&
          isAuthenticated().designation === "Team Lead"
        ) {
          console.log("I am Team Lead");
          history.push("/employee");
        } else if (
          isAuthenticated() &&
          isAuthenticated().designation === "Employee"
        ) {
          console.log("I am a Employee");
          history.push("/employee");
        }
      })
      .catch((err) => {
        console.log("Error while signin", err);
      });
    // history.push("/admin")
  };

  return (
    <div className="setupLogin">
      <Container className="SetupFormLogin">
        <h2>Rewards and Recognition System</h2>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="4" className="left">
              Email
            </Form.Label>
            <Col sm="8">
            <Controls.Input
          variant="outlined"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={formError.email}
          />   
            </Col>
            {/*{" "}
  <p style={{ color: "red", marginLeft: "30%" }}>{formError.email}</p>*/}
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
              <Controls.Input
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                error = {formError.password || formError.message}
              />
            </Col>
            {/*<p style={{ color: "red", marginLeft: "30%", marginTop:"5%" }}>
              {formError.password || formError.message}
  </p>*/}
          </Form.Group>

          
            <div className="button">
              <Controls.Button
                type="submit"
                text="Login"
                onClick={login}
                fullWidth
              />
            </div>
         
          <Typography className="link">
            <Link onClick={()=>{ history.push("/forgotpassword")}}>Forget password?</Link>
          </Typography>
        </Form>
{/* 
        <div>{JSON.stringify(user)}</div>   */}
      </Container>
    </div>
  );
};

export default Login;
