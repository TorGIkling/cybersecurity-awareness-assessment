import "./barGraphComponent.css"
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart} from "chart.js";




ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GraphComponentProps {
    averageAnswers: {
        questionId: number;
        graphNumbers: number;
        questionText: string;
        text: string;
        questionNumber: number;
    }[];
    totalAverage: number;
    resultType: string;
    yMin: number;
    yMax: number;
    color:string;
}


function BarGraphComponent ({averageAnswers, totalAverage, resultType, yMin, yMax, color}: GraphComponentProps) {
    const answers = averageAnswers;
    console.log("Total Average:", totalAverage);
    const totalAnswerAverage = () => {
        console.log("Total Average Grade:", totalAverage/5);
        if (totalAverage/5 >= 0.89) {
            return totalAverage.toFixed(2) + " Grade: A";
        } else if (totalAverage/5 >= 0.77) {
            return totalAverage.toFixed(2) + " Grade: B";
        } else if (totalAverage/5 >= 0.65) {
            return totalAverage.toFixed(2) + " Grade: C";
        } else if (totalAverage/5 >= 0.53) {
            return totalAverage.toFixed(2) + " Grade: D";
        } else if (totalAverage/5 >= 0.41) {
            return totalAverage.toFixed(2) + " Grade: E";
        } else {
            return totalAverage.toFixed(2) + " Grade: F";
        }

    }
    console.log("resultType", resultType)
    const data = {
        labels: answers.map((answer) => answer.questionNumber),
        datasets: [
            {
                label: resultType === "average" ? "Average Answer" : "Lowest  Answer",
                data: answers.map((answer) => answer.graphNumbers),
                backgroundColor: answers.map((answer) => {
                    if (color === "notSelected") {
                        if (answer.graphNumbers <= 2.5) {
                            return "rgba(255, 99, 132, 0.6)";
                        } else if (answer.graphNumbers > 2.0 && answer.graphNumbers < 4.0) {
                            return "rgba(255, 206, 86, 0.6)";
                        } else {
                            return "rgba(73,201,17,0.6)";
                        }
                    } else {
                        return "rgb(55,163,163)"
                    }

                }),
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
            },
        ],
    };



    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    color: "black",
                    generateLabels: (chart: Chart) => {
                        const color =
                            totalAverage <= 2.5
                                ? "rgba(255,99,132,0.6)"
                                : totalAverage > 2.5 && totalAverage < 4.0
                                    ? "rgba(255, 206, 86, 0.6)"
                                    : "rgba(73,201,17,0.6)";

                        return [
                            {
                                text: totalAnswerAverage()!,
                                fillStyle: color,
                                strokeStyle: color,
                                lineWidth: 1,
                                hidden: false,
                                datasetIndex: 0,
                                scales: {

                                }
                            }
                        ]
                    },
                },

            },

        },
        scales: {
            x: {
                title: {
                    display:true,
                    text: resultType === "selected" ? "Answer" : "",
                    color: "black",
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    display: true,
                    color: "rgba(0,0,0,0.5)",
                },
            },
            y: {
                beginAtZero: false,
                min: yMin,
                max: yMax,
                ticks: {
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: resultType === "selected" ? "Number of answers" : "",
                    color: "black",
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    display: true,
                    color: "rgba(0,0,0,0.5)",
                },
            },

        }
    }


    return (
        <div className="graph-container">
            <div className="bar-chart">
                <Bar data={data} options={options}/>
            </div>
        </div>
    );
}
export default BarGraphComponent;