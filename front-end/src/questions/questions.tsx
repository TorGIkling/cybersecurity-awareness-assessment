import React from 'react';
import './questions.css';
import Header from "../components/header/header";
import QuestionList from "../components/questionsList/questionList";
import {useLocation, useNavigate} from "react-router-dom";

function Questions() {
    const navigate = useNavigate();
    const { surveyId } = useLocation().state as { surveyId: number };

    const handleBackButton = () => {
        navigate("/surveys");
    }

    const handleAddQuestion = () => {
        navigate("/addQuestion", { state: { surveyId: surveyId } });
    }

    return (
        <div className="questions-page">
            <Header />
            <QuestionList />
            <div className="questions-page-btn-row">
                <button className="questions-page-back-button" onClick={handleBackButton}>Tilbake</button>
                <button className="questions-page-button" onClick={handleAddQuestion}>Legg til spørsmål</button>
            </div>
        </div>
    );
}
export default Questions;