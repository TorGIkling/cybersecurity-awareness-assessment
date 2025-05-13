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
}


function BarGraphComponent ({averageAnswers, totalAverage, resultType}: GraphComponentProps) {
    const answers = averageAnswers;
    console.log("Total Average:", totalAverage);
    const totalAnswerAverage = totalAverage.toFixed(2);

    const data = {
        labels: answers.map((answer) => answer.questionNumber),
        datasets: [
            {
                label: resultType === "average" ? "Average Answer" : "Lowest  Answer",
                data: answers.map((answer) => answer.graphNumbers),
                backgroundColor: answers.map((answer) => {
                   if (answer.graphNumbers <= 2.5) {
                       return "rgba(255, 99, 132, 0.6)";
                   } else if (answer.graphNumbers > 2.0 && answer.graphNumbers < 4.0) {
                          return "rgba(255, 206, 86, 0.6)";
                   } else {
                          return "rgba(73,201,17,0.6)";
                   }
                }),
                borderColor: answers.map((answer) => {
                    if (answer.graphNumbers <= 2.5) {
                        return "rgba(255, 99, 132, 0.6)";
                    } else if (answer.graphNumbers > 2.5 && answer.graphNumbers < 4.0) {
                        return "rgba(255, 206, 86, 0.6)";
                    } else {
                        return "rgba(73,201,17,0.6)";
                    }
                }),
                borderWidth: 2,
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
                                text: totalAnswerAverage.toString(),
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
            y: {
                beginAtZero: false,
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 1,
                },
            }
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