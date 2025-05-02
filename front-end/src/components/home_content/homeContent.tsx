import "./homeContent.css"
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../AuthProvider";
import {useContext} from "react";

function HomeContent() {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const role = authContext?.role;
    console.log(role);

    const handelStartSurvey = () => {
        navigate("/startSurvey");
    };

    return (
      <div className="home-content">
          <div className="content-container">
              {(role === "Evaluator" || role === "Manager") && <button className="result-btn" onClick={() => navigate("/result")}>Result</button>}
              {role === "Evaluator" && <button className="monitor-eval-btn" onClick={() => navigate("/monitor")}>Monitor Evaluation</button>}
              <button className="start-survey-btn" onClick={handelStartSurvey}>Start Survey</button>
          </div>
      </div>
    );

}
export default HomeContent;