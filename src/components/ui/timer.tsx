"use client";

import { useEffect, useState } from "react";

interface TimeCount {
  hours: string;
  minutes: string;
  seconds: string;
}

const getTimeLeft = (expiry: number): TimeCount => {
  let hours = "00";
  let minutes = "00";
  let seconds = "00";

  const difference = expiry - new Date().getTime();

  if (difference <= 0) {
    return { hours, minutes, seconds };
  }

  const hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const mnt = Math.floor((difference / (1000 * 60)) % 60);
  const snd = Math.floor((difference / 1000) % 60);

  hours = hrs < 10 ? `0${hrs}` : hrs.toString();
  minutes = mnt < 10 ? `0${mnt}` : mnt.toString();
  seconds = snd < 10 ? `0${snd}` : snd.toString();

  return { hours, minutes, seconds };
};

const Timer = () => {
  // Put time in seconds
  const timerDuration = 1 * 25 * 60;

  const [expiryTime] = useState(new Date().getTime() + timerDuration * 1000);

  const [timeLeft, setTimeLeft] = useState<TimeCount>(getTimeLeft(expiryTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryTime));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [expiryTime]);

  return (
    <div style={{ padding: "8px",margin: "15px",color:'#F14A16', border: '2px solid #B7AB98', textAlign: "center" }}>
      <h1 className="font-bold w-[100px] text-xl">{`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</h1>
    </div>
  );
};

export default Timer;
