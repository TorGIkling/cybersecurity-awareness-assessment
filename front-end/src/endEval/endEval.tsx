import "./endEval.css"
import Header from "../components/header/header";
import EndEvalComponent from "../components/endEvalComponent/endEvalComponent";
import {useNavigate} from "react-router-dom";

function EndEval () {

    const navigate = useNavigate();

    const handleBackBtn = () => {
        navigate("/monitor");
    }

    return (
        <div className="end-eval-container">
            <Header/>
            <EndEvalComponent/>
            <div className="end-eval-btn-row">
                <button className="end-eval-back-btn" onClick={handleBackBtn}>Back</button>
            </div>
        </div>
    );

}
export default EndEval;