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
import { da, faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: false,
//       text: "Max Weight",
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.number.float({ min: 20, max: 30 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Max Weight',
//       data: labels.map(() => faker.number.float({ min: 20, max: 30 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

const getChartDataPoints = (history) => {
  console.log("History", history)
  // get all of the dates
  const labels = history.map(group =>
    `${group.year}/${group.month}/${group.day}`)
    .reverse();

  const data = history.map(group =>
    group.completedExerciseSets
      .reduce((max, curr) => (curr.weight ?? 0) > max ? curr.weight : max, 0))
      .reverse();

  console.log('Max weight', data)

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
      text: "Max Weight",
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

export default MaxWeightChart;