import { Website } from "@/typings";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React from "react";

async function page() {
  const user = await currentUser();
  const res = await axios.get(
    "http://localhost:3010/monitor/getAllWebsites/" + user?.id
  );
  const websites: Website[] = res.data.data;
  return (
    <div className="min-h-screen">
      <div className="text-center font-bold text-2xl pb-6 text-teal-200">
        Websites
      </div>
      <div className="flex flex-col space-y-8 mx-7">
        {websites.map((website) => {
          return (
            <div className="flex justify-between bg-teal-200 p-5 rounded-2xl items-center">
              <div className="text-gray-700 text-lg font-medium">{website.name}</div>
              <div className="flex space-x-5">
                <Link
                  className="inline-block px-4 py-2 bg-gray-800 text-white no-underline rounded-md transition duration-300 ease-in-out hover:bg-gray-700"
                  href={`/dashboard/${website.id}`}
                >
                  DASHBOARD
                </Link>
                <Link
                  className="inline-block px-4 py-2 bg-gray-800 text-white no-underline rounded-md transition duration-300 ease-in-out hover:bg-gray-700"
                  href={`/notifications/${website.id}`}
                >
                  Notifications
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
