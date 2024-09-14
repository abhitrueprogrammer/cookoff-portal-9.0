"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';

import check from "@/assests/images/check.png";
import ChangeDevice from '../../components/changeDevice/ChangeDevice';
import NavBar from '../../components/navBar/NavBar';
import "./style.css";

export default function TestComplete() {
    const [isSmall, setIsSmall] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        setIsSmall(mediaQuery.matches)
        const handleMediaChange = (event: MediaQueryListEvent) => {
            setIsSmall(event.matches);
        };


        mediaQuery.addEventListener('change', handleMediaChange);

        return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }, [])
    return (
        <>{isSmall ? <ChangeDevice /> :
            <>
                <NavBar />
                <div className='bg-[#131313] h-screen'>

                    <div className="bg-[#131313] flex justify-center items-center flex-col h-[85vh]">
                        <div className=''>
                            <div className='rounded-full border-[3px] border-[#F14A16]'>
                                <div className='bg-[#4D4D4D80] border-[6px] border-[#131313] rounded-full '>
                                    <Image src={check} alt='check' width={100} height={100} className='check-img' />
                                </div>
                            </div>

                        </div>
                        <div className='text-[#E4D8C6] text-xl mt-[30px]'>
                            You have completed the test. Stay tuned for the Results!
                        </div>
                        <div className='mt-[50px]'>
                            <button className='text-[#E4D8C6] border-[#F14A16] border-2 rounded-md px-6 py-2'>
                                Back To Dashboard
                            </button>
                        </div>
                    </div>
                </div></>}
        </>
    )
}
