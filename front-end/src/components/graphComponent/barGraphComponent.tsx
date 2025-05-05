import "./barGraphComponent.css"
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GraphComponentProps {
    averageAnswers: {
        questionId: number;
        average: number;
        questionText: string;
        questionNumber: number;
    }[];
}


function BarGraphComponent ({averageAnswers}: GraphComponentProps) {
    const answers = averageAnswers;

    const data = {
        labels: answers.map((answer) => answer.questionNumber),
        datasets: [
            {
                label: "Average Answers",
                data: answers.map((answer) => answer.average),
                backgroundColor: answers.map((answer) => {
                   if (answer.average <= 2.5) {
                       return "rgba(255, 99, 132, 0.6)";
                   } else if (answer.average > 2.0 && answer.average <= 3.5) {
                          return "rgba(255, 206, 86, 0.6)";
                   } else {
                          return "rgba(73,201,17,0.6)";
                   }
                }),
                borderColor: answers.map((answer) => {
                    if (answer.average <= 2.5) {
                        return "rgba(255, 99, 132, 0.6)";
                    } else if (answer.average > 2.5 && answer.average <= 3.5) {
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
            },
            title: {
                display: true,
                text: "Average Results for each Question",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
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