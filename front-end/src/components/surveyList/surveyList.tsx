import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './surveyList.css';


interface Survey {
    surveyId: number;
    name: string;
    organizationId: number;
}

function SurveyList() {
    const [surveys, setSurveys] = useState<Survey[]>([]);

    const navigate = useNavigate();
    const didFetchRef = useRef(false);

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadSurveyList()
        }
    })

    const loadSurveyList = async () => {
        let path = "/surveys";
        const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            console.error("Failed to fetch surveys");
            alert("Could not fetch surveys");
            return;
        }
        const json = await response.json();
        console.log(json);
        setSurveys(json);
    }

    const handleEditSurvey = async (survey: Survey) => {
        navigate("/questions", {state: {surveyId: survey.surveyId, name: survey.name}});
    }
    return (
        <div className="survey-list">
            {surveys.map((survey) => (
                <div className="survey-list-item" key={survey.organizationId}>
                    <p className={"survey-list-text"}>{survey.name}</p>
                    <button onClick={() => handleEditSurvey(survey)} className={"survey-list-button"} type={"button"}>Edit Survey</button>
                </div>
            ))}
        </div>
    );
}
export default SurveyList;