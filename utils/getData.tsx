import { StatsState, WebsiteState } from "@/recoil-states/website";
import { useRecoilValue, useSetRecoilState } from "recoil";


export function getTodayData() {
    const websiteState = useRecoilValue(WebsiteState);
    const setStatsState = useSetRecoilState(StatsState);
    console.log("yes")
    const todayDate = new Date();
    console.log(todayDate.getDate());   
    console.log(websiteState);
}

export function getYesterdayData() {
    
}

export function getMonthlyData() {
    
}

export function getYearlyData() {
    
}