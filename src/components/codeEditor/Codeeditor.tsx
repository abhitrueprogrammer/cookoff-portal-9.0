import api from '@/api';
import { CodeEditorProps, CodeSubmission, SubmissionResponse } from '@/schemas/api';
import Editor, { type OnMount } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import SelectLanguages from '../ui/SelectLanguages';



// Boilerplate templates for each language
const boilerplates: Record<number, string> = {
  71: `print("Hello, World!")`, // Python
  62: `public class Main {
  public static void main(String[] args) {
  System.out.println("Hello, World!");
  }
  }`, // Java
  50: `#include <stdio.h>

  int main() {
  printf("Hello, World!");
  return 0;
  }`, // C
  54: `#include <iostream>
  using namespace std;

  int main() {
  cout << "Hello, World!";
  return 0;
  }`, // C++
  63: `console.log("Hello, World!");`, // JavaScript
  73: `fn main() {
  println!("Hello, World!");
  }`, // Rust
  60: `package main
  import "fmt"

  func main() {
  fmt.Println("Hello, World!")
  }`, // Go
};

const CodeEditor: React.FC<CodeEditorProps> = ({ selectedquestionId }) => {
  const [sourceCode, setSourceCode] = useState(boilerplates[71]); // Default to Python
  const [languageId, setLanguageId] = useState(71); // Default to Python
  const questionId = selectedquestionId; // Use selectedquestionId directly
  
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for button submission

  const localStorageKey = `code-${questionId}-${languageId}`;

  useEffect(() => {
    const savedCode = localStorage.getItem(localStorageKey);
    if (savedCode) {
      setSourceCode(savedCode);
    }
  }, [localStorageKey]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  function handleOnChange(value: string | undefined) {
    if (value) {
      setSourceCode(value);
      localStorage.setItem(localStorageKey, value);
    }
  }

  const handleLanguageChange = (id: number) => {
    setLanguageId(id);
    setSourceCode(boilerplates[id] || ''); // Set boilerplate or empty if no template exists
  };

  async function handleSubmitCode() {
    const codeSubmission: CodeSubmission = {
      source_code: sourceCode,
      language_id: languageId,
      question_id: questionId, // Use the updated questionId from prop
    };

    try {
      setIsSubmitting(true); // Set submitting state to true

      const response = await api.post<SubmissionResponse>(`/submit`, codeSubmission, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const submissionId = response.data.submission_id;
      console.log('Submission ID:', submissionId);
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setIsSubmitting(false); // Reset submitting state after submission
    }
  }

  return (
    <div className="h-full flex justify-center items-center bg-[#131313]">
      <div className="w-full max-w-4xl p-4 mt-[-80px]">
        <div className="flex items-center text-white text-xl mb-4">
          Languages:
          <div className="w-[150px]">
            <SelectLanguages onChange={handleLanguageChange} />
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
            <button className="py-2 px-4 rounded bg-gray-800 text-white">
              Run Code
            </button>
            <button
              className={`py-2 rounded text-white ${isSubmitting ? 'bg-gray-500' : 'bg-orange-600'} w-28`} // Set a constant width using w-40
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

export default CodeEditor;
