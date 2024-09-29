"use client";
import check from "@/assets/images/check.png";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TestComplete() {
  const router = useRouter();
  return (
    <div className="max-h-screen overflow-hidden">
      <NavBar />
      <div className="h-screen bg-dark">
        <div className="flex h-full flex-col items-center justify-center bg-dark">
          <div className="">
            <div className="rounded-full border-[3px] border-accent">
              <div className="rounded-full border-[6px] border-dark bg-lightGray">
                <Image
                  src={check}
                  alt="check"
                  width={100}
                  height={100}
                  className="!w-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-[30px] text-xl text-cream">
            You have completed the test. Stay tuned for the Results!
          </div>
          <div className="mt-[50px]">
            <button
              className="rounded-md border-2 border-accent px-6 py-2 text-cream hover:border-black hover:bg-orange-600 hover:text-white"
              onClick={() => router.push("/kitchen")}
            >
              Back To Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
