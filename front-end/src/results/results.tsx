import './results.css'

import Header from "../components/header/header";
import ResultsComponent from "../components/resultsComponent/resultsComponent";
import {useNavigate} from "react-router-dom";

function Results() {

    const navigate = useNavigate();

    const handelBackButton = () => {
        navigate("/");
    }

    return (
        <div className='results-container'>
            <Header />
            <ResultsComponent/>
            <button className='back-button' onClick={handelBackButton}>Tilbake</button>
        </div>
    );
}
export default Results;