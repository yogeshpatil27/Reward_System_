import "./App.css";
import "react-bootstrap";
import Login from "./components/Login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Admin Dashboard/register";
import Manager from "./components/Manager Dashboard/manager";
import Admin from "./components/Admin Dashboard/admin";
import { isAuthenticated } from "./Authen";
import Employee from "./components/All Employee Dashboard/Employee";
import PageNotFound from "./components/PageNotFount/PageNotFound";
import EmployeeDetails from "./components/Admin Dashboard/EmployeeDetails";
import Edituser from "./components/Admin Dashboard/edituser";
import Winners from "./components/winnersList/winners";
import ManagerEmpDetails from "./components/Manager Dashboard/managerEmpDetails";
import NominateForm from "./components/Manager Dashboard/NominateForm";
import WinnerForm from "./components/Admin Dashboard/WinnerForm";
import ForgotPassword from "./components/Login/forgotpassword";
import ResetPassword from "./components/Login/resetpassword";

function App() {
  return (
    <div>
      <header>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/admin" component={Admin} />
            <Route path="/register" component={Register} />
            <Route path="/manager" component={Manager} />
            <Route path="/employee" component={Employee} />
            <Route path="/employeedetails" component={EmployeeDetails} />  
            <Route path="/edit/:id" component={Edituser} />
            <Route path="/winners" component={Winners} />      
            <Route path="/managersempdetails" component={ManagerEmpDetails} /> 
            <Route path="/winnerform/:id" component={WinnerForm} />
            <Route path="/nominateform/:id" component={NominateForm} />
              <Route path="/forgotpassword" component={ForgotPassword}></Route> 
            <Route path="/password/reset/:token" component={ResetPassword}></Route>
            
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
