"use client";
import Image from 'next/image';
import check from "@/assets/images/check.png";
import NavBar from '../../components/navBar/NavBar';

export default function TestComplete() {
    return (
        <>
           <NavBar/>
            <div className=" h-screen bg-dark">
                <div className='bg-dark flex justify-center items-center flex-col h-[85vh]'>
                    <div className=''>
                        <div className='rounded-full border-[3px] border-accent'>
                            <div className='bg-lightGray border-[6px] border-dark rounded-full '>
                                <Image src={check} alt='check' width={100} height={100} className="!w-full" />
                            </div>
                        </div>
                    </div>
                    <div className='text-cream text-xl mt-[30px]'>
                        You have completed the test. Stay tuned for the Results!
                    </div>
                    <div className='mt-[50px]'>
                        <button className='text-cream border-accent border-2 rounded-md px-6 py-2'>
                            Back To Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
