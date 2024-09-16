import { RoundBackgroundSVG, RoundHeaderSVG } from '../../assests/svgPaths';

// Simulated API response object
const roundData = {
  roundNumber: 1,
  problems: [
    { id: 1, title: "Maximise profit as a Salesman...", score: 8, maxScore: 10 },
    { id: 2, title: "Optimize warehouse logistics...", score: 7, maxScore: 10 },
    { id: 3, title: "Implement efficient routing...", score: 9, maxScore: 10 },
  ],
  totalScore: 80,
  solvedProblems: 8,
};

export default function Component() {
  return (
    <div className="text-white font-sans relative ml-16 roboto" style={{ width: '60vw', height: '321px' }}>
      <div className="absolute top-0 left-0 w-full z-10" style={{ width: '60vw' }}>
        <RoundHeaderSVG />
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 h-[60px]">
          <h1 className="text-[#F14A16] text-5xl font-bold tracking-wider px-5 s-sling">ROUND {roundData.roundNumber}</h1>
          <button className="text-viewSubmission text-lg">View Submissions &gt;</button>
        </div>
      </div>

      <RoundBackgroundSVG className="absolute top-0 left-0" style={{ width: '60vw' }} />

      <div className="absolute top-[72px] left-6 right-[200px] flex flex-col gap-4">
        {roundData.problems.map((problem) => (
          <div key={problem.id} className="flex justify-between items-center bg-[#2C2C2C] rounded-md py-3 px-4">
            <div className="text-lg text-[#B7AB98]">{problem.id}. {problem.title}</div>
            <div className="text-4xl font-bold text-white">{problem.score}<span className="text-2xl">/{problem.maxScore}</span></div>
          </div>
        ))}
      </div>

      <div className="absolute right-6 bottom-6 flex flex-col items-end gap-8 mr-4 mb-6">
        <div className="flex flex-col items-center justify-center bg-transparent border-2 border-[#F14A16] rounded-3xl px-6 py-2 opacity-80">
          <div className="text-sm">Score:</div>
          <div className="text-5xl font-bold">{roundData.totalScore}</div>
        </div>

        <div className="bg-[#484848] rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-3xl font-bold">{roundData.solvedProblems}</span>
          <span className="text-sm">Solved</span>
        </div>
      </div>
    </div>
  )
}