import './resultsComponent.css'
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../AuthProvider";
import BarGraphComponent from "../graphComponent/barGraphComponent";
import SpiderGraphComponent from "../graphComponent/spiderGraphComponent";

interface Answer {
    answerId: number;
    answer: number;
    questionId: number;
    organizationId: number;
    questionText: string;
}

interface averageAnswer {
    questionId: number;
    average: number;
    questionText: string;
    questionNumber: number;
}

function ResultsComponent() {
    const [answer, setAnswer] = useState<Answer[]>([]);
    const [averagedAnswers, setAveragedAnswers] = useState<averageAnswer[]>([]);
    const organizationId = useContext(AuthContext)?.organizationId;
    const didFetchRef = useRef(false);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadAnswerList()
        }

    }, [organizationId]);

    useEffect(() => {
        if(!loading) {
            calculateAverage();
        }
    }, [loading]);

    const loadAnswerList = async () => {
        let path = "/getAnswersByOrgId/" + organizationId;
        const response = await fetch(process.env.REACT_APP_REST_API_URL + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
        });
        if (!response.ok) {
            console.error("Failed to fetch answers");
            alert("Answers could not be fetched");
            return;
        }
        const json = await response.json();
        setAnswer(json);
        console.log(json);
        setLoading(false);
        
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const calculateAverage = () => {
        const groupedAnswers = new Map<number, {questionText: string, total: number, count: number, questionNumber: number}>();

        answer.forEach((ans, index) => {
            if (!groupedAnswers.has(ans.questionId)) {
                groupedAnswers.set(ans.questionId, {
                    total: 0,
                    count: 0,
                    questionText: ans.questionText,
                    questionNumber: index + 1,
                });
            }
            const group = groupedAnswers.get(ans.questionId)!;
            group!.total += ans.answer;
            group!.count += 1;

        });

        const averages: averageAnswer[] = Array.from(groupedAnswers.entries()).map(([questionId, {total, count, questionText, questionNumber}]) => ({
            questionId,
            average: total / count,
            questionText,
            questionNumber,
        }));

        console.log("averages", averages);
        setAveragedAnswers(averages);

    }


    return (
        <div className='results-component-container'>
            <div className="results-component-top-row">
                <div className="results-component-graph">
                    <BarGraphComponent averageAnswers={averagedAnswers}/>
                    <SpiderGraphComponent averageAnswers={averagedAnswers}/>
                </div>
                <div className="results-component-answers">
                    {averagedAnswers.map((answer) => (
                        <div className="results-component-answer-item" key={answer.questionId}>
                            <p className="results-component-answer-text"> {answer.questionNumber +". " +answer.questionText}</p>
                            <p className="results-component-answer-number">{answer.average.toFixed(2)}</p>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}
export default ResultsComponent;