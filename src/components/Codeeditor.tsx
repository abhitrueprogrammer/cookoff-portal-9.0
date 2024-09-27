import React, { useState, useEffect, useRef } from 'react';
import { submit } from "@/api/submit";
import SelectLanguages from "@/components/ui/SelectLanguages";
import boilerplates from "@/data/boilerplates.json";
import { type CodeSubmission } from "@/schemas/api";
import Editor, { loader, type OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import SubmitCodeWindow from './Submitcodewindow';
import { submission } from '@/api/submission';
import { runCodeInterface,ChildComponentProps,TaskResult } from '@/schemas/api';
import { set } from 'zod';




// Load the Monaco Editor
loader.init().then((monaco) => {
  monaco.editor.defineTheme('gruvbox-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'ebdbb2', background: '282828' },
      { token: 'keyword', foreground: 'fb4934' },
      { token: 'string', foreground: 'b8bb26' },
      { token: 'number', foreground: 'd3869b' },
      { token: 'comment', foreground: '928374' },
    ],
    colors: {
      'editor.background': '#282828',
      'editor.foreground': '#ebdbb2',
      'editorCursor.foreground': '#ebdbb2',
      'editor.lineHighlightBackground': '#3c3836',
      'editorLineNumber.foreground': '#928374',
      'editor.selectionBackground': '#504945',
      'editor.inactiveSelectionBackground': '#3c3836'
    }
  });
});

export default function CodeEditor({
  handleRun,
  isRunClicked,setisRunClicked,latestClicked,setlatestClicked,
  selectedquestionId,
}: ChildComponentProps) {
  const [sourceCode, setSourceCode] = useState(boilerplates["71"]); // Default to Python
  const [languageId, setLanguageId] = useState(71); // Default to Python
  const questionId = selectedquestionId; // Use selectedquestionId directly

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for button submission

  const [taskResult, setTaskResult] = useState<TaskResult>();
  const [lastSubmittedQuestionId, setLastSubmittedQuestionId] = useState<string | null>(null);

  const localStorageCodeKey = `code-${questionId}-${languageId}`;
  const localStorageLanguageKey = `language-${questionId}`;

  useEffect(() => {
    const savedLanguageId = localStorage.getItem(localStorageLanguageKey);
    if (savedLanguageId) {
      setLanguageId(parseInt(savedLanguageId));
      setSourceCode(
        (boilerplates as Record<string, string>)[savedLanguageId.toString()] ??
          boilerplates["71"],
      );
    } else {
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
      setSourceCode(
        (boilerplates as Record<string, string>)[savedLanguageId.toString()] ??
          boilerplates["71"],
      ); // Load corresponding boilerplate
    } else {
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
  }, [
    questionId,
    localStorageCodeKey,
    localStorageLanguageKey,
    selectedquestionId,
  ]);

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
    setSourceCode(
      (boilerplates as Record<string, string>)[id.toString()] ??
        boilerplates["71"],
    ); // Load the boilerplate for the new language
    localStorage.setItem(localStorageLanguageKey, id.toString()); // Save selected language for this question
  };

  async function handleSubmitCode() {
    const codeSubmission: CodeSubmission = {
      source_code: sourceCode,
      language_id: languageId,
      question_id: selectedquestionId, // Use the updated questionId from prop
    };

    try {
      setIsSubmitting(true); // Set submitting state to true
      setisRunClicked(true);
      setlatestClicked('submit');
      setLastSubmittedQuestionId(selectedquestionId);

      const ID = await submit(codeSubmission);
      console.log("Submission ID:", ID);

      const response = await submission(ID);
      setTaskResult(response);
      // console.log(response.data);
      

    } catch (error) {
      console.error("Error submitting code:", error);
    } finally {
      setIsSubmitting(false); // Reset submitting state after submission
      setisRunClicked(false);
    }
  }

  const runCodeParams: runCodeInterface = {
    source_code: sourceCode,
    language_id: languageId,
    question_id: selectedquestionId,
  };

  return (
    <div className="flex items-center justify-center bg-[#131313]">
      <div className="w-full p-4">
        <div className="mb-4 flex items-center text-xl text-white">
          Languages:
          <div className="w-[150px] pl-4">
            {/* Pass the selected languageId as the value prop to SelectLanguages */}
            <SelectLanguages
              value={languageId}
              onChange={handleLanguageChange}
            />
          </div>
        </div>

        <div className="flex rounded-3xl">
          <Editor
            theme='gruvbox-dark'
            height="50vh"
            defaultLanguage="cpp"
            value={sourceCode}
            onMount={handleEditorDidMount}
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4 flex w-full items-center">
          
          <div className="mt-4 flex w-full justify-end space-x-4">
            <button
              onClick={() => {
                handleRun(runCodeParams);
              }}
              className="rounded bg-[#242424] px-4 py-2 text-white disabled:bg-[#24242488] disabled:text-[#ffffff85]"
              disabled={isRunClicked}
            >
              {isRunClicked ? "Cooking..." : "Cook"}
            </button>
            <button
              className={`rounded py-2 text-white ${isSubmitting ? "bg-gray-500" : "bg-orange-600"} w-28`}
              onClick={handleSubmitCode}
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Cooking..." : "Submit Code"}
            </button>
          </div>
        </div>

        {taskResult && latestClicked==="submit" && lastSubmittedQuestionId === selectedquestionId && (
          <SubmitCodeWindow taskres={taskResult} />
        )}
      </div>
    </div>
  );
}