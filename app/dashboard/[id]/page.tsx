import axios from "axios";
import "dotenv/config";
import LineChart from "./LineChart";
import { Website, timeStats } from "@/typings";
import PieChartWithCustomizedLabel from "./PieChart";
import StatsBar from "./StatsBar";

const api = axios.create({
  baseURL: `${process.env.SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

async function page({ params: { id } }: {params: {id: string}}) {
  const res = await api.post(`/monitor/getDetails`, { id: id });
  const details: { stats: timeStats[] } & Website = res.data.response;

  console.log(details);
  return (
    <div className="h-full">
      <div className="text-3xl font-semi text-center font-medium my-5 text-teal-200">
        {details.name}
      </div>
      <div className="flex justify-center">
        <StatsBar data={details}></StatsBar>
      </div>
      <div className="flex flex-col md:flex-row justify-between md:px-7 mt-10">
        <div className="p-2 border-2 border-teal-200 w-fit rounded-2xl backdrop-blur-lg bg-teal-200">
          <LineChart defaultData={details} />
        </div>
        <div className="p-2 border-2 border-teal-200 w-fit rounded-2xl backdrop-blur-lg bg-teal-200">
          <div className="text-center text-pretty">
            <span className="text-[#06b6d4]">Uptime</span> vs{" "}
            <span className="text-[#3730a3]">Downtime</span>
          </div>
          <PieChartWithCustomizedLabel />
        </div>
      </div>
    </div>
  );
}

export default page;
