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
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';


const Edituser = (props) => {
  const FormButtons = styled.div`
    display: flex;
  `;


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


  const [successMessage, setsuccessMessage] = useState();
  const [ErrorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const { id } = useParams();

  const [ManagerList, setManagerData] = useState([]);


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
      //console.log(ManagerList);
    });
  }, []);


 

  const close = () => {
    history.push("/EmployeeDetails");
  };
  const [isSubmit, setisSubmit] = useState(false);
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



  useEffect(()=>{

    if(Object.keys(formError).length===0&&isSubmit){
   
      const { name, email, designation, department, manager } = empDetails;
      if (name && email) {
        axios.put("http://localhost:9009/employees", empDetails).then((res) => {
          // alert(res.data.message)
          //console.log("update res", res);
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
  },[formError])



  const update = () => {
setFormError(validate(empDetails));
setisSubmit(true);

  };

  return (
    <>
    <AdminHeader />
    <Container className="SetupForm">
      <Box
    sx={{
      '& .MuiTextField-root': { width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
        <div className="SetupForm">
        <div className="SetupForm">
        {/*<div className="card-body">*/}
        <Form>
        <h2 className="heading-1">Update Employee Details</h2>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4" className='left'>
              Name
            </Form.Label>
            <Col sm="8">
              <Controls.Input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={empDetails.name}
                onChange={handleChange}
                error={formError.name}
              />
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4" className='left'>
              Email
            </Form.Label>
            <Col sm="8">
              <Controls.Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={empDetails.email}
                onChange={handleChange}
                error={formError.email}
              />
            </Col>
          </Form.Group>


        
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
          value={empDetails.designation}
          onChange={handleChange}
          options={getDesignation()}
          error={formError.designation}
          >
        </Controls.Select>
      </FormControl>
            </Col>
          </Form.Group>

          {(empDetails.designation === "Employee" ||
            empDetails.designation === "Team Lead") && (
<Form.Group as={Row} className="mb-2" >
              <Form.Label column sm="4" className="left">
                Manager
              </Form.Label>
              <Col sm="8">
        <FormControl sx={{ width: '25ch' }}>
        <Controls.ManagerSelect
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          name="manager"
          value={empDetails.manager}
          onChange={handleChange}
          options={ManagerList}
          error={formError.manager}
          >
        </Controls.ManagerSelect>
      </FormControl>
            </Col>
          </Form.Group>
)}


{/* Working but not good
          {(empDetails.designation === "Employee" ||
            empDetails.designation === "Team Lead") && (
            <>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="4" className='left'>
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
          )} */}

<Form.Group as={Row} className="mb-2">
              <Form.Label column sm="4" className="left">
                Department
              </Form.Label>
              <Col sm="8">
              
                <FormControl sx={{ m: 1, width: '25ch' }}>
                <Controls.Select 
                 MenuProps={MenuProps}
                  name="department"
                  value={empDetails.department}
                  onChange={handleChange}
                  options={getDepartment()}
                  error={formError.department}
                  placeholder="Select department"
                >
      
                  </Controls.Select>
                </FormControl>
              </Col>
            </Form.Group>


          {/* <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4" className='left'>
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
          </Form.Group> */}

       
            <div className="button"className="NominateHeadingButton">
              <Controls.Button text="Update" onClick={update} />
              <Controls.Button
                text="Close"
                color="secondary"
                variant="outlined"
                onClick={close}
              />
            </div>
            
        </Form>
    </div></div>
        </Box>
        </Container>
      
      <p style={{ color: "black",fontSize:"18px",fontWeight: "bold", marginTop: "5%" }}>{successMessage}</p>
    </>
  );
};

export default Edituser;
