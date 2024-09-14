import React from 'react'
import acc from "@/assests/images/acc.png"
import Image from 'next/image';

export default function NavBar() {
    return (
        <div>
            <div className="s-sling nav bg-black flex justify-around items-center border-b-[1px] ">
                <div className='px-4 py-1 text-[#F14A16] border-[1px] border-white text-lg flex items-center '>9:11:69</div>
                <div className='text-white text-5xl my-3'>
                    <span className='text-[#B7AB98]'>cook</span> <span className='text-[#F14A16]'>off</span><span className='text-[#B7AB98]'> 9.0</span> </div>
                <div className='flex text-[#B7AB98] justify-evenly'>
                    <button className='bg-[#1F1F1F] text-sm px-7'>logout</button>
                    <Image src={acc} height={100} width={100} alt='account' layout='responsive' className='acc-img' />
                </div>
            </div>
        </div>
    )
}
