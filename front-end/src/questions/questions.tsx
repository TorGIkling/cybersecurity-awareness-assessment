import React from 'react';
import './questions.css';
import Header from "../components/header/header";
import QuestionList from "../components/questionsList/questionList";


function Questions() {
    return (
        <div className="questions-page">
            <Header />
            <QuestionList />
            <div className="questions-page-btn-row">
                <button className="questions-page-back-button">Tilbake</button>
                <button className="questions-page-button">Legg til spørsmål</button>
            </div>
        </div>
    );
}
export default Questions;