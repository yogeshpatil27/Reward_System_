import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Grid, Container } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm} from "./useForm";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import './NominateForm.css';
import axios from "axios";
import { getLocalStorage } from "../../localstorage";
import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
import isEmpty from "validator/es/lib/isEmpty";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from 'moment';
import {Form, Row, Col } from "react-bootstrap";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
import TextField from '@material-ui/core/TextField';
import AdminHeader from '../Header/AdminHeader'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};






const NominateForm = (props) => {
  const [CriteriaSelected, setCriteriaSelected] = useState([]);
  const loggeduser = getLocalStorage("user");
  const [praises, setPraises] = useState("");
  const { id } = useParams();
  const [values, setValues] = useState();
  const [getEmDetails, setEmpDetails] = useState([]);
  const [errors, setErrors] = useState({});

  const criterias = [
    "Client appreciation",
    "Timely leaves",
    "Added work to company",
    "Asset for company",
    "Team Player",
  ];


  const [selectedDate, setSelectedDate] =
    (useState (moment().format("YYYY-MM")));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };


    
 

  useEffect(async () => {
    await axios.get("http://localhost:9009/employees/" + id).then((res) => {
      // console.log("res", res);
      setEmpDetails(res?.data?.[0]);
    });
  }, [id]);

  const handleChange = (event) => {
    setCriteriaSelected(event.target.value);
  };

  const handlePraise = (e) => {
    setPraises(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const history = useHistory();


  const initialFValues = {
   // _id: getEmDetails._id,
    fullName: getEmDetails.name,
    designation: getEmDetails.designation,
    nominatedBy: loggeduser.name,
    criteria: CriteriaSelected,
    department: getEmDetails.department,
    praise: praises,
    Months: selectedDate,
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(initialFValues);

   await axios.post("http://localhost:9009/nominations", initialFValues).then((res) => {
        alert(res.data.message);
        // //            setLoginUser(res.data.user)
      });
      history.push("/ManagersEmpDetails");
    // if (validate()){
    //    alert("Nominatations successful")
    // resetForm()
    //}
  };

  return (
    <>
    <AdminHeader/>
    <Box
    sx={{
      '& .MuiTextField-root': { width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
        <div className="popup">
       
    <div className="nominate"  >
    <Form onSubmit={handleSubmit}>
    <h2 className='NominateHeadingButton'>Nomination Form</h2>
      
       
        <Form.Group as={Row} className="mb-2"  controlId="formPlaintextName">
          <Form.Label column sm="4" className='left'>
            Name
          </Form.Label>
          <Col sm="8" >
           
            <TextField
            name="fullName"
            variant='outlined'
            value={getEmDetails.name}
          onChange={handleInputChange}
          inputProps={
            { readOnly: true, }
          } />
          
          </Col>
        </Form.Group>
        

        <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
          <Form.Label column sm="4" >
            Designation
          </Form.Label>
          <Col sm="8">
          <TextField 
          variant='outlined' 
          name="designation"
          value={getEmDetails.designation}
          onChange={handleInputChange}
          inputProps={
            { readOnly: true, }
          } />
          </Col>
          </Form.Group>
       
       
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="4" className='left'>
            NominatedBy
          </Form.Label>
          <Col sm="8">
          <TextField variant='outlined'
          value={loggeduser.name}
          name="nominatedBy"
          onChange={handleInputChange}
          inputProps={
            { readOnly: true, }
          } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="4" className='left'>
            Criteria Satisfied
          </Form.Label>
          <Col sm="8">
          <FormControl sx={{width: '25ch' }}>
           
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={CriteriaSelected}  
          name="criteria"
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          required
        >
          
          {criterias.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={CriteriaSelected.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Col>
        </Form.Group>

        

        <Form.Group as={Row} className="mb-2">
        <Form.Label column sm="4" className='left'>
          Department
        </Form.Label>
        <Col sm="8">
        <TextField 
        variant='outlined' 
        name="department"
        value={getEmDetails.department}
        onChange={handleInputChange}
        inputProps={
          { readOnly: true, }
        } />
          
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-2">
      <Form.Label column sm="4" className='left'>
        Praising Word
      </Form.Label>
      <Col sm="8">
      <TextField 
      required
      name="praise"
      variant='outlined'
      placeholder="Please write few words for nominee"
      onChange={handlePraise}
      />
        
      </Col>
    </Form.Group>


        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="4" className='left'>
           Month
          </Form.Label>
          <Col sm="8">
    
            <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <DatePicker
              variant="outlined"
              openTo="year"
              inputformat="MM-yyyy"
              views={["year", "month"]}
              
              disableFuture={true}
              helperText="Start from year selection"
              value={selectedDate}
             
              onChange={handleDateChange}
              minDate={moment('2012-09')}
              maxDate={moment()}
            
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      
          </Col>
        </Form.Group>
        
        
      <div className='NominateHeadingButton'>
        <Controls.Button type="submit" text="Submit" />
        <Controls.Button
          type="cancel"
          text="cancel"
          color="secondary"
          variant="outlined"
          onClick={() => {
            history.push("/managersempdetails");
          }}
        />
      </div>
      </Form>
    
    </div>

    
  </div>
  </Box>
  </>
  )
     
};

export default NominateForm;
