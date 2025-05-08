import "./barGraphComponent.css"
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart} from "chart.js";




ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GraphComponentProps {
    averageAnswers: {
        questionId: number;
        average: number;
        questionText: string;
        questionNumber: number;
    }[];
    totalAverage: number;
}


function BarGraphComponent ({averageAnswers, totalAverage}: GraphComponentProps) {
    const answers = averageAnswers;
    console.log("Total Average:", totalAverage);
    const totalAnswerAverage = Math.round((totalAverage + Number.EPSILON)*100) / 100;

    const data = {
        labels: answers.map((answer) => answer.questionNumber),
        datasets: [
            {
                label: "Average Answers",
                data: answers.map((answer) => answer.average),
                backgroundColor: answers.map((answer) => {
                   if (answer.average <= 2.5) {
                       return "rgba(255, 99, 132, 0.6)";
                   } else if (answer.average > 2.0 && answer.average < 4.0) {
                          return "rgba(255, 206, 86, 0.6)";
                   } else {
                          return "rgba(73,201,17,0.6)";
                   }
                }),
                borderColor: answers.map((answer) => {
                    if (answer.average <= 2.5) {
                        return "rgba(255, 99, 132, 0.6)";
                    } else if (answer.average > 2.5 && answer.average < 4.0) {
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