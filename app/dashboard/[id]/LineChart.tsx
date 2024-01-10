"use client";
import { Website, timeStats } from "@/typings";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { StatsLabel, StatsState, UpVsDownState } from "@/recoil-states/website";

function calculateUD({ stats }: {stats: timeStats[]}) {
  console.log("stats: ", stats);
  
  const uptimes = stats.reduce((accumulator, { status }) => {
    console.log("accumulator:", accumulator, "status:", status);

    if (status === 1) {
      return accumulator + 1;  // Increment accumulator if status is 1
    } else {
      return accumulator;  // No change to accumulator if status is not 1
    }
  }, 0);

  const downtimes = stats.reduce((accumulator, { status }) => {
    if (status === 0) {
      return accumulator + 1;  // Increment accumulator if status is 0
    } else {
      return accumulator;  // No change to accumulator if status is not 0
    }
  }, 0);

  console.log("uptimes", uptimes, "downtimes", downtimes);

  return { uptimes: uptimes, downtimes: downtimes };
}

function LineChartComponent({
  defaultData,
}: {
  defaultData: { stats: timeStats[] } & Website;
}) {
  const [data] = useRecoilState(StatsState);
  const setUDState = useSetRecoilState(UpVsDownState);
  console.log(defaultData);

  const todayDate = new Date().getDate();

  let x: any;
  let y: any;

  function insertXlabel(): string | undefined {
    if (!data) {
      return "Time (hour.minute) --->";
    } else {
      if (data.label === StatsLabel.monthly) {
        return "Dates (date.month) --->";
      } else if (data.label === StatsLabel.yearly) {
        return "Months (month.year) --->";
      } else if (data.label === StatsLabel.yesterday) {
        return "Time (hour.min) --->";
      }
      else {
        return "Time (hour.min) --->"
      }
    }
  }

  if (!data || data.label === StatsLabel.today) {

    const todayStats = defaultData.stats.filter((stat) => (new Date(stat.timestamp)).getDate() === todayDate);
    x = todayStats
      .map(({ timestamp }) => {
        const dateObj = new Date(timestamp);
        const date = dateObj.getDate();
        console.log("date:", date, "today date:", todayDate);
        if (date === todayDate) {
          const hour = dateObj.getHours();
          const minute = dateObj.getMinutes();
          return `${hour}.${minute}`;
        }
      })
      .filter((x) => x !== undefined);

    y = todayStats
      .map(({ status, timestamp }) => {
        const dateObj = new Date(timestamp);
        const date = dateObj.getDate();
        if (date === todayDate) {
          if (status === 0) {
            return 1;
          } else {
            return 0;
          }
        }
      })
      .filter((y) => y !== undefined);

    console.log("default x: ", x, " and default y: ", y);

    const { uptimes, downtimes } = calculateUD({ stats: todayStats });
    setUDState({ uptime: uptimes, downtime: downtimes });
  } else {
    if (data.label === StatsLabel.yesterday) {
      x = data.stats
        .map(({ timestamp, status }) => {
          const dateObj = new Date(timestamp);
          const date = dateObj.getDate();
          if (date === todayDate - 1) {
            const hour = dateObj.getHours();
            const minute = dateObj.getMinutes();
            return `${hour}.${minute}`;
          }
        })
        .filter((x) => x !== undefined);

      y = data.stats
        .map(({ status, timestamp }) => {
          const dateObj = new Date(timestamp);
          const date = dateObj.getDate();
          if (date === todayDate - 1) {
            if (status === 1) return 0;
            else return 1;
          }
        })
        .filter((y) => y !== undefined);

      const { uptimes, downtimes } = calculateUD({ stats: data.stats });
      setUDState({ uptime: uptimes, downtime: downtimes });

      console.log("yesterday x:", x, "y:", y);
      console.log("data at yesterday : ", data);
    } else if (data.label === StatsLabel.monthly) {
      const dates = data.stats.map((stat) => {
        const dateObj = new Date(stat.timestamp);
        return `${dateObj.getDate()}.${dateObj.getMonth() + 1}`;
      });

      //@ts-ignore
      const uniqueDates = [...new Set(dates)];
      x = uniqueDates;
      const tempArr = x.map(() => {
        return 0;
      });

      data.stats.forEach((stat) => {
        if (stat.status === 0) {
          const dateObj = new Date(stat.timestamp);
          const i = x.indexOf(`${dateObj.getDate()}.${dateObj.getMonth() + 1}`);
          tempArr[i] += 1;
        }
      });
      y = tempArr;
      const { uptimes, downtimes } = calculateUD({ stats: data.stats });
      setUDState({ uptime: uptimes, downtime: downtimes });

      console.log("x: monthly", x, " and y: monthly", y);
    } else if (data.label === StatsLabel.yearly) {
      const months = data.stats.map((stat) => {
        const dateObj = new Date(stat.timestamp);
        return `${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
      });

      //@ts-ignore

      const uniqueMonths = [...new Set(months)];
      x = uniqueMonths;
      const tempArr = x.map(() => {
        return 0;
      });

      data.stats.forEach((stat) => {
        if (stat.status === 0) {
          const dateObj = new Date(stat.timestamp);
          const i = x.indexOf(
            `${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`
          );
          tempArr[i] += 1;
        }
      });

      y = tempArr;
      const { uptimes, downtimes } = calculateUD({ stats: data.stats });
      setUDState({ uptime: uptimes, downtime: downtimes });
      console.log("x: yearly", x, " and y: yearly", y);
    }
  }

  return (
    <LineChart
      xAxis={[{ label: insertXlabel(), data: x }]}
      series={[
        {
          label: "Number of downtimes",
          curve: "linear",
          data: y,
        },
      ]}
      width={600}
      height={400}
    />
  );
}

export default LineChartComponent;
