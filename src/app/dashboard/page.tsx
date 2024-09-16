'use client';
import ProfileComponent from '@/components/profileComponent';
import DashboardComponent from '../../components/ui/dashboard';

const Dashboard = () => {
  return (
    <>
      <div className="parent bg-zinc-900 min-h-screen flex flex-col justify-between">
        <div className="flex gap-12 mb-10">
          <div className="wrapper flex-grow">
            <div className="mt-44 mb-14">
              <DashboardComponent />
            </div>
            <DashboardComponent />
          </div>
          <div className="relative right-16 top-44">
            <ProfileComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
