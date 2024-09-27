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
      <div className="flex min-h-screen flex-col justify-between bg-zinc-900">
        {/* Navbar */}
        <NavBar />

        {/* Main content area */}
        <div className="flex h-full">
          {/* Left section - Scrollable round questions */}
          <div className="flex flex-grow overflow-y-auto p-4">
            <div className="mb-14 mt-12 flex flex-grow">
              <DashboardComponent setProfile={setProfile} />
            </div>
          </div>

          {/* Right section - Fixed profile */}
          <div className="sticky top-0 mr-20 flex h-full w-80 bg-zinc-900 p-4">
            <ProfileComponent profile={profile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
