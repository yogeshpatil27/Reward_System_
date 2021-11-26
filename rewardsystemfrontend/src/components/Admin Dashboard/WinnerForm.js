import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { alpha } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import Controls from "../Manager Dashboard/controls/Controls";
import { useForm, Form } from "../Manager Dashboard/useForm";
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
import "date-fns";
import moment from 'moment';


const WinnerForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [Month, setAwardMonth] = useState([]);
  const [getNonimations, setNominations] = useState([]);
  const [values, setValues] = useState();
  //const [winnerDetails, setWinnersDetails]=useState([]);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] =
    (useState (moment().format("YYYY-MM")));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    getNominationsbyID();
    GetAllwinners();
  }, []);

  const getNominationsbyID = async () => {
    await axios.get("http://localhost:9009/nominations/" + id).then((res) => {
      setNominations(res?.data?.[0]);
    });
  };

  const [winnerDetails, setWinnersDetails]=useState([]);

  const GetAllwinners=async()=>{
    const res = await axios.get(`http://localhost:9009/winners`); 
    console.log("This winners data I want to print",res.data); 

    let WinnerMonths=res.data.map(a=>a.Months)
   let MonthsasString = WinnerMonths.map(a=>moment(a).format("MMMM"))
   console.log(MonthsasString);

   setWinnersDetails(MonthsasString);
   //console.log("This winners data I want to print",winnerDetails);

  //  const changedFormat= moment(winnerDetails.Months).month()

  //  console.log("List of winner months", changedFormat);
  //  console.log("This is array of winners: ", moment(winnerDetails.Months).format("MMMM").includes("November")?"Yes":"No");
       }

  const initialFValues = {
    //_id: getNonimations._id,
    fullName: getNonimations.fullName,
    designation: getNonimations.designation,
    nominatedBy: getNonimations.nominatedBy,
    department: getNonimations.department,
    Months: selectedDate,
  };

//   const Months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

const monthSelector=(date)=>{
 return date.getMonth()===4;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Values are", initialFValues);
      await axios.post("http://localhost:9009/winners", initialFValues).then((res) => {
        alert(res.data.message);
    // //            setLoginUser(res.data.user)
      });
     history.push("/admin");
    // if (validate()){
    //    alert("Nominatations successful")
    // resetForm()
    //}
  };
  return (
    <div>
      <>
        {/*<Container className="SetupForm">/*/}
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
        <h1>Declaration Form</h1>
                <Controls.Input
                  name="fullName"
                  label="Full Name"
                  value={getNonimations.fullName}
                  onChange={handleInputChange}
                />
                <Controls.Input
                  name="department"
                  label="Department"
                  value={getNonimations.department}
                  onChange={handleInputChange}
                />
                <Controls.Input
                  label="Designation"
                  name="designation"
                  value={getNonimations.designation}
                  onChange={handleInputChange}
                />
                <Controls.Input
                  label="NominatedBy"
                  name="nominatedBy"
                  value={getNonimations.nominatedBy}
                  onChange={handleInputChange}
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
                  <Controls.Button
                    type="cancel"
                    text="cancel"
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      history.push("/admin");
                    }}
                  />
                </div>
              </Box>
          </Form>
        {/*</Container>*/}
      </>
    </div>
  );
};

export default WinnerForm;
