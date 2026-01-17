import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

export default function ChartCard() {
  const data = {
    labels: ["10AM", "12PM", "2PM", "4PM", "6PM"],
    datasets: [
      {
        label: "Motion Events",
        data: [3, 7, 4, 9, 5],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="card">
      <p className="text-muted">Activity Trend</p>
      <Line data={data} />
    </div>
  );
}
