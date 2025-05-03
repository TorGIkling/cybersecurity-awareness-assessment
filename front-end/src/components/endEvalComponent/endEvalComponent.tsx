import "./endEvalComponent.css"
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../AuthProvider";

interface Survey {
    surveyId: number;
    name:  string;
    organizationId: number;
    isActive: boolean;
}

function EndEvalComponent() {

    const [survey, setSurvey] = useState<Survey[]>([]);
    const didFetchRef = useRef(false);
    const organizationId = useContext(AuthContext)?.organizationId;

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadActiveSurveyList()
        }
    }, [organizationId]);

    const loadActiveSurveyList = async () => {
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
        setSurvey(json);
    },

    handEndEval = async (surveyID: number) => {
        let path = "/updateSurvey/" + surveyID;
        const payload = {
            organizationId: null,
            isActive: false,
        }

        const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            console.error("Failed to update survey");
            alert("Could not end evaluation");
            return;
        }
        const json = await response.json();
        console.log(json);
        alert("Evaluation ended");

        setSurvey([]);
    }

    return (
      <div className="end-eval-component-container">
          {survey.map((survey) => (
          <div className="end-eval-component-item" key={survey.surveyId}>
              <p className="end-eval-component-text">{survey.name}</p>
              <button className="end-eval-component-end-btn" onClick={() => handEndEval(survey.surveyId)} type="button">End Evaluation</button>
          </div>
          ))}
      </div>
    );
}
export default EndEvalComponent;