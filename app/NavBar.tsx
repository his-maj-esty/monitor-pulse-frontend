import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <div className="fixed top-0 flex justify-between px-5 py-3 w-full backdrop-blur-lg border-b-2 border-teal-300 z-10">
      <Link
        className="flex items-center bg-gradient-to-l from-teal-900 from-20% to-teal-600 bg-clip-text text-transparent font-bold"
        href={"/"}
      >
        MonitorPulse
      </Link>
      <div className="flex items-center  space-x-5 text-teal-200 font-semibold">
        <Link
          href={"/websites"}
          className="hover:text-teal-100 transition duration-150"
        >
          Websites
        </Link>
        <Link
          href={"/register"}
          className="hover:text-teal-100 transition duration-150"
        >
          Register
        </Link>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
