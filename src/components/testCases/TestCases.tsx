"use client"
import React from 'react'
import styles from "./TestCases.module.css"

export default function TestCases() {
    return (
        <div className='flex justify-center'>
            <div className='grid grid-rows-[2fr_5fr_3fr] h-[90vh] w-[50%] bg-dark'>
                <div className='flex justify-center '>
                    <div className='w-full m-3 flex justify-between bg-dark2 items-center px-3'>
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
                    <div className='w-[40%]'>
                        <div className={styles.testCase}>test case</div>
                        <div className={styles.testCase}>test case</div>
                        <div className={styles.testCase}>test case</div>
                        <div className={styles.testCase}>custom output</div>
                    </div>
                    <div className='w-[60%]'>
                        <div>
                            <div>Compile Message</div>
                            <div className='text-green2'>compilation successful</div>
                        </div>
                        <div>
                            <div>Output</div>
                            <div>Hello world</div>
                        </div>
                        <div>
                            <div>Expected Output</div>
                            <div>Hello world</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        hidden test cases
                    </div>
                </div>
            </div>
        </div>
    )
}
