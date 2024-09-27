"use client";
import api from "@/api";
import Codeeditor from "@/components/Codeeditor";
import TestCases from "@/components/TestCases";
import { useEffect, useState } from "react";


interface runCodeInterface {
  source_code: string;
  language_id: number;
  question_id: string;
}

interface runData {
  no_testcases_passed: number;
  result: [];
}

interface EditorWindowProps {
  selectedQuestionId: string;
}

export default function EditorWindow({
  selectedQuestionId,
}: EditorWindowProps) {
  const [isRunClicked, setIsRunClicked] = useState(false);
  const [codeData, setCodeData] = useState<runData | null>(null);
  const [latestClicked, setLatestClicked] = useState<string | null>(null);
  const [lastSubmittedQuestionId, setLastSubmittedQuestionId] = useState<string | null>(null);

  async function handleRun({
    source_code,
    language_id,
    question_id,
  }: runCodeInterface) {
    setIsRunClicked(true);
    setCodeData(null);
    const sendData: runCodeInterface = {
      source_code,
      language_id,
      question_id,
    };

    try {
      const response = await api.post<runData>("/runcode", sendData);
      setCodeData(response.data);
      setLatestClicked('run');
      setLastSubmittedQuestionId(selectedQuestionId);

    } catch (err) {
      console.log(err);
    } finally {
      setIsRunClicked(false);
    }
  }

  useEffect(() => {
    console.log(codeData);
  }, [codeData]);

  return (
    <div className="h-[86vh] w-[55%] overflow-y-auto bg-dark">
      <Codeeditor
        selectedquestionId={selectedQuestionId}
        isRunClicked={isRunClicked}
        setisRunClicked={setIsRunClicked}
        handleRun={handleRun}
        latestClicked={latestClicked}
        setlatestClicked={setLatestClicked}
      />
      
      {codeData &&  latestClicked==="run" && lastSubmittedQuestionId === selectedQuestionId && <TestCases codeData={codeData} />}
    </div>
  );
}
