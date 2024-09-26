import React from 'react';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import Timer from "./ui/timer";
import sululogo from '@/assets/sulu.svg';
import Judgelogo from '@/assets/judge.svg';

const QuesNavbar: React.FC = () => {
  const path = usePathname();

  return (
    <div className="border-b-2 border-cream flex flex-row w-full h-[14vh] justify-around items-center bg-black">
      <div>
        {path !== '/dashboard' && <Timer />}
      </div>
      <div className="text-6xl relative">
        <span className="text-cream mr-8 s-sling">COOK</span>
        <span className="text-accent mr-8 s-sling">OFF</span>
        <span className="text-cream s-sling">9.0</span>
        <div className="absolute  right-0 flex items-center">
          <span className="text-lg text-[#FFFFFF] mr-1 strait-regular">Powered by</span>
          <Image src={Judgelogo} alt="Judge" width={60} height={60} style={{ marginTop: '3px' }} /> 
          <span className="text-lg text-[#FFFFFF] mx-1 strait-regular">and</span>
          <Image src={sululogo} alt="Sulu" width={60} height={60} style={{ marginTop: '-2px' }} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default QuesNavbar;