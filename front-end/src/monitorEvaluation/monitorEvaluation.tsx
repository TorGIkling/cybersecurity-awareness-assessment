import './monitorEvaluation.css'

import Header from "../components/header/header";
import MonitorComponent from "../components/monitorComponent/monitorComponent";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../components/AuthProvider";

interface survey {
    surveyId: number;
    name: string;
    organizationId: number;
    active: boolean;
}


function MonitorEvaluation() {
    const [surveyActive, setSurveyActive] = useState(false);
    const [survey, setSurvey] = useState<survey[]>([]);
    const didFetchRef = useRef(false);
    const navigate = useNavigate();
    const organizationId = useContext(AuthContext)?.organizationId;

    const handleBackButton = () => {
        navigate("/");
    };

    const handleEndEvaluation = async () => {
        navigate("/");
    };

    const handleStartEval = async () => {
        navigate("/startEval");
    }

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            isSurveyActive();
        }
    } , [organizationId]);

    const isSurveyActive = async () => {
        let path = "/getSurveyByOrgId/" + organizationId;

        const response = await fetch (process.env.REACT_APP_REST_API_URL + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
            }
        });
        if (!response.ok) {
            console.error("Failed to fetch survey");
            alert("Survey could not be fetched");
            return;
        }
        const json = await response.json();

        for (let i = 0; i < json.length; i++) {
            if (json[i].active === true) {
                setSurveyActive(true);
            }
        }
        setSurvey(json);
    }

    return (
        <div className="monitor-evaluation">
            <Header/>
            <MonitorComponent/>
            <div className="monitor-eval-button-row">
                <button className='monitor-eval-button' onClick={handleBackButton}>Back</button>
                {surveyActive ? <button className="monitor-eval-button" onClick={handleEndEvaluation}>End Evaluation</button> : <button className="monitor-eval-button" onClick={handleStartEval}>Start Evaluation</button>}
            </div>
        </div>
    );
}
export default MonitorEvaluation;