import React, { useEffect, useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import { gsap } from "gsap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ExpenseChart({ transactions }) {
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.from(chartRef.current, { opacity: 0, y: 50, duration: 1 });
  }, []);

  const chartData = useMemo(() => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
          {
            label: "Expenses",
            data: [1200, 900, 1400, 800],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.2)",
            tension: 0.3,
          },
        ],
      };
    }

    const monthlyTotals = transactions.reduce((acc, tx) => {
      const date = new Date(tx.date);
      if (Number.isNaN(date.getTime())) return acc;
      const monthKey = date.toLocaleString("default", { month: "short", year: "numeric" });
      acc[monthKey] = (acc[monthKey] || 0) + Number(tx.amount || 0);
      return acc;
    }, {});

    const labels = Object.keys(monthlyTotals).sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");
      return new Date(`${monthA} 1, ${yearA}`) - new Date(`${monthB} 1, ${yearB}`);
    });

    return {
      labels,
      datasets: [
        {
          label: "Expenses",
          data: labels.map((label) => monthlyTotals[label]),
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.2)",
          tension: 0.3,
        },
      ],
    };
  }, [transactions]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#334155",
        },
      },
      y: {
        ticks: {
          color: "#334155",
        },
      },
    },
  };

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
