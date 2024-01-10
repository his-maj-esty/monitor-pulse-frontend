"use client";
import {
  StatsLabel,
  StatsState,
  UpVsDownState,
  WebsiteState,
} from "@/recoil-states/website";
import { Website, timeStats } from "@/typings";
import {
  getMonthlyData,
  getTodayData,
  getYearlyData,
  getYesterdayData,
} from "@/utils/getData";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function StatsBar({
  data: { stats },
}: {
  data: { stats: timeStats[] } & Website;
}) {
  const [activeButton, setActiveButton] = useState(StatsLabel.today);
  const [state, setStatsState] = useRecoilState(StatsState);
  const date = new Date();
  const todayDate = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  function getTodayData() {
    const todayStats = stats.filter(({ timestamp, status, ownerNotified }) => {
      if (new Date(timestamp).getDate() === todayDate) {
        return { timestamp, status, ownerNotified };
      }
    });

    setStatsState({ label: StatsLabel.today, stats: todayStats });
    setActiveButton(StatsLabel.today);
    console.log("today's stats", todayStats);
  }

  function getYesterdayData() {
    const yesterdayStats = stats.filter(
      ({ timestamp, status, ownerNotified }) => {
        if (new Date(timestamp).getDate() === todayDate - 1) {
          return { timestamp, status, ownerNotified };
        }
      }
    );

    setStatsState({ label: StatsLabel.yesterday, stats: yesterdayStats });
    setActiveButton(StatsLabel.yesterday);

    console.log("yesterday's stats", yesterdayStats);
  }

  function getMonthlyData() {
    const monthlyStats = stats.filter(
      ({ timestamp, status, ownerNotified }) => {
        if (new Date(timestamp).getMonth() === currentMonth) {
          return { timestamp, status, ownerNotified };
        }
      }
    );

    setStatsState({ label: StatsLabel.monthly, stats: monthlyStats });
    setActiveButton(StatsLabel.monthly);

    console.log("monthly's stats", monthlyStats);
  }

  function getYearlyData() {
    const yearlyData = stats.filter(({ timestamp, status, ownerNotified }) => {
      if (new Date(timestamp).getFullYear() === currentYear) {
        return { timestamp, status, ownerNotified };
      }
    });

    setStatsState({ label: StatsLabel.yearly, stats: yearlyData });
    setActiveButton(StatsLabel.yearly);

    console.log("monthly's stats", yearlyData);
  }

  return (
    <div className="rounded-3xl border w-fit bg-teal-200">
      <div className="flex space-x-4 px-4 py-2 text-teal-700">
        <button
          className={`rounded-3xl px-4 py-1 hover:text-teal-200 hover:bg-teal-700 transition duration-150 ${
            activeButton === StatsLabel.today ? "text-teal-200 bg-teal-700" : ""
          }`}
          onClick={() => getTodayData()}
        >
          Today
        </button>
        <button
          className={`rounded-3xl px-4 py-1 hover:text-teal-200 hover:bg-teal-700 transition duration-150 ${
            activeButton === StatsLabel.yesterday
              ? "text-teal-200 bg-teal-700"
              : ""
          }`}
          onClick={() => getYesterdayData()}
        >
          Yesterday
        </button>
        <button
          className={`rounded-3xl px-4 py-1 hover:text-teal-200 hover:bg-teal-700 transition duration-150 ${
            activeButton === StatsLabel.monthly
              ? "text-teal-200 bg-teal-700"
              : ""
          }`}
          onClick={() => getMonthlyData()}
        >
          Monthly
        </button>
        <button
          className={`rounded-3xl px-4 py-1 hover:text-teal-200 hover:bg-teal-700 transition duration-150 ${
            activeButton === StatsLabel.yearly
              ? "text-teal-200 bg-teal-700"
              : ""
          }`}
          onClick={() => getYearlyData()}
        >
          Yearly
        </button>
      </div>
    </div>
  );
}

export default StatsBar;
