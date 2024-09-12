import React from 'react'

export default function Component() {
  return (
    <div className="bg-black text-white font-sans relative" style={{ width: '957px', height: '321px' }}>
      <div className="absolute top-0 left-0 w-full z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="955" height="60" viewBox="0 0 955 60" fill="none">
          <path d="M52.5 0H955V60L0 59V51L52.5 0Z" fill="#F14A16"/>
        </svg>
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 h-[60px]">
          <h1 className="text-black text-5xl font-bold tracking-wider">ROUND 1</h1>
          <button className="text-white text-sm">View Submissions &gt;</button>
        </div>
      </div>
      
      <svg width="957" height="321" viewBox="0 0 957 321" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
        <path d="M0.5 320.5V51.7099L52.7043 0.5H956.5V269.291L904.794 320.5H477.796H0.5Z" fill="#202020" stroke="#B7AB98"/>
      </svg>
      
      <div className="absolute top-[72px] left-6 right-[200px] flex flex-col gap-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex justify-between items-center bg-[#2C2C2C] rounded-md py-3 px-4">
            <div className="text-lg text-[#B7AB98]">1. Maximise profit as a Salesman...</div>
            <div className="text-4xl font-bold text-white">8<span className="text-2xl">/10</span></div>
          </div>
        ))}
      </div>
      
      <div className="absolute right-6 bottom-6 flex flex-col items-end gap-4">
        <div className="flex flex-col items-center justify-center bg-transparent border-2 border-[#F14A16] rounded-3xl px-6 py-2 opacity-80">
          <div className="text-sm">Score:</div>
          <div className="text-5xl font-bold">80</div>
        </div>
        
        <div className="bg-[#484848] rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-3xl font-bold">8</span>
          <span className="text-sm">Solved</span>
        </div>
      </div>
    </div>
  )
}