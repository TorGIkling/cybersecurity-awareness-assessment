
import './App.css';
import {Routes, Route} from "react-router-dom";
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


function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/addOrganization" element={<AddOrganization/>} />
            <Route path="/organizations" element={<OrganizationsPage/>} />
            <Route path="/addUser" element={<NewUser/>} />
            <Route path="/userList" element={<UserOrganizationList/>} />
            <Route path="/result" element={<Results/>} />
            <Route path="/startSurvey" element={<StartSurvey/>} />
            <Route path="/monitorEval" element={<MonitorEvaluation/>} />
            <Route path="/finishSurvey" element={<DeliverSurvey/>} />
        </Routes>
      </>
  );
}

export default App;
