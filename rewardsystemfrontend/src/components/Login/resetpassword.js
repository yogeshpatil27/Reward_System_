import React, { useState, useEffect } from "react";
import { useHistory,useParams } from "react-router-dom";
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
import equals from "validator"


const ResetPassword = () => {

    const FormButtons = styled.div`
    display: flex;
  `;

  const [formError, setFormError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [emailError, setemailError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [Statureport, setStatuseport]=useState();
  const history = useHistory();
  // const context = useContext(contextValue);

  const { token } = useParams();
  const validate = (values) => {
    const error = {};

    if (isEmpty(values.password)) {
      error.password = "Please enter password";
    }
    if(isEmpty(values.confirmPassword)){
        error.confirmPassword = "Please enter password";
    }
    // if(equals(values.password,values.confirmPassword)){
    //     error.confirmPassword = "Password does not matched";
    // }
    return error;
  };

  const [user, setUser] = useState({
    email: "",
 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const resetPassword = async (evt) => {
    evt.preventDefault();

    await axios
      .put(`http://localhost:9009/employees/password/reset/${token}`, user)
      .then((res) => {
        //alert(res.data.message);
        setFormError(validate(user));

        if(res.data.success===true){
            setSuccessMessage(res.data.message);
        setemailError("")
       
    }
            else if(res.data.success===false){
              setemailError(res.data.message);
            }
       

//       console.log(res.status.message);
        setisSubmit(true);
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
          
          <h3 style={{ color:"Blue", marginBottom: "5%" }}>Change password</h3>
          <Form>
     
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
                placeholder="Enter your password"
                error = {formError.password||emailError}
              />
            </Col>
      
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4" className="left">
              Confirm password
            </Form.Label>
            <Col sm="8">
              <Controls.Input
                name="confirmPassword"
                type="password"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="Enter password again"
                error = {formError.confirmPassword || emailError}
              />
            </Col>
      
          </Form.Group>

              <div className="button">
                <Controls.Button
                  type="submit"
                  text="Change Password"
                  onClick={resetPassword}
                  fullWidth
                />
              </div>
  
              <Typography className="link">
              <Link onClick={()=>{ history.push("/")}}>Sign in</Link>
            </Typography>
  
              <p style={{ color: "black",fontSize:"18px",fontWeight: "bold", marginTop: "5%" }}>
            {successMessage}
          </p>
          </Form>
  
          {/* <div>{JSON.stringify(user)}</div>   */}
        </Container>
      </div>
    )
}

export default ResetPassword
