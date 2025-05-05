import "./spiderGraphComponent.css"
import {Radar} from "react-chartjs-2";
import {Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SpiderGraphComponentProps {
    averageAnswers: {
        questionId: number;
        average: number;
        questionText: string;
        questionNumber: number;
    }[];
}

function SpiderGraphComponent({averageAnswers}: SpiderGraphComponentProps) {
    const data = {
        labels: averageAnswers.map(answer => answer.questionNumber),
        datasets: [
            {
                label: "Average Answers",
                data: averageAnswers.map(answer => answer.average),
                backgroundColor: "rgba(70,186,189,0.6)",
                borderColor: "rgba(70,186,189,0.6)",
                borderWidth: 2,
                pointBorderColor: averageAnswers.map(answer => {
                    if (answer.average <= 2.5) {
                        return "rgba(255, 99, 132, 0.6)";
                    } else if (answer.average > 2.5 && answer.average <= 3.5) {
                        return "rgba(255, 206, 86, 0.6)";
                    } else {
                        return "rgba(73,201,17,0.6)";
                    }
                }),
                pointBackgroundColor: averageAnswers.map(answer => {
                    if (answer.average <= 2.5) {
                        return "rgba(255, 99, 132, 0.6)";
                    } else if (answer.average > 2.5 && answer.average <= 3.5) {
                        return "rgba(255, 206, 86, 0.6)";
                    } else {
                        return "rgba(73,201,17,0.6)";
                    }
                }),
            },
        ],
    };
    const options = {
        responsive: true,
        scales: {
            r: {
                beginAtZero: false,
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            title: {
                display: true,
                text: "Average Results for each Question",
            },
        },
    };

    return (
        <div className="spider-graph-container">
            <div className="spide-chart">
                <Radar data={data} options={options} />
            </div>

        </div>
    );
}
export default SpiderGraphComponent;