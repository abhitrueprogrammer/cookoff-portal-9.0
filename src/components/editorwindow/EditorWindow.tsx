"use client";
import Codeeditor from '@/components/codeEditor/Codeeditor';
import TestCases from '@/components/testCases/TestCases';

interface EditorWindowProps {
  selectedQuestionId: string;
}

export default function EditorWindow({ selectedQuestionId }: EditorWindowProps) {
  return (
    <div className='w-[55%] h-[86vh] overflow-y-auto'>
      <Codeeditor selectedquestionId={selectedQuestionId} />
      <TestCases />
    </div>
  )
};