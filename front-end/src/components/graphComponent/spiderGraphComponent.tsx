import "./spiderGraphComponent.css"
import {Radar} from "react-chartjs-2";
import {Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SpiderGraphComponentProps {
    averageAnswers: {
        questionId: number;
        graphNumbers: number;
        questionText: string;
        text: string;
        questionNumber: number;
    }[];
    totalAverage:number;
    resultType: string;
}

function SpiderGraphComponent({averageAnswers}: SpiderGraphComponentProps) {
    const data = {
        labels: averageAnswers.map(answer => answer.questionNumber),
        datasets: [
            {
                label:  averageAnswers[0]?.text + " Answer",
                data: averageAnswers.map(answer => answer.graphNumbers),
                borderWidth: 0.5,
                pointBorderColor: "rgba(0,0,0,1)",
                pointBackgroundColor: averageAnswers.map(answer => {
                    if (answer.graphNumbers <= 2.5) {
                        return "rgba(255, 99, 132, 0.6)";
                    } else if (answer.graphNumbers > 2.5 && answer.graphNumbers <= 4.0) {
                        return "rgba(255, 206, 86, 0.6)";
                    } else {
                        return "rgba(73,201,17,0.6)";
                    }
                }),
                backgroundColor: averageAnswers.map((answer) => {
                    if (answer.graphNumbers <= 2.5) {
                        return "rgba(255, 99, 132, 0.6)";
                    } else if (answer.graphNumbers > 2.0 && answer.graphNumbers < 4.0) {
                        return "rgba(255, 206, 86, 0.6)";
                    } else {
                        return "rgba(73,201,17,0.6)";
                    }
                }),
                borderColor: averageAnswers.map((answer) => {
                    if (answer.graphNumbers <= 2.5) {
                        return "rgba(255, 99, 132, 0.6)";
                    } else if (answer.graphNumbers > 2.5 && answer.graphNumbers < 4.0) {
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
                text: averageAnswers[0]?.text + " Results for each Question",
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