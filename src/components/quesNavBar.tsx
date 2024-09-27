import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Timer from "./ui/timer";
import sululogo from "@/assets/sulu.svg";
import Judgelogo from "@/assets/judge.svg";

const QuesNavbar: React.FC = () => {
  const path = usePathname();

  return (
    <div className="flex h-[17vh] 2xl:h-[14vh] w-full flex-row items-center justify-around border-b-2 border-cream bg-black">
      <div>{path !== "/dashboard" && <Timer />}</div>
      <div className="relative text-6xl">
        <span className="s-sling mr-8 text-cream">COOK</span>
        <span className="s-sling mr-8 text-accent">OFF</span>
        <span className="s-sling text-cream">9.0</span>
        <div className="absolute right-0 flex items-center">
          <span className="strait-regular mr-1 text-lg text-[#FFFFFF]">
            Powered by
          </span>
          <Image
            src={Judgelogo as HTMLImageElement}
            alt="Judge"
            width={60}
            height={60}
            style={{ marginTop: "3px" }}
          />
          <span className="strait-regular mx-1 text-lg text-[#FFFFFF]">
            and
          </span>
          <Image
            src={sululogo as HTMLImageElement}
            alt="Sulu"
            width={60}
            height={60}
            style={{ marginTop: "-2px" }}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default QuesNavbar;
