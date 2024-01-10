"use client";
import axios from "axios";
import React, { useState } from "react";
import { auth, currentUser, useUser } from "@clerk/nextjs";
import "dotenv/config"


function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const currentUser = useUser();
  const userId = currentUser.user?.id;
  console.log("userID:", userId);

  async function handleRegister(){
    await axios.post("http://localhost:3010/monitor/add", { websiteURL: url, websiteName: name, websiteEmail: email, userId: userId });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="min-h-screen">
        <div className="text-teal-900 flex justify-center">
          <div className="bg-teal-200 w-content flex flex-col h-fit items-center space-y-7 p-10 mt-10 rounded-2xl">
            <div className="mb-6 font-bold text-xl">Register Your Website</div>
            <div className="flex flex-col space-y-3">
              <div className="text-lg">Website Name</div>
              <div>
                <input
                  className="rounded-lg bg-teal-100 text-teal-800 px-2 py-1"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="text-lg">Website URL</div>
              <div>
                <input
                  type="text"
                  className="rounded-lg bg-teal-100 text-teal-800 px-2 py-1"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-3 pb-5">
              <div className="text-lg">Notifications Email</div>
              <div>
                <input
                  type="text"
                  className="rounded-lg bg-teal-100 text-teal-800 px-2 py-1"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-teal-900 hover:bg-teal-800 transition duration-150 text-white text-center  rounded-b-2xl -mt-7">
          <button className="w-full h-full p-4 pt-9" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
