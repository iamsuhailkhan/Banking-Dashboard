import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminUserChart({ transactions }) {
  const userCounts = transactions.reduce((acc, tx) => {
    acc[tx.userId] = (acc[tx.userId] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(userCounts),
    datasets: [
      {
        label: "Transactions per User",
        data: Object.values(userCounts),
        backgroundColor: "#2563eb",
      },
    ],
  };

  return <Bar data={data} />;
}
