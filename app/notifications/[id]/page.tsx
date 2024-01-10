"use client";
import axios from "axios";
import OptOut from "./OptOut";
import "dotenv/config";
import OptIn from "./OptIn";
import { useRecoilState } from "recoil";
import { NotificationState, isSubscribedState } from "@/recoil-states/website";
import { useEffect } from "react";

const api = axios.create({
  baseURL: `${process.env.SERVER_URL!}`,
  headers: {
    "Content-Type": "application/json",
  },
});

function page({ params: { id } }: { params: { id: string } }) {
  const [isSubscribed, setIsSubscribed] = useRecoilState(isSubscribedState);
  const [notifications, setNotifications] = useRecoilState(NotificationState);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.post(
        "http://localhost:3010/notification/getNotifications",
        {
          id: id,
        }
      );

      const isSubscribedResponse = await axios.post(
        "http://localhost:3010/notification/isSubscribed",
        {
          id: id,
        }
      );
      setIsSubscribed(isSubscribedResponse.data.responseData);
      setNotifications(res.data.responseData.notifications);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="text-center font-bold text-xl pb-6 text-teal-200">
        Notifications Sent (by mail)
      </div>
      {notifications ? (
        notifications.map(({ downtimeAt, sentAt }) => {
          return (
            <div className="bg-teal-200 flex justify-between p-6 rounded-lg mb-4 mx-10">
              <div>
                <div className="font-bold">Downtime at</div>
                <div className="text-gray-600">
                  {downtimeAt
                    .split("\n")
                    .filter((e) => e)
                    .map((time) => {
                      const dateObj = new Date(time);
                      return (
                        <div>
                          <span className="font-semibold"> Date : </span>
                          {`${dateObj.getDate()}/${
                            dateObj.getMonth() + 1
                          }/${dateObj.getFullYear()}`}{" "}
                          & <span className="font-semibold"> Time : </span>
                          {`${dateObj.getHours()}:${dateObj.getMinutes()}`}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div>
                <span className=" font-bold">Sent At</span>{" "}
                <div className="text-gray-600">
                  <span className="font-semibold"> Date : </span>
                  {`${new Date(sentAt).getDate()}/${
                    new Date(sentAt).getMonth() + 1
                  }/${new Date(sentAt).getFullYear()}`}{" "}
                  & <span className="font-semibold"> Time : </span>
                  {`${new Date(sentAt).getHours()}:${new Date(
                    sentAt
                  ).getMinutes()}`}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>You don't have any notifications as of now</div>
      )}
      {isSubscribed ? <OptOut /> : <OptIn />}
    </>
  );
}

export default page;
