import Header from "../components/header/header";
import SurveyList from "../components/surveyList/surveyList";
import "./surveys.css";
import {useNavigate} from "react-router-dom";


function Surveys() {

    const navigate = useNavigate();


    const handleNewSurvey = async () => {
        navigate("/addSurvey");
    }
    const handleBackBtn = async () => {
        navigate("/organizations");
    }

    return (
        <div className={"surveys-page"}>
            <Header/>
            <SurveyList/>
            <div className={"survey-page-btn-row"}>
                <button className={"survey-page-back-button"} onClick={handleBackBtn}>Back</button>
                <button className={"survey-page-button"} onClick={handleNewSurvey}>New Survey</button>
            </div>
        </div>
    );
}
export default Surveys;