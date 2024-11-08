// src/components/admin/students/StudentsPieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentsPieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.grade),
    datasets: [
      {
        label: "Student Distribution",
        data: data.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default StudentsPieChart;
