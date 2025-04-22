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
            alert("Feil under henting av undersøkelser");
            return;
        }
        const json = await response.json();
        console.log(json);
        setSurveys(json);
    }

    const handleEditSurvey = async (survey: Survey) => {
        navigate("/survey", {state: {surveyId: survey.surveyId, name: survey.name}});
    }
    return (
        <div className="survey-list">
            {surveys.map((org) => (
                <div className="survey-list-item" key={org.organizationId}>
                    <p className={"survey-list-text"}>{org.name}</p>
                    <button onClick={() => handleEditSurvey(org)} className={"survey-list-button"} type={"button"}>Rediger Undersøkelse</button>
                </div>
            ))}
        </div>
    );
}
export default SurveyList;