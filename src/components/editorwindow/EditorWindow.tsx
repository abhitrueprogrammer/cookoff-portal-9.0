"use client";
import Codeeditor from '@/components/codeEditor/Codeeditor';
import TestCases from '@/components/testCases/TestCases';
import axios from 'axios';
import { Interface } from 'node:readline/promises';
import { useEffect, useState } from 'react';

interface runCodeInterface {
  source_code: string;
  language_id: number;
  question_id: string;
}

interface runData {
  no_testcases_passed: number;
  result: [];
}
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

interface EditorWindowProps {
  selectedQuestionId: string;
}

export default function EditorWindow({ selectedQuestionId }: EditorWindowProps) {
  const [isRunClicked, setIsRunClicked] = useState(false);
  const [codeData, setCodeData] = useState<runData | null>(null);

  async function handleRun({ source_code, language_id, question_id }: runCodeInterface) {
    setIsRunClicked(true)
    setCodeData(null);
    const sendData: runCodeInterface = {
      source_code,
      language_id,
      question_id
    }

    try {
      const response = await api.post<runData>('/runcode', sendData, { withCredentials: true })
      setCodeData(response.data)

    } catch (err) {
      console.log(err)
    } finally {
      setIsRunClicked(false)
    }
  }

  useEffect(() => {
    console.log(codeData)
  }, [codeData])



  return (
    <div className='bg-dark w-[55%] h-[86vh] overflow-y-auto'>
      <Codeeditor selectedquestionId={selectedQuestionId} isRunClicked={isRunClicked} handleRun={handleRun} />
      {codeData && <TestCases codeData={codeData} />}
    </div>
  )
};