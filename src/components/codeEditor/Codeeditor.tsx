import { type CodeEditorProps, type CodeSubmission } from '@/schemas/api';
import Editor, { type OnMount } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import SelectLanguages from '../ui/SelectLanguages';
import boilerplates from '@/data/boilerplates.json'; // Import the boilerplates JSON file
import { submit } from '@/api/submit';
import { Languages } from 'lucide-react';


interface runCodeInterface {
  source_code: string;
  language_id: number;
  question_id: string;
}


interface ChildComponentProps {
  handleRun: (data: runCodeInterface) => void; 
  isRunClicked: boolean;
  selectedquestionId: string;
}

export default function Codeeditor({ handleRun, isRunClicked, selectedquestionId }: ChildComponentProps) {

  
  const [sourceCode, setSourceCode] = useState(boilerplates["71"]); // Default to Python
  const [languageId, setLanguageId] = useState(71); // Default to Python
  const questionId = selectedquestionId; // Use selectedquestionId directly
  

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for button submission

  const localStorageCodeKey = `code-${questionId}-${languageId}`;
  const localStorageLanguageKey = `language-${questionId}`;

  useEffect(() =>
   {
    
    const savedLanguageId = localStorage.getItem(localStorageLanguageKey);
    if (savedLanguageId) {
      setLanguageId(parseInt(savedLanguageId));
      setSourceCode((boilerplates as Record<string, string>)[savedLanguageId.toString()] ?? boilerplates["71"]);
    }
    else{
      setLanguageId(71);
      localStorage.setItem(`language-${selectedquestionId}`, "71");
      
      setSourceCode(boilerplates["71"]);
      localStorage.setItem(`code-${selectedquestionId}-71`, boilerplates["71"]);
    }
    const savedCode = localStorage.getItem(localStorageCodeKey);
    if (savedCode) {
      setSourceCode(savedCode);
    }
   }, [localStorageCodeKey, localStorageLanguageKey, selectedquestionId]);



  // Load saved code and language from localStorage
  useEffect(() => {

    // Retrieve saved language for this question
    const savedLanguageId = localStorage.getItem(localStorageLanguageKey);

    if (savedLanguageId) {
      setLanguageId(parseInt(savedLanguageId));
      setSourceCode((boilerplates as Record<string, string>)[savedLanguageId.toString()] ?? boilerplates["71"]); // Load corresponding boilerplate
    }
    else{
      setLanguageId(71);
      localStorage.setItem(`language-${selectedquestionId}`, "71");
      
      setSourceCode(boilerplates["71"]);
      localStorage.setItem(`code-${selectedquestionId}-71`, boilerplates["71"]);
    }

    // Retrieve saved code for this language and question
    const savedCode = localStorage.getItem(localStorageCodeKey);
    if (savedCode) {
      setSourceCode(savedCode);
    }
  }, [questionId, localStorageCodeKey, localStorageLanguageKey, selectedquestionId]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  function handleOnChange(value: string | undefined) {
    if (value) {
      setSourceCode(value);
      localStorage.setItem(localStorageCodeKey, value);
    }
  }

  // Handle language change and save to localStorage
  const handleLanguageChange = (id: number) => {
    setLanguageId(id);
    setSourceCode((boilerplates as Record<string, string>)[id.toString()] ?? boilerplates["71"]); // Load the boilerplate for the new language
    localStorage.setItem(localStorageLanguageKey, id.toString()); // Save selected language for this question
  };

  async function handleSubmitCode() {
    console.log(selectedquestionId)
    
    const codeSubmission: CodeSubmission = {
      source_code: sourceCode,
      language_id: languageId,
      question_id: selectedquestionId, // Use the updated questionId from prop
    };

    try {
      setIsSubmitting(true); // Set submitting state to true

      const submissionID = await submit(codeSubmission); 
      console.log('Submission ID:', submissionID);

    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setIsSubmitting(false); // Reset submitting state after submission
    }
  }

  const runCodeParams: runCodeInterface = {
    source_code: sourceCode,
    language_id: languageId,
    question_id: selectedquestionId
  };

  return (
    <div className=" flex justify-center items-center bg-[#131313]">
      <div className="w-full max-w-4xl p-4 ">

        <div className="flex items-center text-white text-xl mb-4 ">
          Languages:
          <div className="w-[150px]">
            {/* Pass the selected languageId as the value prop to SelectLanguages */}
            <SelectLanguages value={languageId} onChange={handleLanguageChange} />
          </div>
        </div>

        <div className="flex rounded-3xl">
          <Editor
            theme="vs-dark"
            height="50vh"
            defaultLanguage="cpp"
            value={sourceCode}
            onMount={handleEditorDidMount}
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
            <button onClick={() => {
              console.log(runCodeParams)
              handleRun(runCodeParams);

              // console.log(runCodeParams)
            }
            }
              className="py-2 px-4 rounded text-white disabled:text-[#ffffff85] bg-[#242424] disabled:bg-[#24242488]"
              disabled={isRunClicked}
              
            >
              {isRunClicked?"Cooking...":"Cook"}
              
            </button>
            <button
              className={`py-2 rounded text-white ${isSubmitting ? 'bg-gray-500' : 'bg-orange-600'} w-28`}
              onClick={handleSubmitCode}
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? 'Cooking...' : 'Submit Code'} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
