import Header from "../components/header/header";
import SurveyList from "../components/surveyList/surveyList";
import "./surveys.css";
import {useNavigate} from "react-router-dom";

function Surveys() {

    const navigate = useNavigate();

    const handleNewSurvey = async () => {
        navigate("/addSurvey");
    }

    return (
        <div className={"surveys-page"}>
            <Header/>
            <SurveyList/>
            <button className={"survey-page-button"} onClick={handleNewSurvey}>Ny undersøkelse</button>
        </div>
    );
}
export default Surveys;