import { me } from "@/api/me";
import { type dashboard, type profileData } from "@/schemas/api";
import { Expand } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./button";

export default function Component({
  setProfile,
}: {
  setProfile: Dispatch<SetStateAction<profileData | undefined>>;
}) {
  const [data, setData] = useState<dashboard>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await me();
        setData(data);
        setProfile({
          username: data.username,
          round: data.round,
          score: data.score,
        });
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    void fetchData();
  }, [setProfile]);

  if (loading)
    return (
      <div className="s-sling m-auto flex items-center justify-center text-4xl font-bold text-[#B7AB98]">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="s-sling m-auto flex items-center justify-center text-4xl font-bold text-[#B7AB98]">
        Error 🥲
      </div>
    );

  return (
    <>
      {data && Object.keys(data.submissions).length > 0 ? (
        <div className="roboto flex grow flex-col gap-6 font-sans">
          {Object.keys(data.submissions).map((roundKey, i) => {
            const roundSubmissions = data.submissions[roundKey];
            return (
              <div
                key={i}
                className="h-full flex-grow overflow-auto rounded-lg bg-[#2C2C2C] p-6 pt-0 shadow-lg"
              >
                <div className="sticky top-0 -mx-6 px-6 pt-6 text-white backdrop-blur">
                  <h2 className="font-mono text-3xl font-bold tracking-wider text-[#F14A16]">
                    ROUND {roundKey}
                  </h2>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                  {roundSubmissions?.map((problem, j) => (
                    <div
                      key={j}
                      className="grid grid-cols-12 gap-4 rounded-md bg-[#1F1F1F] px-6 py-4 shadow-md transition-shadow duration-200 hover:drop-shadow-lg"
                    >
                      <div className="col-span-8">
                        <p className="text-md font-mono text-[#F14A16]">
                          {problem.title}
                        </p>
                        <p className="text-md text-[#B7AB98]">
                          {problem.description &&
                          problem.description.length > 50
                            ? `${problem.description.substring(0, 50)}...`
                            : problem.description}
                        </p>
                      </div>

                      <div className="text-md col-span-4 flex items-center text-[#B7AB98]">
                        Your Score is: &nbsp;
                        <span className="text-[#F14A16]">
                          {Math.round(problem.score * 100) / 100 +
                            "/" +
                            problem.max_score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="s-sling m-auto flex items-center justify-center text-4xl font-bold text-[#B7AB98]">
          {data?.round ? "No submissions yet" : "Event not started yet"}
        </div>
      )}
    </>
  );
}
