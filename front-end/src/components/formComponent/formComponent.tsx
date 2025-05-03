import "./formComponent.css"

import {useContext, useEffect, useState} from "react";
import useMultistepForm from "../useMultistepForm/useMultistepForm";
import {AuthContext} from "../AuthProvider";

interface Answer {
    questionId: number;
    answer: number;
    organizationId: number;
}

function FormComponent() {
    const { next, back, steps, currentStepIndex, step, isFirstStep, isLastStep} = useMultistepForm()!;
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const organizationId = useContext(AuthContext)?.organizationId ?? 0;
    const questionId = step?.questionID;
    const questionText = step?.questionText;
    const lowText = step?.lowText;
    const highText = step?.highText;
    const middleText = step?.middleText;

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!questionId) {
            console.error("Question ID is undefined");
            return;
        }

        console.log("Answers: ", answers);
        console.log("QuestionId: ", questionId);

        const selectedAnswer = parseInt(event.target.value);
        setSelectedAnswer(selectedAnswer);
        const updatedAnswers = [...answers];
        while (updatedAnswers.length <= currentStepIndex) {
            updatedAnswers.push({questionId: 0, answer: 0, organizationId: 0});
        }
        updatedAnswers[currentStepIndex] ={
            questionId: questionId,
            answer: selectedAnswer,
            organizationId: organizationId,
        };
        setAnswers(updatedAnswers);
    }

    const handleFinishSurvey = async () => {
        let path = "/submitAnswers";


        const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
            body: JSON.stringify(answers),
        });
        if (!response.ok) {
            console.error("Failed to submit answers");
            alert("Could not submit answers");
            return;
        }
        const json = await response.json();
        console.log(json);
        alert("Survey submitted");
    }


    useEffect(() => {
        console.log("step:", step);
        setSelectedAnswer(null)
    }, [step]);
    console.log(currentStepIndex)

    return (
        <form className="form-component">
             <div className="form-component-container">
                 <div className="form-upper-element">

                    {currentStepIndex + 1} / {steps.length}
                </div>
                <div className="form-question-element">
                    <p className="form-question-text">{questionText}</p>
                </div>
                <div className="form-answer-element">
                    <div className="form-answer">
                        <input
                            onChange={handleAnswerChange}
                            className="form-rad-btn"
                            type="radio"
                            name="answer"
                            value="1"
                            id="answer1"
                            checked={selectedAnswer === 1}
                        />
                        <label htmlFor="answer1">{lowText}</label>
                    </div>
                    <div className="form-answer">
                        <input
                            onChange={handleAnswerChange}
                            className="form-rad-btn"
                            type="radio" name="answer"
                            value="2"
                            id="answer2"
                            checked={selectedAnswer === 2}
                        />
                        <a className="empty-text"> </a>
                    </div>
                    <div className="form-answer">
                        <input
                            onChange={handleAnswerChange}
                            className="form-rad-btn"
                            type="radio"
                            name="answer"
                            value="3"
                            id="answer3"
                            checked={selectedAnswer === 3}
                        />
                        <label htmlFor="answer3">{middleText}</label>
                    </div>
                    <div className="form-answer">
                        <input
                            onChange={handleAnswerChange}
                            className="form-rad-btn"
                            type="radio" name="answer"
                            value="4"
                            id="answer4"
                            checked={selectedAnswer === 4}
                        />
                        <a className="empty-text"> </a>
                    </div>
                    <div className="form-answer">
                        <input
                            onChange={handleAnswerChange}
                            className="form-rad-btn"
                            type="radio" name="answer"
                            value="5"
                            id="answer5"
                            checked={selectedAnswer === 5}
                        />
                        <label htmlFor="answer5">{highText}</label>
                    </div>
                </div>
                <div className="survey-page-btn-row">
                    {!isFirstStep && <button className="survey-page-prev-btn" type="button" onClick={back}>Previous Question</button>}
                    <button
                        className="survey-page-next-btn"
                        type="button"
                        onClick={isLastStep ? handleFinishSurvey : next}
                        disabled={selectedAnswer === null}
                    >
                        {isLastStep ? "Finish Survey" : "Next Question"}
                    </button>
                </div>
            </div>
        </form>
    );

}
export default FormComponent;