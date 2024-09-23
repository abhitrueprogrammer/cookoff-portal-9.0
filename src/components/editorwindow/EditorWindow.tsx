"use client";
import Codeeditor from '@/components/codeEditor/Codeeditor';
import TestCases from '@/components/testCases/TestCases';


export default function EditorWindow() {
  return (
    <div className='w-[55%] h-[86vh] overflow-y-auto'>
      <Codeeditor />
      <TestCases />
    </div>
  )
}

