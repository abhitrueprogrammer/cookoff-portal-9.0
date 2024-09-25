"use client";

import { ProfileHeaderSVG, ProfileIconSVG } from "../assets/svgPaths";
// Simulated API response object
const profileData = {
  username: "JohnDoe",
  round: "Round 2",
  totalScore: 750,
};

export default function Component() {
  return (
    <div className="roboto relative my-auto max-h-full ">
      {/* Background shape with white border */}
      {/* <ProfileBackgroundSVG className="absolute top-0 left-0 max-h-fit" /> */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Profile header with white border */}
        <div className="relative w-full">
          <ProfileHeaderSVG />
          <h1 className="s-sling absolute left-1/2 -translate-x-1/2 top-2 px-8 text-4xl font-normal text-[#F14A16] ">
            PROFILE
          </h1>
        </div>

        {/* Profile picture placeholder */}
        <div className="group mt-8 flex h-[146px] w-[149px] items-center justify-center overflow-hidden rounded-full bg-[#2F2F2F]">
          <ProfileIconSVG className="group-hover:rotate-360 transition-transform duration-500 ease-in-out" />
        </div>

        {/* Input fields */}
        <div className="mt-9 w-full space-y-9 px-4">
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {profileData.username}
          </div>
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {profileData.round}
          </div>
          <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
            {profileData.totalScore}
          </div>
        </div>
      </div>
    </div>
  );
}
