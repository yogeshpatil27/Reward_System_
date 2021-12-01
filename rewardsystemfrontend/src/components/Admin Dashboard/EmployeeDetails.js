import React, { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { useHistory } from "react-router";
import { isAuthenticated } from "../../Authen";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import BootstrapTable, { BootstrapButton } from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "./EmployeeDetails.css";
import { Link } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const EmployeeDetails = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
      console.log("I am a Admin");
      history.push("/EmployeeDetails");
    } else {
      history.push("/");
    }
  }, [history]);

  const [empDetails, setEmpDetail] = useState([]);

  //declaired Edit Buttons
  const editButton = (cell, row) => {
    if (row.name) {
      return (
        <div style={{ justifyContent:"space-around",alignItems: "center"}}>
          <button
           style={{ width: "20%", alignItems: "center", outline:"none", border:"none"}}
            className="Edit"
            onClick={() => history.push(`/edit/${row._id}`)}
            component={Link}
            to={`/edit/${row._id}`}
          >
            <ion-icon name="create"></ion-icon>
          </button>
         
          <button  style={{marginLeft:"12px",outline:"none", border:"none"}} className="Delete" onClick={() => DeleteEmployee(row._id)}>
          <ion-icon name="trash"></ion-icon>
          </button>
        


        </div>
      );
    }
  };

 

  //Delete Employee Fuctions
  const DeleteEmployee = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:9009/employees/${id}`);
      console.log(res);
      getEmp();
    } catch (err) {
      console.log("Error while Deleting from Table");
    }
  };




  const id=(cell, row, index)=>{
 index = index+1;
   return (
    <div>
  {index}
    </div>
  );
  }

  const columns = [
    { dataField: "_id", hidden:true},
    { dataField: "id", text: "ID",formatter: id},
    { dataField: "name", text: "Name", sort: true },
    { dataField: "email", text: "Email", sort: true },
    { dataField: "designation", text: "Designation" },
    { dataField: "department", text: "Department" },
    { dataField: "manager.name", text: "Manager" },
    { dataField: "editButton", text: "Actions", formatter: editButton },
    
  ];

  const getEmp = async () => {
    try {
      const res = await axios.get(`http://localhost:9009/employees/details/employe/mangersDetails`);
      //  console.log(res.data);
      setEmpDetail(res.data);
    } catch (err) {
      console.log("Error while loading Table");
    }
  };

  useEffect(() => {
    getEmp();
  }, []);

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
    },
  });

  //Search Functionloity
  const [search, setSearch] = useState("");

  const SearchRows = (rows) => {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(search) > -1 ||
        row.email.toLowerCase().indexOf(search) > -1
    );
  };

  return (
    <>
      <AdminHeader />

      <Container className="p-3 mb-5">
        <div
          style={{
            float: "right",
            width: "30%",
            display: "flex",
            borderRadius: "20px",
            background: "white",
            border: "solid 1px",
            alignItems: "center",
            marginBottom: 20,
            padding: 6,
            borderWidth: "#000",
          }}
        >
          <div style={{ fontSize: "20px" }}>
            <ion-icon name="search"></ion-icon>{" "}
          </div>
          <input
            style={{
              flex: 3,
              height: "40px",
              border: "none",
              outline: "none",
              fontSize: "18px",
            }}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </Container>

      <div>
        <Container className=" shadow p-3 bg-white">
          <BootstrapTable
            pagination={pagination}
           key="_id"
            bootstrap4
            className="border shadow p-3 mb-5 bg-white white rounded"
            keyField="_id"
            columns={columns}
            data={SearchRows(empDetails)}
            striped
            hover
            condensed
          />
        </Container>
      </div>
      <br />
    </>
  );
};

export default EmployeeDetails;
