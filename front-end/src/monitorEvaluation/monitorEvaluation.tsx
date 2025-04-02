import './monitorEvaluation.css'

import Header from "../components/header/header";
import MonitorComponent from "../components/monitorComponent/monitorComponent";
import {useNavigate} from "react-router-dom";

function MonitorEvaluation() {

    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate("/");
    };

    const handleEndEvaluation = () => {
        navigate("/");
    };


    return (
        <div className="monitor-evaluation">
            <Header/>
            <MonitorComponent/>
            <div className="monitor-eval-button-row">
                <button className='monitor-eval-button' onClick={handleBackButton}>Tilbake</button>
                <button className='monitor-eval-button' onClick={handleEndEvaluation}>Avslutt Evaluering</button>
            </div>
        </div>
    );
}
export default MonitorEvaluation;