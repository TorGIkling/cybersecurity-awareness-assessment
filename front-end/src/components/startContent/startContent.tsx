import './startContent.css';

import {useNavigate} from "react-router-dom";

function StartContent() {

    const navigate = useNavigate();

    const handelBackButton = () => {
        navigate('/');
    };

    const handleStartButton = () => {
        navigate('/survey');
    }

    return (
        <div className="start-content">
            <a className='survey-title'> Cybersecurity Awareness Assessment </a>
            <div className='start-survey-btn-row'>
                <button className='start-survey-btn' type='button' onClick={handelBackButton}>Back</button>
                <button className='start-survey-btn' type='button' onClick={handleStartButton}>Start Survey</button>
            </div>
        </div>
    );
}
export default StartContent;