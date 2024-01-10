import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="text-center py-12 text-teal-900 flex flex-col space-y-5">
        <h1 className="text-4xl bg-gradient-to-l from-teal-950 from-20% to-teal-400 bg-clip-text text-transparent font-bold">
          MonitorPulse{" "}
        </h1>{" "}
        <p className="text-lg text-teal-200">
          Your Gateway to Continuous Website Monitoring
        </p>
        <p className="mt-4 text-teal-200">
          Experience the power of Monitor Pulse - Your Website's Guardian!
        </p>
        <div className="flex justify-center">
          <div>
            <SignedIn>
              <Link
                href={"/register"}
                className="inline-block px-4 py-2 bg-gray-800 text-white no-underline rounded-md transition duration-300 ease-in-out hover:bg-gray-700"
              >
                Register
              </Link>
            </SignedIn>
            <SignedOut>
              <div className="inline-block px-4 py-2 bg-gray-800 text-white no-underline rounded-md transition duration-300 ease-in-out hover:bg-gray-700">
                <SignInButton />
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
      <section className="p-8 rounded-lg shadow-md mt-15 space-y-10 mx-10">
        <div>
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">
            Why Choose Monitor Pulse?
          </h2>
          <p className="text-teal-200 leading-6 mb-6">
            Monitor Pulse is your all-in-one solution for monitoring your
            website's health and performance. Here are the key features that
            make us stand out:
          </p>

          <ul className="text-teal-200 leading-6 mb-6">
            <li>
              <strong className="font-bold">Automatic Checks:</strong> We
              perform website status checks every 30 minutes, ensuring real-time
              updates on its performance.
            </li>
            <li>
              <strong className="font-bold">Email Notifications:</strong>{" "}
              Receive instant email notifications if any issues are detected,
              allowing you to take prompt action.
            </li>
            <li>
              <strong className="font-bold">Comprehensive Dashboard:</strong>{" "}
              Access an intuitive dashboard to monitor downtimes by day, month,
              and year, providing valuable insights into your website's
              reliability.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Get Started Today
          </h2>
          <p className="text-teal-200 leading-6 mb-6">
            Don't let website downtime impact your business. Sign up for Monitor
            Pulse and take control of your online presence.
          </p>
          <div className="flex justify-center">
            <div>
              <SignedIn>
                <Link href={"/register"}>
                  <div className="inline-block px-4 py-2 bg-gray-800 text-white no-underline rounded-md transition duration-300 ease-in-out hover:bg-gray-700">
                    {" "}
                    Register
                  </div>{" "}
                </Link>
              </SignedIn>
              <SignedOut>
                <div className="inline-block px-4 py-2 bg-gray-800 text-white no-underline rounded-md transition duration-300 ease-in-out hover:bg-gray-700">
                  <SignInButton />
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
