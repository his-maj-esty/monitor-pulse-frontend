"use client";
import * as React from "react";
import { DefaultizedPieValueType } from "@mui/x-charts";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useRecoilValue } from "recoil";
import { UpVsDownState } from "@/recoil-states/website";

const sizing = {
  margin: { right: 5 },
  width: 600,
  height: 400,
  legend: { hidden: true },
};

export default function PieChartWithCustomizedLabel() {

    const { uptime, downtime } = useRecoilValue(UpVsDownState);
  const data = [
    { label: "Uptime", value: uptime, color: "#06b6d4" },
    { label: "Downtime", value: downtime, color: "#3730a3" },
  ];

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
