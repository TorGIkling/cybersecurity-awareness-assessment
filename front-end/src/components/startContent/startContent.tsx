import './startContent.css';

import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../AuthProvider";

interface Survey {
    surveyId: number;
    name:  string;
    organizationId: number;
    isActive: boolean;
}



function StartContent() {
    const [survey, setSurvey] = useState<Survey[]>([]);
    const {activeSurvey} = useLocation().state as {activeSurvey: boolean};
    const [surveyId, setSurveyId] = useState<number | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const didFetchRef = useRef(false);
    const organizationId = useContext(AuthContext)?.organizationId;
    const hasAnswered = useContext(AuthContext)?.hasAnswered;
    const [surveyName, setSurveyName] = useState<string>("");


    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadSurveyList()
        }
    }, [organizationId]);

    const surveyNotStarted = () => {
        navigate('/');
    }

    const loadSurveyList = async () => {
        let path = "/getSurveyByOrgId/" + organizationId;
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

        if (json.length === 0 || hasAnswered ) {
            surveyNotStarted();
        }

        for (let i = 0; i < json.length; i++) {
            if (json[i].active) {
                setSurveyName(json[i].name);
                setSurveyId(json[i].surveyId);
                console.log(json[i].name);
            }
        }
        setLoading(false);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handelBackButton = () => {
        navigate('/');
    };

    const handleStartButton = () => {
        console.log("surveyId", surveyId);
        navigate('/survey', {state: {surveyId: surveyId, activeSurvey: activeSurvey}});
    }

    return (

        <div className="start-content">
            <a className='survey-title'>{surveyName}</a>
            <p className="privacy-statement"> Thank you for participating in the {surveyName}.
                No personally identifying information is collected by the survey and
                your responses are unable to be tied to your identity by the system or evaluator.
            </p>
            <div className='start-survey-btn-row'>
                <button className='start-btn' type='button' onClick={handelBackButton}>Back</button>
                <button className='start-btn' type='button' onClick={handleStartButton}>Start Survey</button>
            </div>
        </div>

    );
}
export default StartContent;