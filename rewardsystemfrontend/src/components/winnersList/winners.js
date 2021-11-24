import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminHeader from '../Header/AdminHeader'

import { Table, Container, Button } from "react-bootstrap";
import moment from 'moment';
const Winners = () => {

    const [winnerDetails, setWinnersDetails]=useState([]);



    useEffect(() => {
        GetAllwinners();
    }, [])


    const GetAllwinners=async()=>{
 const res = await axios.get(`http://localhost:9009/winners`);
setWinnersDetails(res.data);
    }


    return (
        <div>
             <AdminHeader/>
             <div>
        <br />
        <Container>
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
                    <td scope="row">{moment(e.Months).format("MMMM YYYY")}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    
        </div>
    )
}

export default Winners 

