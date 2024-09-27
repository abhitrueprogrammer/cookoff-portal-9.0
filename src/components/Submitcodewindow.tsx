import React from 'react';

interface Testcase {
  testcase_id: string;
  runtime: number;
  memory: number;
  status: string;
  description: string;
}

interface TaskResult {
  submission_id: string;
  question_id: string;
  testcases_passed: number;
  testcases_failed: number;
  submission_runtime: number;
  submission_memory: number;
  submission_time: string;
  description: string;
  testcases: Testcase[];
}

const taskResult: TaskResult = {
  "submission_id": "11111111-1111-1111-1111-111111111113",
  "question_id": "62726430-a949-4592-b813-556185526134",
  "testcases_passed": 4,
  "testcases_failed": 0,
  "submission_runtime": 3.45,
  "submission_memory": 2048,
  "submission_time": "2023-01-03 14:00:00 +0000 UTC",
  "description": "Third submission",
  "testcases": [
    {
      "testcase_id": "11111111-1111-1111-1111-111111111113",
      "runtime": 3.45,
      "memory": 2048,
      "status": "Passed",
      "description": "Testcase 1 passed"
    },
    {
      "testcase_id": "11111111-1111-1111-1111-111111111113",
      "runtime": 3.67,
      "memory": 2048,
      "status": "Passed",
      "description": "Testcase 2 passed"
    },
    {
      "testcase_id": "11111111-1111-1111-1111-111111111113",
      "runtime": 3.89,
      "memory": 2048,
      "status": "Passed",
      "description": "Testcase 3 passed"
    },
    {
      "testcase_id": "11111111-1111-1111-1111-111111111113",
      "runtime": 4,
      "memory": 2048,
      "status": "Failed",
      "description": "Testcase 4 passed"
    }
  ]
};

export default function SubmitCodeWindow() {
  return (
    <div className="bg-black text-white p-6 rounded-md mx-auto  ">
      <h2 className="text-3xl font-semibold mb-3  text-accent text-left">Submission Result</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="font-semibold text-left text-xl mb-1 ">Test Case</div>
        <div className="font-semibold text-left text-xl mb-1">Status</div>
        <div className="font-semibold text-left text-xl mb-1">Description</div>
        {taskResult.testcases.map((testcase, index) => (
          <React.Fragment key={testcase.testcase_id}>
            <div className={`${testcase.status === 'Passed' ? 'text-green-500' : 'text-red-500'} text-left font-bold`}>
              {index + 1}
            </div>
            <div className={`${testcase.status === 'Passed' ? 'text-green-500' : 'text-red-500'} text-left font-bold`}>
              {testcase.status}
            </div>
            <div className={`${testcase.status === 'Passed' ? 'text-green-500' : 'text-red-500'} text-left font-bold`}>
              {testcase.description}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-10 text-left">
        <h3 className="text-3xl font-semibold mb-2 text-accent">Baking Summary</h3>
        <p className='text-green-500 text-left font-bold  mb-2'>Testcases Passed: {taskResult.testcases_passed}</p>
        <p className='text-red-500 text-left font-bold'>Testcases Failed: {taskResult.testcases_failed}</p>
        
      </div>
    </div>
  );
};

