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

interface graphData {
    questionId: number;
    graphNumbers: number;
    lowest: number;
    questionText: string;
    questionNumber: number;
    yMin:number;
}


function ResultsComponent() {
    const [answer, setAnswer] = useState<Answer[]>([]);
    const [graphData, setGraphData] = useState<graphData[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<graphData[]>([]);
    const [selectedAverage, setSelectedAverage] = useState<number>(0);
    const [totalAverage, setTotalAverage] = useState<number>(0);
    const [lowestAverage, setLowestAverage] = useState<number>(0);
    const [resultType, setResultType] = useState<string>("average");
    const organizationId = useContext(AuthContext)?.organizationId;
    const didFetchRef = useRef(false);
    const [loading , setLoading] = useState(true);
    const selectedResultsRef = useRef<HTMLDivElement | null>(null);
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectedResultsRef.current && !selectedResultsRef.current.contains(event.target as Node)) {
                setSelectedQuestion([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

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

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResultType(e.target.value);
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
            yMin: 1,
            yMax: 5,
        }));


        console.log("graphData", graphData);
        setGraphData(graphData);

        let averageTotal = 0;
        let lowestTotal = 0;
        for (let i = 0; i < graphData.length; i ++) {
                averageTotal += graphData[i].graphNumbers;
                lowestTotal += graphData[i].lowest;
        }
        setTotalAverage(averageTotal/graphData.length);
        setLowestAverage(lowestTotal/graphData.length);

    }


    const displayQuestionResults = (questionId: number) => () => {
        const questionResults= answer.filter((data) => data.questionId === questionId);

        const valueCounts = Array(5).fill(0);

        questionResults.forEach((result) => {
            if (result.answer >= 1 && result.answer <= 5) {
                valueCounts[result.answer - 1]++;
            }
        });

        let total = 0;
        console.log(questionResults.length);
        for (let i = 0; i < questionResults.length; i ++) {
            total += questionResults[i].answer;
        }
        setSelectedAverage(total/questionResults.length);

        const formattedQuestionResults = valueCounts.map((count, index) => ({
            questionId,
            graphNumbers: count,
            lowest: 0,
            questionText: questionResults[0]?.questionText,
            questionNumber: index + 1,
            yMin: 0,
            yMax: questionResults.length,
        }));
        setSelectedQuestion(formattedQuestionResults);

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
                        }  totalAverage={resultType === "average"
                            ? totalAverage
                            : lowestAverage
                        }  resultType={resultType}
                        yMin={1}
                        yMax={5}
                        color={"notSelected"}
                    />
                    <SpiderGraphComponent averageAnswers={resultType === "average"
                            ? graphData.map(data => ({...data, graphNumbers: data.graphNumbers, text: "Average"}))
                            : graphData.map(data => ({...data, graphNumbers: data.lowest, text:"Lowest"}))
                        } totalAverage={resultType === "average"
                            ? totalAverage
                            : lowestAverage
                        }   resultType={resultType}

                    />
                </div>
                <div className="results-component-answers">
                    {graphData.map((answer) => (
                        <div onClick={displayQuestionResults(answer.questionId)} className="results-component-answer-item" key={answer.questionId}>
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
            {selectedQuestion && selectedQuestion.length > 0 &&(
                <div ref={selectedResultsRef} className="selected-results-component">
                    <p className="selected-results-component-text">{selectedQuestion[0]?.questionText}</p>
                        <BarGraphComponent averageAnswers={selectedQuestion.map((answer) => ({
                            ...answer,
                            graphNumbers: answer.graphNumbers,
                            text: answer.questionText,
                            questionNumber: answer.questionNumber}))}
                       totalAverage={selectedAverage}
                       resultType={"selected"}
                       yMin={0}
                       yMax={selectedQuestion.length}
                       color={"selected"}
                    />
                </div>
            )}
        </div>
    );
}

export default ResultsComponent;