import './finishContent.css'

import {useNavigate} from "react-router-dom";

function FinishContent() {

    const navigate = useNavigate();

    const handleFinishButton = () => {
        navigate('/');
    };

    const handlePreviousButton = () => {
        navigate('/startSurvey');
    };

    return (
        <div className="finish-content">
            <a className={'survey-title'}>Cybersecurity Awareness Assessment</a>
            <div className="start-survey-btn-row">
                <button className={'start-survey-btn'} onClick={handlePreviousButton}>Forrige Spørsmål</button>
                <button className={'start-survey-btn'} onClick={handleFinishButton}>Lever Undersøkelse</button>
            </div>
        </div>
    );
}
export default  FinishContent;