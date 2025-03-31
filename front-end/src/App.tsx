
import './App.css';
import {Routes, Route} from "react-router-dom";
import HomePage from "./homePage/homePage";
import Login from "./login/login";


function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </>
  );
}

export default App;
