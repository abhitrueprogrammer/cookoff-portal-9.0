"use client";

import Judgelogo from "@/assets/judge.svg";
import musclemind from "@/assets/musclemind.svg";
import sululogo from "@/assets/sulu.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Timer from "./ui/timer";

export default function QuesNavbar({
  setTimeOver,
}: {
  setTimeOver: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const path = usePathname();
  const router = useRouter();

  const handleendtest = () => {
    localStorage.clear();
    router.push("/test-complete");
  };

  return (
    <div className="flex h-[17vh] w-screen flex-row items-center justify-between border-b-2 border-cream bg-black px-10 2xl:h-[14vh]">
      <div>{path !== "/kitchen" && <Timer setTimeOver={setTimeOver} />}</div>
      <div className="flex w-full flex-col items-center">
        <div className="flex text-center items-start justify-start ">
          <span className="s-sling mr-8 text-7xl text-cream">COOK</span>
          <span className="s-sling mr-8 text-7xl text-accent">OFF</span>
          <span className="s-sling text-sm text-cream">INTERNAL</span>
        </div>
      </div>
      <div>
        <button
          onClick={handleendtest}
          className="s-sling whitespace-nowrap rounded-md bg-dark2 p-2 px-10 text-lg text-cream hover:bg-accent hover:text-black"
        >
          End Test
        </button>
      </div>

      <div></div>
    </div>
  );
}
