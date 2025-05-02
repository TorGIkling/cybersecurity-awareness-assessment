import "./StartEvaluation.css"
import Header from "../components/header/header";
import StartEvalContent from "../components/startEvalContent/startEvalContent";
import {useNavigate} from "react-router-dom";


function StartEvaluation () {

    const navigate = useNavigate();

    const handleBackBtn = () => {
        navigate("/monitor");
    }

    return (
        <div className="start-evaluation-container">
            <Header />
            <StartEvalContent/>
            <div className="start-evaluation-btn-row">
                <button className="back-eval-button" onClick={handleBackBtn}>Back</button>
            </div>
        </div>
    );
}

export default StartEvaluation;