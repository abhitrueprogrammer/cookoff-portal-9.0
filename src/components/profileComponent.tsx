"use client";

import chefhat from "@/assets/images/Chefhat.svg";
import { type profileData } from "@/schemas/api";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { ProfileHeaderSVG } from "../assets/svgPaths";
export default function Component({
  profile,
}: {
  profile: profileData | undefined;
}) {
  const router = useRouter(); // Initialize router

  return (
    <div className="roboto relative my-auto max-h-full">
      {/* Background shape with white border */}
      {/* <ProfileBackgroundSVG className="absolute top-0 left-0 max-h-fit" /> */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Profile header with white border */}
        <div className="relative w-full">
          <ProfileHeaderSVG />
          <h1 className="s-sling absolute left-1/2 top-2 -translate-x-1/2 px-8 text-4xl font-normal text-[#F14A16]">
            PROFILE
          </h1>
        </div>

        {/* Profile picture placeholder */}
        <Image
        className="mt-10"
              src={chefhat as HTMLImageElement}
              alt="chef hat"
              width={1000}
              height={400}
          />
        {/* Input fields */}
        <div className="mt-9 w-full space-y-9 px-4 font-mono font-bold ">
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {"Name: " + profile?.username ?? ""}
          </div>
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {"Round: " + profile?.round ?? 0}
          </div>
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {"Score: " + profile?.score ?? 0}
          </div>
          
          {/* Button for navigation */}
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/")} // Navigate to root route
              className="mt-4 rounded-lg bg-[#F14A16] px-6 py-3 text-white hover:bg-[#d13e14] transition-colors font-mono font-bold w-full "
            >
              Start Cooking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
