import './resultsComponent.css'
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../AuthProvider";
import BarGraphComponent from "../graphComponent/barGraphComponent";
import SpiderGraphComponent from "../graphComponent/spiderGraphComponent";
import {data} from "react-router-dom";

interface Answer {
    answerId: number;
    answer: number;
    questionId: number;
    organizationId: number;
    questionText: string;
}

interface graphData {
    questionId: number;
    graphNumbers: number;
    lowest: number;
    questionText: string;
    questionNumber: number;
}


function ResultsComponent() {
    const [answer, setAnswer] = useState<Answer[]>([]);
    const [graphData, setGraphData] = useState<graphData[]>([]);
    const [totalAverage, setTotalAverage] = useState<number>(0);
    const [resultType, setResultType] = useState<string>("average");
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
        let graphNumbers = [];
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

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResultType(event.target.value);
    }

    const calculateAverage = () => {
        const groupedAnswers = new Map<number, {questionText: string, total: number, count: number, questionNumber: number, lowest: number}>();

        answer.forEach((ans, index) => {
            if (!groupedAnswers.has(ans.questionId)) {
                groupedAnswers.set(ans.questionId, {
                    total: 0,
                    count: 0,
                    questionText: ans.questionText,
                    questionNumber: index + 1,
                    lowest: ans.answer,
                });
            }
            const group = groupedAnswers.get(ans.questionId)!;
            group!.total += ans.answer;
            group!.count += 1;
            group!.lowest = Math.min(group.lowest, ans.answer);

        });



        const graphData: graphData[] = Array.from(groupedAnswers.entries()).map(([questionId, {total, count, lowest, questionText, questionNumber}]) => ({
            questionId,
            graphNumbers: total / count,
            lowest,
            questionText,
            questionNumber,
        }));


        console.log("graphData", graphData);
        setGraphData(graphData);

        let total = 0;
        for (let i = 0; i < graphData.length; i += 1) {
            total += graphData[i].graphNumbers;
        }
        const totalAverage = total / graphData.length;
        console.log("Total Average:", totalAverage);
        setTotalAverage(totalAverage);

    }


    return (
        <div className='results-component-container'>
            <div className="results-component-top-row">
                <div className="results-component-graph">
                    <div className="results-graph-btn-row">
                        <div className="rad-btn">
                            <input
                                onChange={handleAnswerChange}
                                className="graph-rad-btn"
                                type="radio"
                                value="average"
                                name="average"
                                id="average"
                                checked={resultType === "average"}
                            />
                            <label htmlFor="average">Average</label>
                        </div>
                        <div className="rad-btn">
                            <input
                                onChange={handleAnswerChange}
                                className="graph-rad-btn"
                                type="radio"
                                value="lowest"
                                name="lowest"
                                id="lowest"
                                checked={resultType === "lowest"}
                            />
                            <label htmlFor="lowest">Lowest</label>
                        </div>

                    </div>
                    <BarGraphComponent averageAnswers={resultType === "average"
                        ? graphData.map(data => ({...data, graphNumbers: data.graphNumbers, text: "Average"}))
                        : graphData.map(data => ({...data, graphNumbers: data.lowest, text:"Lowest"}))
                    } totalAverage={totalAverage} />
                    <SpiderGraphComponent averageAnswers={resultType === "average"
                        ? graphData.map(data => ({...data, graphNumbers: data.graphNumbers, text: "Average"}))
                        : graphData.map(data => ({...data, graphNumbers: data.lowest, text:"Lowest"}))
                    }/>
                </div>
                <div className="results-component-answers">
                    {graphData.map((answer) => (
                        <div className="results-component-answer-item" key={answer.questionId}>
                            <p className="results-component-answer-text"> {answer.questionNumber +". " +answer.questionText}</p>
                            <p className="results-component-answer-number">{resultType==="average"
                                    ? answer.graphNumbers.toFixed(2)
                                    : answer.lowest.toFixed(2)
                                }
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}
export default ResultsComponent;