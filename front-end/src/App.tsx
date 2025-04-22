
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
import AdminRoute from "./routes/adminRoute";
import EmployeeRoute from "./routes/employeeRoute";
import EvaluatorRoute from "./routes/evaluatorRoute";
import ManagerRoute from "./routes/managerRoute";
import AddSurvey from "./addSurvey/addSurvey";
import Surveys from "./surveys/surveys";


function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<EmployeeRoute><HomePage/></EmployeeRoute>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/addOrganization" element={<AdminRoute><AddOrganization/></AdminRoute>} />
            <Route path="/addSurvey" element={<AdminRoute><AddSurvey/></AdminRoute>} />
            <Route path="/surveys" element={<AdminRoute><Surveys/></AdminRoute>} />
            <Route path="/organizations" element={<AdminRoute><OrganizationsPage/></AdminRoute>} />
            <Route path="/addUser" element={<AdminRoute><NewUser/></AdminRoute>} />
            <Route path="/userList" element={<AdminRoute><UserOrganizationList/></AdminRoute>} />
            <Route path="/result" element={<ManagerRoute><Results/></ManagerRoute>} />
            <Route path="/startSurvey" element={<EmployeeRoute><StartSurvey/></EmployeeRoute>} />
            <Route path="/monitorEval" element={<EvaluatorRoute><MonitorEvaluation/></EvaluatorRoute>} />
            <Route path="/finishSurvey" element={<EmployeeRoute><DeliverSurvey/></EmployeeRoute>} />
        </Routes>
      </>
  );
}

export default App;
