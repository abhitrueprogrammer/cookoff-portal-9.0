"use client";
import ProfileComponent from "@/components/profileComponent";
import QuesNavbar from "@/components/quesNavBar";
import DashboardComponent from "../../components/ui/dashboard";
const Dashboard = () => {

  return (
    <>
      <div className="flex h-screen flex-col justify-between bg-zinc-900 ">
        {/* Navbar */}
        <QuesNavbar />

        {/* Main content area */}
        <div className="flex h-full">
          {/* Left section - Scrollable round questions */}
          <div className="flex flex-grow overflow-y-auto p-4">
            <div className="flex mb-14 mt-12 flex-grow">
              <DashboardComponent />
            </div>
          </div>

          {/* Right section - Fixed profile */}
          <div className="flex w-80 sticky top-0 bg-zinc-900 p-4 mr-20 h-full ">
            <ProfileComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
