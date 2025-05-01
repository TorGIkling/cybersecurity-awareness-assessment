import React from 'react';
import './addSurvey.css';
import {useNavigate} from "react-router-dom";

function AddSurvey() {

    const navigate = useNavigate();

    const handlebackButton = async () => {
        navigate("/surveys");
    }

    const handleAddSurvey = async () => {
        let path = "/addSurvey";
        const surveyNameInput = document.querySelector(".add-survey-input-text") as HTMLInputElement;
        const surveyNameValue = surveyNameInput?.value.trim();

        if (surveyNameValue === "") {
            alert("All fields are required");
            return;
        }

        const isValidSurveyName = /^[a-zA-Z0-9æøåÆØÅ\s]+$/.test(surveyNameValue);

        if (!isValidSurveyName) {
            alert("Invalid survey name");
            return;
        }
        const payload = {
            name: surveyNameValue,
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
                alert("Survey added successfully");
                navigate("/surveys");
            } else {
                const errorText = await response.text();
                console.error("Failed to add survey:", errorText);
                alert("Could not add survey");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Could not add survey");
        }
    }
    return (
        <div className="add-survey-page">
            <div className="add-survey-container">
                <input className="add-survey-input-text" type="text" placeholder="Navn på Undesøkelsen" />
                <div className="add-survey-btn-row">
                    <button className="add-survey-back-btn" type="submit" onClick={handlebackButton}>Back</button>
                    <button className="add-survey-btn" type="submit" onClick={handleAddSurvey}>Add Survey</button>
                </div>

            </div>
        </div>
    );
}
export default AddSurvey;