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

import InputLabel from '@mui/material/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


const getDesignation = ()=>([
  { id: '1', name: 'Manager' },
  { id: '2', name: 'Team Lead' },
  { id: '3', name: 'Employee' },
  
])


const getDepartment = ()=>([
  { id: '1', name: 'Development' },
  { id: '2', name: 'Quality Assurance' },
  { id: '3', name: 'Digital Assurance' },
  
])


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

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
    designation: "",
    department: "",
    manager: "",
    password: "",
    showPassword: false,
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
  setSuccessMessage(res.data.message);}
  else if(res.data.success===false){
    setemailError(res.data.message);
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

      <Box
    sx={{
      '& .MuiTextField-root': { width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
        <div className="popup">
       
    <div className="nominate"  >
    <Form>
    <h2 className='NominateHeadingButton'>Register Employee</h2>
      
       
        <Form.Group as={Row} className="mb-2"  controlId="formPlaintextName">
          <Form.Label column sm="4" className='left'>
            Name
          </Form.Label>
          <Col sm="8" >
           
            <Controls.Input
            name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              variant='outlined'
              error = {formError.name} />
          
          </Col>
        </Form.Group>
        

        <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
          <Form.Label column sm="4" >
            Email
          </Form.Label>
          <Col sm="8">
          <Controls.Input
          variant="outlined"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your Email"
          error={formError.email}
          />   
          </Col>
          </Form.Group>
        <p style={{ color: "red", marginTop: "2%", marginLeft: "30%" }}>
          {emailError}
        </p>
        <Form.Group as={Row} className="mb-2" >
              <Form.Label column sm="4" className="left">
                Designation
              </Form.Label>
              <Col sm="8">
        <FormControl sx={{ width: '25ch' }}>
        <Controls.Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          name="designation"
          value={user.designation}
          onChange={handleChange}
          options={getDesignation()}>
        </Controls.Select>
      </FormControl>
            </Col>
          </Form.Group>

          {(user.designation === "Employee" ||
            user.designation === "Team Lead") && (
            <>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="4" className='left'>
                  Manager
                </Form.Label>
                <Col sm="8">
                  <FormControl sx={{ m: 1, width: '25ch' }}>
                  <Controls.Select 
                  
                  onChange={handleChange}
                  name="manager"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper">
                  <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                    {ManagerList?.map((ef) => {
                      return (
                        
                          <MenuItem value={ef._id} key={ef._id}>
                            {ef.name}
                          </MenuItem>
                         
                        
                      );
                    })}
                    </Controls.Select>
                  </FormControl>
                  </Col>
                </Form.Group>
              </>
            )}
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="4" className="left">
                Department
              </Form.Label>
              <Col sm="8">
              
                <FormControl sx={{ m: 1, width: '25ch' }}>
                <Controls.Select 
                 MenuProps={MenuProps}
                  name="department"
                  value={user.department}
                  onChange={handleChange}
                  options={getDepartment()}
                  error={formError.email}
                >
      
                  </Controls.Select>
                </FormControl>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2"  controlId="formPlaintextName">
            <Form.Label column sm="4" className='left'>
              Password
            </Form.Label>
            <Col sm="8" >
             
              <Controls.Input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              error = {formError.password}
              />
            
            </Col>
          </Form.Group>
          
        <FormButtons>
          <div className="NominateHeadingButton">
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
       </div>
       </div>
       </Box>
      
      
      </>
   
  );
};

export default Register;
