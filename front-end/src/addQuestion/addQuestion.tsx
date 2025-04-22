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
            alert("Alle felt må fylles ut");
            return;
        }

        //Check if inputs are valid
        const isValidQuestionText = /^[a-zA-Z0-9æøåÆØÅ\s]+$/.test(questionText);
        const isValidHighText = /^[a-zA-Z0-9æøåÆØÅ\s]+$/.test(highText);
        const isValidMiddleText = /^[a-zA-Z0-9æøåÆØÅ\s]+$/.test(middleText);
        const isValidLowText = /^[a-zA-Z0-9æøåÆØÅ\s]+$/.test(lowText);
        if (!isValidQuestionText || !isValidHighText || !isValidMiddleText || !isValidLowText) {
            alert("Ugyldig input");
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
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert("Spørsmålet ble lagt til");
                navigate("/questions", {state: {surveyId: surveyId}});
            } else {
                const errorText = await response.text();
                console.error("Failed to add question:", errorText);
                alert("Feil under oppretting av spørsmål");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Feil under oppretting av spørsmål");
        }

    }

    return (
        <div className="add-question-page">
            <div className="add-question-container">
                <input className="add-question-input" id="questionText" type="text" placeholder="Spørsmål"/>
                <input className="add-question-input" id="highText" type="text" placeholder="Text for 5"/>
                <input className="add-question-input" id="middleText" type="text" placeholder="Text for 3"/>
                <input className="add-question-input" id="lowText" type="text" placeholder="Text for 1"/>
                <select className="add-question-select" id="category" >
                    <option value="" hidden selected disabled>Velg Kategori</option>
                    <option value="Physical Security">Physical Security</option>
                    <option value="Phishing">Phishing</option>
                    <option value="Social Engineering">Social Engineering</option>
                </select>
            </div>
            <div className="add-question-btn-row">
                <button className="add-question-back-btn" onClick={handleBackButton}>Tilbake</button>
                <button className="add-question-add-btn" onClick={handleAddQuestion}>Legg til spørsmål</button>
            </div>
        </div>
    );
}
export default AddQuestion;