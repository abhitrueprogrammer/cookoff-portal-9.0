"use client";
import Codeeditor from '@/components/codeEditor/Codeeditor';
import TestCases from '@/components/testCases/TestCases';


export default function EditorWindow() {
  return (
    <div className='flex flex-col w-[55%]'>
      <Codeeditor />
      <TestCases />
    </div>
  )
}

