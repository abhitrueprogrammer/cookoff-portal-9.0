import React from "react";
import Image from "next/image";
import gCheck from "@/assets/images/gCheck.png";
import gEye from "@/assets/images/gEye.png";
import rCross from "@/assets/images/rCross.png";
import rEye from "@/assets/images/rEye.png";

type TestCompProps = {
  isPassed: boolean;
  num: number;
  isClicked: boolean;
};

export default function TestComp({ isPassed, num, isClicked }: TestCompProps) {
  return (
    <div
      className={`mx-6 my-2 flex cursor-pointer items-center justify-between rounded-lg border-2 bg-black px-4 py-3 text-center ${isClicked && isPassed ? "border-green2" : isClicked && !isPassed ? "border-accent" : "border-dark"}`}
    >
      <Image
        className="w-[10%]"
        src={isPassed ? gCheck : rCross}
        alt="green check"
        width={100}
        height={100}
      />
      <p className="mx-1 text-base">Test Case {num + 1}</p>

      <Image
        className="w-[10%]"
        src={isPassed ? gEye : rEye}
        alt="green check"
        width={100}
        height={100}
      />
    </div>
  );
}
