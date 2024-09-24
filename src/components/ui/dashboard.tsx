import { RoundBackgroundSVG, RoundHeaderSVG } from "../../assets/svgPaths";

// Simulated API response object
const roundData = {
  roundNumber: 1,
  problems: [
    {
      id: 1,
      title: "Maximise profit as a Salesman...",
      score: 8,
      maxScore: 10,
    },
    { id: 2, title: "Optimize warehouse logistics...", score: 7, maxScore: 10 },
    { id: 3, title: "Implement efficient routing...", score: 9, maxScore: 10 },
  ],
  totalScore: 80,
  solvedProblems: 8,
};

export default function Component() {
  return (
    <div
      className="roboto relative ml-16 font-sans text-white"
      style={{ width: "60vw", height: "321px" }}
    >
      <div
        className="absolute left-0 top-0 z-10 w-full"
        style={{ width: "60vw" }}
      >
        <RoundHeaderSVG />
        <div className="absolute left-0 right-0 top-0 flex h-[60px] items-center justify-between px-6">
          <h1 className="s-sling px-5 text-5xl font-bold tracking-wider text-[#F14A16]">
            ROUND {roundData.roundNumber}
          </h1>
          <button className="text-lg text-viewSubmission">
            View Submissions &gt;
          </button>
        </div>
      </div>

      <RoundBackgroundSVG
        className="absolute left-0 top-0"
        style={{ width: "60vw" }}
      />

      <div className="absolute left-6 right-[200px] top-[72px] flex flex-col gap-4">
        {roundData.problems.map((problem) => (
          <div
            key={problem.id}
            className="flex items-center justify-between rounded-md bg-[#2C2C2C] px-4 py-3"
          >
            <div className="text-lg text-[#B7AB98]">
              {problem.id}. {problem.title}
            </div>
            <div className="text-4xl font-bold text-white">
              {problem.score}
              <span className="text-2xl">/{problem.maxScore}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 mb-6 mr-4 flex flex-col items-end gap-8">
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-[#F14A16] bg-transparent px-6 py-2 opacity-80">
          <div className="text-sm">Score:</div>
          <div className="text-5xl font-bold">{roundData.totalScore}</div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-[#484848] px-4 py-2">
          <span className="text-3xl font-bold">{roundData.solvedProblems}</span>
          <span className="text-sm">Solved</span>
        </div>
      </div>
    </div>
  );
}
