import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminHeader from '../Header/AdminHeader'
import { Link } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";

import BootstrapTable, { BootstrapButton } from "react-bootstrap-table-next";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import { Table, Container, Button } from "react-bootstrap";
import moment from 'moment';
const Winners = () => {

    const [winnerDetails, setWinnersDetails]=useState([]);

    const GetAllwinners=async()=>{
      const res = await axios.get(`http://localhost:9009/winners`);
     setWinnersDetails(res.data);
         }

    useEffect(() => {
        GetAllwinners();
    }, [])



    
  const id=(cell, row, index)=>{
    index = index+1;
      return (
       <div>
     {index}
       </div>
     );
     }


     const Months=(cell, row, index)=>{
    let Months=moment(row.Months).format("YYYY-MMMM")
        return (
         <div>
      {Months}
         </div>
       );
       }

    const columns = [
      { dataField: "id", text: "ID",formatter: id},
      { dataField: "fullName", text: "Name", sort: true },
      { dataField: "designation", text: "Designation" },
      { dataField: "nominatedBy", text: "Nominated by"},
      { dataField: "department", text: "Department" },
      { dataField: 'Months', text: "Winner of month",sort: true,formatter: Months},
      
    ];


 

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




    return (
        <div>
             <AdminHeader/>
             <div>
        <br />
        {/* <Container>
          <Table className="border shadow p-3 mb-5 bg-white rounded">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Nominated by</th>
                <th scope="col">Department</th>
                <th scope="col">Winner of the Month</th>
              </tr>
            </thead>
            <tbody>
              {winnerDetails?.map((e, index) => {
                return (
                  <tr key={e._id}>
                    <td scope="row">{index + 1}</td>
                    <td scope="row">{e.fullName}</td>
                    <td scope="row">{e.designation}</td>
                    <td scope="row">{e.nominatedBy}</td>
                    <td scope="row">{e.department}</td>
                    <td scope="row">{moment(e.Months).format("YYYY-MMMM")}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container> */}

        <div>
        <Container className=" shadow p-3 bg-white">
          <BootstrapTable
            pagination={pagination}
           key="_id"
            bootstrap4
            className="border shadow p-3 mb-5 bg-white white rounded"
            keyField="_id"
            columns={columns}
            data={winnerDetails}
            striped
            hover
            condensed
          />
        </Container>
      </div>






      </div>
    
        </div>
    )
}

export default Winners 

