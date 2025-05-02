import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../AuthProvider";
import {useLocation} from "react-router-dom";


type Step = {
    questionText: string;
    highText: string;
    lowText: string;
    middleText: string;
    category: string;
    questionId: number;
    surveyId: number;
}


function UseMultistepForm() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [steps, setSteps] = useState<Step[]>([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const surveyId = location.state?.surveyId;
    const didFetchRef = useRef(false);

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            getSurveyQuestions();
        }
    } , [surveyId]);


    useEffect(() => {
        console.log("Updated CurrentStep:", currentStepIndex);
    }, [currentStepIndex]);
    const getSurveyQuestions = async () => {
        try {
            let path = "/questionBySurveyID/" + surveyId;
            const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.error("Failed to fetch questions");
                alert("Could not fetch questions");
                return;
            }
            const json = await response.json();
            console.log("API response:", json.length);

            setSteps(json);

        } catch (error) {
            console.error("Error:", error);
            alert("Could not fetch questions");
        } finally {
            setLoading(false);
        }
    }


        const next = () => {
            setCurrentStepIndex(i => {
                if (i >= steps.length - 1) {
                    return i;
                }
                return i + 1;
            });
        }

        const back = () => {
            setCurrentStepIndex(i => {
                if (i <= 0) {
                    return i;
                }
                return i - 1;
            });
        }

        const goto = (index: number) => {
            setCurrentStepIndex(index);

        }

        return {
            currentStepIndex: currentStepIndex,
            steps,
            step: steps[currentStepIndex],
            isFirstStep: currentStepIndex === 0,
            isLastStep: currentStepIndex === steps.length - 1,
            next,
            back,
            goto,
            loading,
        }



}
export default UseMultistepForm;