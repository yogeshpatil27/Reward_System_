import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Grid, Container } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "../Admin Dashboard/register.css";
import axios from "axios";
import { getLocalStorage } from "../../localstorage";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import isEmpty from "validator/es/lib/isEmpty";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from 'moment';


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
    "Team Player",
    "Timely leaves",
    "Added work to company",
    "Asset for company",
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
      {/*<Container className="SetupForm">*/}
        <Form onSubmit={handleSubmit}>
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius:"10px",
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          width: '50%', 
          margin:'40px auto',
        }}
      >
      <h1>Nomination Form</h1>
              <Controls.Input
                name="fullName"
                label="Full Name"
                value={getEmDetails.name}
                onChange={handleInputChange}
                // error={errors.fullName}
              />
              <Controls.Input
                label="Designation"
                name="designation"
                value={getEmDetails.designation}
                onChange={handleInputChange}
                // error={errors.designation}
              />
              <Controls.Input
                label="NominatedBy"
                name="nominatedBy"
                value={loggeduser.name}
                onChange={handleInputChange}
                // error={errors.nominatedBy}
              />
          

              <FormControl>
                <InputLabel id="demo-mutiple-name-label">
                  Criteria Satisfied
                </InputLabel>
                <Select
                  name="criteria"
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={CriteriaSelected}
                  onChange={handleChange}
                  input={<Input />}
                >
                  {criterias.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Working */}
              {/* 
  <Controls.Select
  name="criteria" 
  onChange={SelectHandle}
  label ="criteria" 
  isMulti
  options={[
    { value:'Client appreciation', label: 'Client appreciation' },
    { value:'Team Player', label: 'Team Player' },
    { value:'Timely leaves', label: 'Timely leaves' },
    { value:'Added work to company', label: 'Added work to company' },
    { value:'Asset for company', label: 'Asset for company' }
]}/> */}

              <Controls.Input
                name="department"
                label="Department"
                value={getEmDetails.department}
                onChange={handleInputChange}
                error={errors.department}
              />

              <Controls.Input
                name="praise"
                label="Praising Words"
                placeholder="Please write few words for Nominee"
                onChange={handlePraise}
              />


<div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                      <DatePicker
                        variant="inline"
                        openTo="year"
                        inputformat="MM-yyyy"
                        views={["year", "month"]}
                        label="Year and Month"
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

              <div>
                <Controls.Button type="submit" text="Submit" />
                <Controls.Button text="Draft" color="default" />
                <Controls.Button
                  type="cancel"
                  text="cancel"
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    history.push("/ManagersEmpDetails");
                  }}
                />
              </div>
            </Box>
        </Form>
      {/*</Container>*/}
     
    </>
  );
};

export default NominateForm;
