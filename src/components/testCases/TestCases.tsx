"use client";
import TestComp from "../TestComp";
import React, { useState, useEffect } from "react";
import lock from "@/assets/images/lock.png";
import Image from "next/image";

interface testCaseProps {
  codeData: codeData;
}

interface codeData {
  no_testcases_passed: number;
  result: testCaseResult[];
}
interface testCaseResult {
  testcase_id: string;
  stdout: string;
  expected_output: string;
  input: string;
  time: string;
  memory: number;
  stderr: string;
  token: string;
  message: string;
  status: {
    id: number;
    description: string;
  };
  compile_output: string;
}

export default function TestCases({ codeData }: testCaseProps) {
  const [allPassed, setAllPassed] = useState(false);
  const [currentTestCase, setcurrentTestCase] = useState(0);
  // const [isClicked, setIsClicked] = useState(true);
  function handleTestClick(testKaKey: number) {
    setcurrentTestCase(testKaKey);
    console.log(testKaKey);
  }
  useEffect(() => {
    if (codeData) {
      if (codeData.no_testcases_passed === codeData.result.length) {
        setAllPassed(true);
      } else {
        setAllPassed(false);
      }
    }
  }, [codeData]);
  return (
    <>
      {codeData ? (
        <div className="flex justify-center">
          <div className="grid h-[85vh] w-full grid-rows-[2fr_5fr_2fr] bg-dark">
            <div className="flex justify-center">
              <div className="m-3 flex w-full items-center justify-between bg-lightGray px-3">
                <div>
                  <p
                    className={`${allPassed ? "text-green2" : "text-accent"} roboto text-2xl !font-medium`}
                  >
                    {codeData.no_testcases_passed +
                      "/" +
                      codeData.result.length +
                      " "}
                    Test Cases Have Passed {allPassed ? " :-)" : " :'-("}
                  </p>
                  <p className="roboto text-sm text-white">
                    {allPassed ? "Well Done chigga!! " : "Try Again!!!"}
                  </p>
                </div>
                <div>
                  <button className="roboto rounded bg-green2 p-2 px-4 text-sm !font-medium text-white">
                    Next Problem
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-white">
              <div className="flex w-[40%] flex-col">
                {codeData.result.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleTestClick(index);
                    }}
                  >
                    <TestComp isClicked={currentTestCase===index? true : false}
                      key={index}
                      isPassed={
                        item.status.description === "Accepted" ? true : false
                      }
                      num={index}
                    />
                  </div>
                ))}
                {codeData ? (
                  <button className="mx-6 my-2 rounded-lg bg-black px-4 py-3 text-center text-base">
                    Custom Input
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="mx-4 w-[60%]">
                <div className="my-2">
                  <div className="text-base">Message</div>

                  <div
                    className={`${codeData.result[currentTestCase]?.status.description === "Accepted" ? "text-green2" : "text-accent"} my-2 rounded bg-lightGray px-4 py-1 text-xs`}
                  >
                    {codeData.result[currentTestCase]?.status.description }
                  </div>
                </div>
                <div className="my-2">
                  <div className="text-base">Output</div>
                  <div className="my-2 rounded bg-lightGray px-4 py-1 text-xs">
                    {codeData.result[currentTestCase]?.stdout? codeData.result[currentTestCase]?.stdout:"-"}
                  </div>
                </div>
                <div className="my-2">
                  <div className="text-base">Expected Output</div>
                  <div className="my-2 rounded bg-lightGray px-4 py-1 text-xs">
                    {codeData.result[currentTestCase]?.expected_output}
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-20 flex justify-end">
              <div className="flex items-center text-xl capitalize text-white">
                <Image
                  className="mr-2 w-6"
                  src={lock}
                  alt="lock"
                  height={100}
                  width={100}
                />
                hidden test cases
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
