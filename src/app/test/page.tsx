import TestCases from '@/components/TestCases'
import React from 'react'

export default function test() {
  return (
    <div>
        <TestCases codeData={{
            no_testcases_passed: 1,
            result: [
                {
                    testcase_id: "11111111-1111-1111-1111-111111111113",
                    stdout: "stdout",
                    expected_output: "expected_output",
                    input: "input",
                    time: "time",
                    memory: 2048,
                    stderr: "stderr",
                    token: "token",
                    message: "message",
                    status: {
                        id: 1,
                        description: "Accepted"
                    },
                    compile_output: "compile_output"
                },
                {
                    testcase_id: "11111111-1111-1111-1111-111111111113",
                    stdout: "stdout",
                    expected_output: "expected_output",
                    input: "input",
                    time: "time",
                    memory: 2048,
                    stderr: "stderr",
                    token: "token",
                    message: "message",
                    status: {
                        id: 1,
                        description: "description"
                    },
                    compile_output: "compile_output"
                },
                {
                    testcase_id: "11111111-1111-1111-1111-111111111113",
                    stdout: "stdout",
                    expected_output: "expected_output",
                    input: "input",
                    time: "time",
                    memory: 2048,
                    stderr: "stderr",
                    token: "token",
                    message: "message",
                    status: {
                        id: 1,
                        description: "description"
                    },
                    compile_output: "compile_output"
                }
            ]
        }} />
    </div>
  )
}
