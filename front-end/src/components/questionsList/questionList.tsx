import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './questionList.css'

interface Question {
    surveyId: number;
    questionText: string;
    highText: string;
    lowText: string;
    category: string;
    middleText: string;
}

function QuestionList() {
    const [questions, setQuestions] = useState<Question[]>([]);

    const {surveyId} = useLocation().state as {surveyId: number};
    const didFetchRef = useRef(false)

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadQuestionList()
        }
    })

    const loadQuestionList = async () => {
        let path = "/questionBySurveyID/" + surveyId;
        const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
        });
        if (!response.ok) {
            console.error("Failed to fetch questions");
            alert("Could not fetch questions");
            return;
        }
        const json = await response.json();
        setQuestions(json);
    }

    return (
        <div className="questionList-page">
            {questions.map((question) => (
                <div className="question-list-item">
                    <p className="question-list-text">{question.questionText}</p>
                    <p className="question-list-text">{question.category}</p>
                </div>
            ))}
        </div>
    );
}

export default QuestionList;