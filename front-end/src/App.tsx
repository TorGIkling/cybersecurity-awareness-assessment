
import './App.css';
import {Routes, Route} from "react-router-dom";
import HomePage from "./homePage/homePage";
import Login from "./login/login";
import AddOrganization from "./addOrganization/addOrganization";
import OrganizationsPage from "./organizationsPage/organizationsPage";


function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/add-organization" element={<AddOrganization/>}/>
            <Route path="/organizations" element={<OrganizationsPage/>}/>
        </Routes>
      </>
  );
}

export default App;
