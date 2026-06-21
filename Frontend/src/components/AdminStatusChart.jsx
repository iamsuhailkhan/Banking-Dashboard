import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminStatusChart({ transactions }) {
  const completed = transactions.filter((t) => t.status === "Completed").length;
  const pending = transactions.filter((t) => t.status === "Pending").length;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["#22c55e", "#f59e0b"],
      },
    ],
  };

  return <Pie data={data} />;
}
