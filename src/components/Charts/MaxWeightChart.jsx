import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getChartDataPoints = (history) => {
  // get all of the dates and reverse them
  const labels = history.map(group =>
    `${group.year}/${group.month}/${group.day}`)
    .reverse();

  // format all of the data and reverse them
  const data = history.map(group =>
    group.completedExerciseSets
      .reduce((max, curr) => (curr.weight ?? 0) > max ? curr.weight : max, 0))
    .reverse();

  return [labels, data];
}

const MaxWeightChart = ({ exercise, exerciseHistory }) => {
  const [chartLabels, chartData] = getChartDataPoints(exerciseHistory);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: `Max Weight (${exercise.name})`,
      },
    },
  };

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `Max Weight (${exercise.name})`,
        data: chartData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        spanGaps: true
      },
    ],
  };

  if (exerciseHistory.length === 0) {
    return <div className="container fs-3 mt-3">No history to plot</div>
  }

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default MaxWeightChart;