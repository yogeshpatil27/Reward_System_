import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "./login.css";
import { getCookie, setCookies } from "../../cookies";
import { getLocalStorage, setLocalStorage } from "../../localstorage";
import {setAuthentification,isAuthenticated} from "../../Authen"


const Login = () => {
  const history = useHistory();
  // const context = useContext(contextValue);

useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
      //  console.log("I am a Admin");
        history.push('/admin')
      } else if (
        isAuthenticated() &&
        isAuthenticated().designation === "Manager"
      ) {
      //  console.log("I am a Manager");
        history.push('/Manager')
      } else if (
        isAuthenticated() &&
        isAuthenticated().designation === "Team Lead"
      ) {
      //  console.log("I am Team Lead");
        history.push('/Employee')
      } else if (
        isAuthenticated() &&
        isAuthenticated().designation === "Employee"
      ) {
       // console.log("I am a Employee");
        history.push('/Employee')
      }  
}, [])



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

  //  const setAuthentification = (token, user) => {
  //   setCookies("token", token);
  //   setLocalStorage("user", user);
  // };

  // const isAuthenticated = () => {
  //   if (getCookie("token") && getLocalStorage("user")) {
  //     return getLocalStorage("user");
  //   } else {
  //     return false;
  //   }
  // };

  const login = async (evt) => {
    evt.preventDefault();
   
    await axios.post("http://localhost:9009/login", user).then((res) => {
         //alert(res.data.message);
        setAuthentification(res?.data?.token, res?.data?.user);

        if (isAuthenticated() && isAuthenticated().designation == "Admin") {
          history.push('/admin')
        } else if (
          isAuthenticated() &&
          isAuthenticated().designation === "Manager"
        ) {
          history.push('/Manager')
        } else if (
          isAuthenticated() &&
          isAuthenticated().designation === "Team Lead"
        ) {
          console.log("I am Team Lead");
          history.push('/Employee')
        } else if (
          isAuthenticated() &&
          isAuthenticated().designation === "Employee"
        ) {
          console.log("I am a Employee");
          history.push('/Employee')
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
      <h2>
      Rewards and Recognition
      </h2>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="4" variant="secondary">
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

          <Form.Group
            as={Row}
            className="mb-5"
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

          <div>
            <Col sm="16">
              <Button
                className="Managecontainer"
                size="lg"
                
                onClick={login}
                type="submit"
              >
              Login
              </Button>
            </Col>
          </div>
        </Form>

        {/* <div>{JSON.stringify(user)}</div>   */}
      </Container>
    </div>
  );
};

export default Login;
//Github
//project requirement Document
//Complete videos
//use node js mini project 
//design patternes and datastrucrues
//moduler singletone