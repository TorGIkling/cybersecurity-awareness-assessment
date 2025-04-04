import './startContent.css';

import {useNavigate} from "react-router-dom";

function StartContent() {

    const navigate = useNavigate();

    const handelBackButton = () => {
        navigate('/');
    };

    const handleStartButton = () => {
        navigate('/finishSurvey');
    }

    return (
        <div className="start-content">
            <a className='survey-title'> Cybersecurity Awareness Assessment </a>
            <div className='start-survey-btn-row'>
                <button className='start-survey-btn' type='button' onClick={handelBackButton}>Tilbake</button>
                <button className='start-survey-btn' type='button' onClick={handleStartButton}>Start undesøkelsen</button>
            </div>
        </div>
    );
}
export default StartContent;