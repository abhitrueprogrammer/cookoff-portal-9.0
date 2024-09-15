import React, { useRef, useState } from 'react';
import SelectLanguages from './SelectLanguages';
import Editor from '@monaco-editor/react';

export default function Codeeditor() {
  const [sourceCode, setSourceCode] = useState('');
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleOnChange(value: string | undefined) {
    if (value) {
      setSourceCode(value);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-[#131313]">
      <div className="w-full max-w-4xl p-4 mt-[-80px]">

        <div className="flex items-center text-white text-xl mb-4 ">
          Languages:
          <div className="w-[150px]">
            <SelectLanguages />
          </div>
        </div>

        <div className="flex rounded-3xl ">
          <Editor
            theme="vs-dark"
            height="50vh"
            defaultLanguage="cpp"
            defaultValue={sourceCode}
            onMount={handleEditorDidMount}
            value={sourceCode}
            onChange={handleOnChange}
          />
        </div>

        <div className="flex items-center mt-4 w-full">
          <input
            type="checkbox"
            id="customInput"
            className="w-4 h-4 text-orange-600 bg-gray-900 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="customInput" className="ml-2 text-gray-400 whitespace-nowrap">
            Test Against Custom Input
          </label>

          <div className="flex mt-4 space-x-4 justify-end w-full">
            <button
              className="py-2 px-4 rounded text-white"
              style={{ backgroundColor: '#242424' }}
            >
              Run Code
            </button>
            <button
              className="py-2 px-4 rounded text-white"
              style={{ backgroundColor: '#F14A16' }}
            >
              Submit Code
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
