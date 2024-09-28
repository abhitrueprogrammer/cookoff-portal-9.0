"use client";

import chefhat from "@/assets/images/chefshat.svg";
import { type profileData } from "@/schemas/api";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";

interface TimerResponse {
  message: string;
  remainingTime: number;
}

export default function ProfileComponent({
  profile,
}: {
  profile: profileData | undefined;
}) {
  const router = useRouter(); // Initialize router
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    const checkTimerStatus = async () => {
      try {
        const res = await axios.get<TimerResponse>("/api/countdown");
        const data = res.data;
        if (data.remainingTime > 0) {
          setIsTimerActive(true);
        } else {
          setIsTimerActive(false);
        }
      } catch {
        setIsTimerActive(false);
      }
    };

    void checkTimerStatus();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div
        className="bg-[#B7AB98] px-[1px] pt-[1px]"
        style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div
          className="s-sling flex min-h-10 items-center justify-center bg-black py-2 text-3xl font-bold tracking-wider text-accent"
          style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          Profile
        </div>
      </div>
      <div className="roboto relative my-auto max-h-full border-x-[1px] border-[#B7AB98] bg-[#202020] p-4">
        {/* Background shape with white border */}
        {/* <ProfileBackgroundSVG className="absolute top-0 left-0 max-h-fit" /> */}

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Profile header with white border */}

          {/* Profile picture placeholder */}
          <Image
            className="mt-10"
            src={chefhat as HTMLImageElement}
            alt="chef hat"
            width={1000}
            height={400}
          />
          {/* Input fields */}
          <div className="mt-9 w-full space-y-9 px-4 font-mono font-bold">
            <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
              {"Name: " + profile?.username ?? ""}
            </div>
            <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
              {"Round: " + profile?.round ?? "Nothing yet."}
            </div>
            <div className="h-full w-full rounded-xl bg-[#2F2F2F] p-4 text-center text-white">
              {"Score: " +
                (profile?.score
                  ? Math.round(profile.score * 100) / 100
                  : "Nothing yet.")}
            </div>

            {isTimerActive && (
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("/oven")} // Navigate to root route
                  className="s-sling mt-4 w-full rounded-lg bg-[#F14A16] px-6 py-3 text-white transition-colors hover:bg-[#d13e14]"
                >
                  Start Cooking
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="bg-[#B7AB98] px-[1px] pb-[1px]"
        style={{ clipPath: "polygon(0% 0, 100% 0, 90% 100%, 0 100%)" }}
      >
        <div
          className="s-sling flex h-10 items-center justify-center bg-[#202020]"
          style={{ clipPath: "polygon(0% 0, 100% 0, 90% 100%, 0 100%)" }}
        />
      </div>
    </div>
  );
}
