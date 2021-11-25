
import styled from 'styled-components';
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import { isAuthenticated } from '../../Authen';
import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./edituser.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";


const Edituser = (props) => {
  

const FormButtons=styled.div`
display:flex;
justify-content:space-between;
`

const history = useHistory();
  const {id} = useParams();
 
  const [ManagerList, setManagerData] = useState([]);

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
        history.push("/edit/"+id);
      } else{
          history.push('/')
      }
}, [history])

useEffect(() => {
  axios.get("http://localhost:9009/manage").then((res) => {
    setManagerData(res.data);
    console.log(ManagerList);
  });
}, []);

const close=()=>{
    history.push("/EmployeeDetails");
  }

  const [ empDetails, setEmployee ] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    password: "",
  })


  const handleChange = e => {
    const { name, value } = e.target
    setEmployee({
        ...empDetails,
        [name]: value,
    })
} 

  useEffect(() => {
    axios.get("http://localhost:9009/employees/"+id)
        .then( res => {
            console.log("res", res);
            setEmployee(res?.data?.[0])
        })
}, [id])




const update = () => {
    const { name, email, designation, department, password } = empDetails
    if( name && email && password ){
        axios.put("http://localhost:9009/employees", empDetails)
        .then( res => {
           console.log("update res", res);
           if(res?.status == 200) {
            alert('User updated')
            history.push("/EmployeeDetails");
           } else { alert('user not updated')}
        })
    } else {
        alert("invlid input")
    }   
}


    return (
        <>
<Container className="SetupForm">

{/*<div className="card-body">*/}
<Form>
<h2 className="heading-1">Update Details</h2>

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
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4">Designation</Form.Label>
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

          <Form.Group as={Row}  className="mb-2">
            <Form.Label column sm="4">Department</Form.Label>
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
       <div className="d-grid gap-2 mb-2">
            <Button className="mb-1" size="lg" variant="dark" onClick={close}>
             Close
            </Button>
          </div>
          <div className="d-grid gap-2 mb-2">
            <Button className="mb-1" size="lg" variant="secondary" onClick={update}>
             Update
            </Button>
          </div>
    </FormButtons>
     
        </Form>
        </Container>

        
        </>
    )
}

export default Edituser
