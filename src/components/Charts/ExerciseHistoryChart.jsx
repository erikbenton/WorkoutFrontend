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

const getDataForChart = (history, getGroupDataValue) => {
  const numOfDays = 14;
  const latestEntry = history[0];
  const latestDate = new Date(latestEntry.year, latestEntry.month - 1, latestEntry.day);
  const timePeriod = 1000 * 60 * 60 * 24 * numOfDays;
  const startDate = latestDate - timePeriod;

  const dateToHistory = {};
  for (let group of history) {
    const key = `${group.year}-${group.month - 1}-${group.day}`;
    const dateLabel = `${group.month}/${group.day}`;
    dateToHistory[key] = [dateLabel, getGroupDataValue(group)]
  }

  const chartData = [];
  for (let i = 0; i <= numOfDays; i++) {
    const day = new Date(startDate + i * (1000 * 60 * 60 * 24));
    const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
    const dataPoint = dateToHistory[key] ?? [null, null];
    chartData.push(dataPoint);
  }

  return chartData;
};

const ExerciseHistoryChart = ({ label, exerciseHistory, getGroupDataValue }) => {

  if (exerciseHistory.length === 0) {
    return <div className="container fs-3 mt-3">No history to plot</div>
  }

  const chartData = getDataForChart(exerciseHistory, getGroupDataValue);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: label,
      },
    },
  };

  const data = {
    datasets: [
      {
        label,
        data: chartData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        spanGaps: true
      },
    ],
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default ExerciseHistoryChart;