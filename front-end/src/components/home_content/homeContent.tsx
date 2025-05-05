import "./homeContent.css"
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../AuthProvider";
import {useContext, useEffect, useState} from "react";

function HomeContent() {
    const [activeSurvey, setActiveSurvey] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const role = authContext?.role;
    const organizationId = authContext?.organizationId;
    const hasAnswered = authContext?.hasAnswered;
    console.log(role);

    useEffect(() => {
        getIfActiveSurvey();
    }, [organizationId]);

    const getIfActiveSurvey = async () => {
        let path = "/getActiveSurveys/" + organizationId;

        const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
        });
        if (!response.ok) {
            console.error("Failed to fetch surveys");
            alert("Could not fetch surveys");
            return;
        }
        const json = await response.json();
        console.log("Active Surveys:", json);
        for (let i = 0; i < json.length; i++) {
            if (json[i].active === true) {
                setActiveSurvey(true);
            }
        }

    }

    const handelStartSurvey = () => {
        navigate("/startSurvey");
    };



    return (
      <div className="home-content">
          <div className="content-container">
              {(role === "Evaluator" || role === "Manager") && <button className="result-btn" onClick={() => navigate("/result")}>Result</button>}
              {role === "Evaluator" && <button className="monitor-eval-btn" onClick={() => navigate("/monitor")}>Monitor Evaluation</button>}
              <button className="start-survey-btn" onClick={handelStartSurvey} disabled={hasAnswered || !activeSurvey}>Start Survey</button>
          </div>
      </div>
    );

}
export default HomeContent;