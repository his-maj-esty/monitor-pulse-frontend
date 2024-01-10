"use client";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "dotenv/config";
import { useRecoilState } from "recoil";
import { isSubscribedState } from "@/recoil-states/website";

const api = axios.create({
  baseURL: "http://localhost:3010",
  headers: {
    "Content-Type": "application/json",
  },
});

function OptIn({ id }: { id: string }) {
  const [isSubscribed, setIsSubscribed] = useRecoilState(isSubscribedState);

  async function handleOptOut() {
    console.log(process.env.SERVER_URL);

    const response = await toast.promise(
      api.post("/notification/subscribe", { id: id }),
      {
        loading: "Opting you in...",
        success: <b>Subscribed from notifications</b>,
        error: <b>Failed to subscribe</b>,
      }
    );
    setIsSubscribed(true);
  }

  return (
    <div className=" flex flex-col space-y-2 p-6 rounded-lg mb-4 border-5 text-teal-200">
      <div className="text-center">You are not receiving notifications. </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleOptOut()}
          className="inline-block px-4 py-2 bg-gray-800 text-white no-underline rounded-md transition duration-300 ease-in-out hover:bg-gray-700"
        >
          Opt In
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default OptIn;
