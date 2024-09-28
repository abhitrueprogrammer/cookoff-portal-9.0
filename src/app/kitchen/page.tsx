"use client";
import NavBar from "@/components/NavBar";
import ProfileComponent from "@/components/profileComponent";
import DashboardComponent from "@/components/ui/dashboard";
import { type profileData } from "@/schemas/api";
import { useState } from "react";
const Dashboard = () => {
  const [profile, setProfile] = useState<profileData>();
  return (
    <>
      <div className="flex h-screen flex-col bg-[#131313]">
        <NavBar />
        <div className="my-auto flex h-[90vh] gap-4 px-[5%] py-4">
          <div className="flex grow p-4">
            <DashboardComponent setProfile={setProfile} />
          </div>
          <div className="flex w-1/3 items-center">
            <ProfileComponent profile={profile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
