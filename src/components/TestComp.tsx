import React from 'react'
import Image from 'next/image'
import gCheck from '@/assets/images/gCheck.png'
import gEye from '@/assets/images/gEye.png'
import rCross from '@/assets/images/rCross.png'
import rEye from '@/assets/images/rEye.png'


type TestCompProps = {
    isPassed: boolean;
    num: number;
};

export default function TestComp({isPassed, num}: TestCompProps) {
  return (
    <div className='bg-black px-4 py-3 my-2 mx-6  text-center flex justify-between items-center rounded-lg'> 
        <Image className='w-[15%]' src={isPassed? gCheck: rCross} alt='green check' width={100} height={100}/>
        <p className='text-base mx-1'>
        Test Case {num}

        </p>
        
        <Image className='w-[15%]' src={isPassed? gEye: rEye} alt='green check' width={100} height={100}/>
    </div>
  )
}
