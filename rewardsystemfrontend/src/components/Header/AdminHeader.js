import React from "react";
import "./AdminHeader.css";
import { Logout } from "../../Authen";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Nav, Navbar, Container } from "react-bootstrap";
//import Button from "@restart/ui/esm/Button";
import { isAuthenticated } from "../../Authen";
import styled from 'styled-components';
import Register from "../Admin Dashboard/register";
import Winners from "../winnersList/winners";
import { getLocalStorage } from "../../localstorage";


const AdminHeader = () => {

  const loggeduser = getLocalStorage("user");

  const Container = styled.div`
  height: 70px,auto;
  border: none;
  align-items:center;
  background:white;
  color:black;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  `
  
  const Wrapper=styled.div`
  padding: 20px 20px;
  display:flex;
  align-items:center;
  ;
  `
  
  const Left=styled.div`
  flex:1;
  
  display:flex;
  justify-content:flex-start;
  `
  const Feed=styled.button`
  font-size:18px;
  margin-left:30px;
  cursor: pointer;
  border:none;
  background-color:white;
  color:black;
  font-weight: bold;
  `
  
  const RegisterempLink=styled.button`
  
  font-size:18px;
  margin-left:15px;
  cursor: pointer;
  border:none;
  background-color:white;
  color:black;
  font-weight: bold;
  `
  
  const EmployeeDetails=styled.button`
  font-size:18px;
  margin-left:15px;
  border:none;
  cursor: pointer;
  background-color:white;
  color:black;
  font-weight: bold;`
  
  
  const WinnersList=styled.button`
  font-size:18px;
  margin-left:15px;
  border:none;
  cursor: pointer;
  background-color:white;
  color:black;
  font-weight: bold;
  `
  
  const Right=styled.div`
  font-size:18px;
  flex:1;
  justify-content:end;
  display:flex;
  
  `
  const UserName=styled.div`
  font-size:18px;
  margin-right:70px;
  font-weight: bold;
  border:none;
  background-color:white;
  color:black
  `
  
  const LogoutButton=styled.button`
  font-size:18px;
  font-weight:bold;
  border:none;
  margin-right:50px;
  width:20px;
  justify-content:end;
  cursor: pointer;
  background-color:white;
  color:black;
  `




  const history = useHistory();
  const HandleLogout = () => {
    Logout(() => {
      history.push("/");
    });
  };



  return (

    <>
      {isAuthenticated() && isAuthenticated().designation === "Admin" && (
<Container>
            <Wrapper>
              <Left>
                <img src='/assets/logo.jpg' alt ="Rewards" className='image' />
                <Feed onClick={()=>{ history.push("/admin")}}>Feeds</Feed>
                <RegisterempLink onClick={()=>{  history.push("/register")}}>Register Employee</RegisterempLink>
                <EmployeeDetails onClick={()=>{  history.push("/employeedetails")}}>Employee Details</EmployeeDetails>
                <WinnersList onClick={()=>{  history.push("/winners")}}>Winners List</WinnersList>
              </Left>
              <Right>
              <UserName>Welcome: {loggeduser.name} ({loggeduser.designation})</UserName>
              <LogoutButton onClick={HandleLogout}>Logout</LogoutButton>
          </Right>
            </Wrapper>
        </Container>
)}

{isAuthenticated() && isAuthenticated().designation === "Manager" && (
<Container>
            <Wrapper>
              <Left>
              <img src='/assets/logo.jpg' alt ="Rewards" className='image' />
            
                <Feed onClick={()=>{ history.push("/manager")}}>Feeds</Feed>
                <EmployeeDetails onClick={()=>{  history.push("/managersempdetails")}}>Employee Details</EmployeeDetails>
                <WinnersList onClick={()=>{  history.push("/winners")}}>Winners List</WinnersList>
              </Left>
              <Right>
              <UserName>Welcome: {loggeduser.name} ({loggeduser.designation})</UserName>
              <LogoutButton onClick={HandleLogout}>Logout</LogoutButton>
          </Right>
            </Wrapper>
        </Container>
)}




{
isAuthenticated() && (isAuthenticated().designation === "Employee"||isAuthenticated().designation ==="Team Lead") && (
<Container>
            <Wrapper>
              <Left>
              <img src='/assets/logo.jpg' alt ="Rewards" className='image' />
                <Feed onClick={()=>{history.push("/employee")}}>Feeds</Feed>
                <WinnersList onClick={()=>{history.push("/winners")}}>Winners List</WinnersList>
              </Left>
              <Right>
              <UserName>Welcome: {loggeduser.name} ({loggeduser.designation})</UserName>
              <LogoutButton onClick={HandleLogout}>Logout</LogoutButton>
          </Right>
            </Wrapper>
        </Container>

)}



    </>
  );
};

export default AdminHeader;
