import './startSurvey.css';

import Header from "../components/header/header";
import StartContent from "../components/startContent/startContent";

function startSurvey() {
    return (
        <div className='start-survey-container'>
            <Header/>
            <StartContent/>
        </div>
    );
}
export default startSurvey;