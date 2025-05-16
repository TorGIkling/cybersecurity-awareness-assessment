import React from 'react';
import './addQuestion.css';
import {useLocation, useNavigate} from "react-router-dom";


function AddQuestion() {

    const navigate = useNavigate();
    const { surveyId } = useLocation().state as { surveyId: number };
    const handleBackButton = () => {
        navigate("/questions", {state: {surveyId: surveyId}});
    }

    const handleAddQuestion = async () => {
        let path = "/addQuestion";
        const questionText = (document.getElementById("questionText") as HTMLInputElement).value;
        const highText = (document.getElementById("highText") as HTMLInputElement).value;
        const middleText = (document.getElementById("middleText") as HTMLInputElement).value;
        const lowText = (document.getElementById("lowText") as HTMLInputElement).value;
        const category = (document.getElementById("category") as HTMLSelectElement).value;

        //Check if inputs are empty
        if (questionText === "" || highText === "" || middleText === "" || lowText === "" || category === "") {
            alert("All fields are required");
            return;
        }

        //Check if inputs are valid
        const isValidQuestionText = /^[a-zA-Z0-9æøåÆØÅ\s?,(-).]+$/.test(questionText);
        const isValidHighText = /^[a-zA-Z0-9æøåÆØÅ\s,(-)]+$/.test(highText);
        const isValidMiddleText = /^[a-zA-Z0-9æøåÆØÅ\s,(-)]+$/.test(middleText);
        const isValidLowText = /^[a-zA-Z0-9æøåÆØÅ\s,(-)]+$/.test(lowText);
        if (!isValidQuestionText || !isValidHighText || !isValidMiddleText || !isValidLowText) {
            alert("Invalid input");
            return;
        }

        const payload = {
            surveyID: surveyId,
            questionText: questionText,
            highText: highText,
            middleText: middleText,
            lowText: lowText,
            category: category
        }

        try {
            const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert("The question was added successfully");
                navigate("/questions", {state: {surveyId: surveyId}});
            } else {
                const errorText = await response.text();
                console.error("Failed to add question:", errorText);
                alert("Could not add question");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Could not add question");
        }

    }

    return (
        <div className="add-question-page">
            <div className="add-question-container">
                <input className="add-question-input" id="questionText" type="text" placeholder="Question"/>
                <input className="add-question-input" id="highText" type="text" placeholder="Text for best value"/>
                <input className="add-question-input" id="middleText" type="text" placeholder="Text for middle value"/>
                <input className="add-question-input" id="lowText" type="text" placeholder="Text for worst value"/>
                <select className="add-question-select" id="category" >
                    <option value="" hidden selected disabled>Choose category</option>
                    <option value="Best Practice">Best Practice</option>
                    <option value="Interception">Interception</option>
                    <option value="Phishing">Phishing</option>
                </select>
            </div>
            <div className="add-question-btn-row">
                <button className="add-question-back-btn" onClick={handleBackButton}>Back</button>
                <button className="add-question-add-btn" onClick={handleAddQuestion}>Add Question</button>
            </div>
        </div>
    );
}
export default AddQuestion;