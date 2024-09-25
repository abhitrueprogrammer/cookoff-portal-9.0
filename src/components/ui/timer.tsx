"use client";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [timeLeft, setTimeLeft] = useState<TimeCount>(getTimeLeft(expiryTime));

  useEffect(() => {
    if (pathname === "/dashboard") {
      setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
      return;
    } else {
      const interval = setInterval(() => {
        setTimeLeft(getTimeLeft(expiryTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expiryTime]);

  return (
    <div className="m-4 border-2 border-cream p-2 text-center text-accent">
      <h1 className="w-[100px] text-xl font-bold">{`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</h1>
    </div>
  );
};

export default Timer;
