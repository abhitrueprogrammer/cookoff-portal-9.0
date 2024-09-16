"use client"
import TestComp from '../TestComp'
import React, { useState } from 'react'
import lock from "@/assests/images/lock.png"
import Image from 'next/image'


export default function TestCases() {
    const [cases, setCases] = useState([
        true, false, true,
    ])
    return (
        <div className='flex justify-center mt-[-100px]'>
            <div className='grid grid-rows-[2fr_5fr_2fr] h-[85vh] w-full bg-dark'>
                <div className='flex justify-center '>
                    <div className='w-full m-3 flex justify-between bg-lightGray items-center px-3'>
                        <div>
                            <p className='text-accent roboto text-2xl !font-medium'>1/3 Test Cases Have failed !</p>
                            <p className='text-white roboto text-sm'>Try Again!!!</p>
                        </div>
                        <div>
                            <button className='roboto text-white p-2 bg-green2 rounded px-4 text-sm !font-medium'>Next Problem</button>
                        </div>
                    </div>
                </div>
                <div className='text-white flex justify-center'>
                    <div className='w-[40%] flex flex-col'>
                        {cases.map((item, index) => (
                            <TestComp key={index} isPassed={item} num={index} />
                        ))}
                        <button className='bg-black px-4 py-3 my-2 mx-6  text-center  rounded-lg text-base '>
                        Custom Input</button>



                    </div>
                    <div className='w-[60%] mx-4'>
                        <div className='my-2'>
                            <div className='text-base'>Compile Message</div>
                            <div className='text-green2 px-4 bg-lightGray py-1 my-2 text-xs rounded'>compilation successful</div>
                        </div>
                        <div className='my-2'>
                            <div className='text-base'>Output</div>
                            <div className='px-4 bg-lightGray py-1 my-2 text-xs rounded'>Hello world</div>
                        </div>
                        <div className='my-2'>
                            <div className='text-base'>Expected Output</div>
                            <div className='px-4 bg-lightGray py-1 my-2 text-xs rounded'>Hello world</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end mr-20'>
                    <div className='text-xl text-white capitalize flex items-center'>
                        <Image className='w-6 mr-2' src={lock} alt='lock' height={100} width={100}/>
                        hidden test cases
                    </div>
                </div>
            </div>
        </div>
    )
}
