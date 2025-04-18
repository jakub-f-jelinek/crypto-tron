"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CoinData } from "@/app/utils/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CahrtProps {
  data: CoinData[];
}

export const Chart: React.FC<CahrtProps> = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;
  const labels = hasData ? data.map((item) => item.name) : ["Žádná data"];
  const values = hasData ? data.map((item) => item.totalValue) : [1];
  const colors = ["#1c2544", "#2b3761", "#0a1023", "#070c1a"];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Hodnoty",
        data: values,
        backgroundColor: hasData ? colors.slice(0, values.length) : ["#5f87a8"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};
