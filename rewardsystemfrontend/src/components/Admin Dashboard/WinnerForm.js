import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { alpha } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import Controls from "../Manager Dashboard/controls/Controls";
import { useForm } from "../Manager Dashboard/useForm";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./WinnerForm.css";
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
import moment from "moment";
import { Form, Row, Col } from "react-bootstrap";
import AdminHeader from "../Header/AdminHeader";

const WinnerForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [Month, setAwardMonth] = useState([]);
  const [getNonimations, setNominations] = useState([]);
  const [values, setValues] = useState();
  //const [winnerDetails, setWinnersDetails]=useState([]);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM"));

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

  const [winnerDetails, setWinnersDetails] = useState([]);

  const GetAllwinners = async () => {
    const res = await axios.get(`http://localhost:9009/winners`);
    console.log("This winners data I want to print", res.data);

    let WinnerMonths = res.data.map((a) => a.Months);
    let MonthsasString = WinnerMonths.map((a) => moment(a).format("MMMM"));
    console.log(MonthsasString);

    setWinnersDetails(MonthsasString);
  };

  const initialFValues = {
    //_id: getNonimations._id,
    fullName: getNonimations.fullName,
    designation: getNonimations.designation,
    nominatedBy: getNonimations.nominatedBy,
    department: getNonimations.department,
    Months: selectedDate,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Values are", initialFValues);
    await axios
      .post("http://localhost:9009/winners", initialFValues)
      .then((res) => {
        alert(res.data.message);
        // //            setLoginUser(res.data.user)
      });
    history.push("/admin");
  };
  return (
    <>
      <AdminHeader />
      <div className="setup">
        <div className="winner">
          <h2 className="heading">Winner Declaration From</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-2" controlId="formPlaintextName">
              <Form.Label column sm="4" className="left">
                Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  value={getNonimations.fullName}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="4">
                Department
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  value={getNonimations.department}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="4" className="left">
                Designation
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  value={getNonimations.designation}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="4" className="left">
                NominatedBy
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  value={getNonimations.nominatedBy}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2" controlId="formPlaintextName">
              <Form.Label column sm="4" className="left">
                Nominated Month
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  value={moment(getNonimations.Months).format("MMMM YYYY")}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

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
          </Form>
        </div>

        {/* <div>
      <p>{JSON.stringify(user)}</p>
    </div> */}
      </div>
    </>
  );
};

export default WinnerForm;
