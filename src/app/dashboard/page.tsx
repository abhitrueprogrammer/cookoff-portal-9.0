'use client';
import ProfileComponent from '@/components/profileComponent';
import React, { useEffect, useState } from 'react';
import DashboardComponent from '../../components/ui/dashboard';


const Dashboard: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isDesktop ? (
        <div className="parent bg-gray-900 ">
          <div className=" flex gap-16 mb-10">
            <div className="wrapper">
              <div className="mt-44 mb-14">
                <DashboardComponent />
              </div>
              <DashboardComponent />
            </div>
            <div className="absolute right-16 top-44">
              <ProfileComponent />
            </div>
          </div>
        </div>

      ) : (
        <div className="bg-gray-900 mt-44 mb-14 text-center text-white">
          Use a laptop
        </div>
      )}
    </>
  );
};

export default Dashboard;
