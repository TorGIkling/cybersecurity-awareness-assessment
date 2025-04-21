
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./homePage/homePage";
import Login from "./login/login";
import AddOrganization from "./addOrganization/addOrganization";
import OrganizationsPage from "./organizationsPage/organizationsPage";
import NewUser from "./newUser/newUser";
import UserOrganizationList from "./userOrganizationList/userOrganizationList";
import Results from "./results/results";
import StartSurvey from "./startSurvey/startSurvey";
import MonitorEvaluation from "./monitorEvaluation/monitorEvaluation";
import DeliverSurvey from "./deliverSurvey/deliverSurvey";
import {JSX} from "react";

function PrivateRoute({children}: {children: JSX.Element}) {
    const isAuthenticated = !!localStorage.getItem('authToken');
    return isAuthenticated ? children : <Navigate to="/Login"/>;
}


function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/addOrganization" element={<AddOrganization/>} />
            <Route path="/organizations" element={<OrganizationsPage/>} />
            <Route path="/addUser" element={<NewUser/>} />
            <Route path="/userList" element={<UserOrganizationList/>} />
            <Route path="/result" element={<PrivateRoute><Results/></PrivateRoute>} />
            <Route path="/startSurvey" element={<PrivateRoute><StartSurvey/></PrivateRoute>} />
            <Route path="/monitorEval" element={<PrivateRoute><MonitorEvaluation/></PrivateRoute>} />
            <Route path="/finishSurvey" element={<PrivateRoute><DeliverSurvey/></PrivateRoute>} />
        </Routes>
      </>
  );
}

export default App;
