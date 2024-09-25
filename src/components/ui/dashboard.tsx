import axios from "axios";
import { useEffect, useState } from "react";
import api from "@/api";
import {User,dashboard,Submission,APIResponse} from "@/schemas/api";

export default function Component() {
  const [data, setData] = useState<dashboard>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get<APIResponse>(
          "https://hope.codechefvit.com/me",
        );
        console.log(data);
        setData(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-grow roboto relative ml-16 w-[60vw] font-sans text-white">
      {/* Main Container */}
      <div className="flex-grow left-6 right-6 flex flex-col gap-6">
        {/* Loop through each round */}
        {data &&
          Object.keys(data.submissions).map((roundKey, i) => {
            const roundSubmissions = data.submissions[roundKey];
            return (
              <div
                key={i}
                className="flex-grow relative rounded-lg bg-[#2C2C2C] p-6 pt-0 shadow-lg h-32 overflow-auto"
              >
                {/* Round Header */}
                <div className=" pt-6 sticky top-0 backdrop-blur flex items-center justify-between">
                  <h2 className="font-mono text-3xl font-bold tracking-wider text-[#F14A16]">
                    ROUND {roundKey}
                  </h2>
                </div>

                {/* Questions for the current round */}
                <div className="mt-4 flex flex-col gap-4">
                  {roundSubmissions &&
                    roundSubmissions.map((problem, i) => (
                      <div
                        key={i}
                        className="rounded-md bg-[#1F1F1F] px-6 py-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
                      >
                        <div className="text-md font-mono text-[#F14A16]">
                          {problem.title}
                        </div>

                        {/* Description */}
                        <div className="flex-cols flex gap-10">
                          <p className="text-md text-[#B7AB98]">
                            {problem.description &&
                            problem.description.length > 50
                              ? `${problem.description.substring(0, 50)}...`
                              : problem.description}
                          </p>
                          <div className="text-md text-[#B7AB98]">
                            {"Your Score is:  "+problem.score}/10
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
