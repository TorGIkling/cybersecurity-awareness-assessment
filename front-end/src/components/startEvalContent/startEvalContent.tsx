import "./startEvalContent.css"
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../AuthProvider";
import {useNavigate} from "react-router-dom";

interface Survey {
    surveyId: number;
    name: string;
    organizationId: number;
    isActive: boolean;
}

function StartEvalContent() {
    const [survey, setSurvey] = useState<Survey[]>([]);
    const OrganizationId = useContext(AuthContext)?.organizationId;
    const didFetchRef = useRef(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadSurveyList()
        }
    }, [OrganizationId]);

    const handleSelectSurvey = async (surveyID: number) => {
        console.log("selectSurvey", surveyID)
        let path = "/updateSurvey/" + surveyID;

        const payload = {
            organizationId: OrganizationId,
            isActive: true,
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
            alert("Could not start evaluation");
            return;
        }
        const json = await response.json();
        console.log(json);
        alert("Evaluation started");

        navigate("/monitor");
    }


    const loadSurveyList = async () => {
        let path = "/surveys";
        let unusedSurveys: Survey[] = [];
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

        for (let i = 0; i < json.length; i++) {
            if (json[i].organizationId === null) {
                unusedSurveys.push(json[i]);
            }
        }

        console.log(unusedSurveys);
        setSurvey(unusedSurveys);
    }

    return (
        <div className="start-eval-content">
            {survey.map((survey) => (
            <div className="start-eval-content-item" key={survey.surveyId}>
                <p className="start-eval-content-text">{survey.name}</p>
                <button className="start-eval-content-btn" onClick={() => handleSelectSurvey(survey.surveyId)} type="button">Start Evaluation</button>
            </div>
            ))}
        </div>
    );
}

export default StartEvalContent;