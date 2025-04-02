import "./homeContent.css"
import {useNavigate} from "react-router-dom";

function HomeContent() {

    const navigate = useNavigate();

    const handelStartSurvey = () => {
        navigate("/startSurvey");
    };

    return (
      <div className="home-content">
          <div className="content-container">
              <button className="start-survey-btn" onClick={handelStartSurvey}>Start Survey</button>
          </div>

      </div>
    );

}
export default HomeContent;