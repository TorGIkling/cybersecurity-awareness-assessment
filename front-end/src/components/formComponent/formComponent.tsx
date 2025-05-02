import "./formComponent.css"

import {useContext, useEffect} from "react";
import useMultistepForm from "../useMultistepForm/useMultistepForm";



function FormComponent() {
    const { next, back, steps, currentStepIndex, step, isFirstStep, isLastStep} = useMultistepForm()!;

    const questionText = step?.questionText;
    const lowText = step?.lowText;
    const highText = step?.highText;
    const middleText = step?.middleText;

    useEffect(() => {
        console.log("step:", step);
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
                        <input className="form-rad-btn" type="radio" name="answer" value="1" id="answer1"/>
                        <label htmlFor="answer1">{lowText}</label>
                    </div>
                    <div className="form-answer">
                        <input className="form-rad-btn" type="radio" name="answer" value="2" id="answer2"/>
                        <a className="empty-text"> </a>
                    </div>
                    <div className="form-answer">
                        <input className="form-rad-btn" type="radio" name="answer" value="3" id="answer3"/>
                        <label htmlFor="answer3">{middleText}</label>
                    </div>
                    <div className="form-answer">
                        <input className="form-rad-btn" type="radio" name="answer" value="4" id="answer4"/>
                        <a className="empty-text"> </a>
                    </div>
                    <div className="form-answer">
                        <input className="form-rad-btn" type="radio" name="answer" value="5" id="answer5"/>
                        <label htmlFor="answer5">{highText}</label>
                    </div>
                </div>
                <div className="survey-page-btn-row">
                    {!isFirstStep && <button className="survey-page-prev-btn" type="button" onClick={back}>Previous Question</button>}
                    <button className="survey-page-next-btn" type="button" onClick={next}>
                        {isLastStep ? "Finish Survey" : "Next Question"}
                    </button>
                </div>
            </div>
        </form>
    );

}
export default FormComponent;