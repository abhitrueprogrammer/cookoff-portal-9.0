"use client";

import { useState, useEffect } from "react";
import { type Question } from "@/schemas/api";
import { byRound } from "@/api/question";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";


interface QuestionProps {
  onQuestionSelect: (id: string) => void;
}

export default function Question({ onQuestionSelect }: QuestionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const router = useRouter()

  const handleQuestionChange = (id: string, index: number) => {
    setSelectedQuestionId(id);
    onQuestionSelect(id);
    setSelectedQuestionIndex(index);
  };

  useEffect(() => {
    const temp = questions.find(
      (question) => question.ID === selectedQuestionId,
    );
    setSelectedQuestion(temp);
  }, [questions, selectedQuestionId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await byRound();
        const fetchedQuestions = response.map((item) => item.question);
        setQuestions(fetchedQuestions);
        if (fetchedQuestions[0]) {
          setSelectedQuestionId(fetchedQuestions[0].ID);
          console.log(fetchedQuestions[0].ID)
          onQuestionSelect(fetchedQuestions[0].ID)
          setSelectedQuestionIndex(0);
          setSelectedQuestion(fetchedQuestions[0]);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        router.push("/dashboard");
      }
    };

    void fetchQuestions();
  }, []);

  return (
    <div className="flex h-[86vh] w-[45%] flex-row overflow-y-scroll bg-gray1">
      <div className="flex w-[3vw] flex-col text-white">
        {questions.map((question, index) => (
          <div
            key={question.ID}
            onClick={() => handleQuestionChange(question.ID, index)}
            className={`flex h-[80px] cursor-pointer items-center justify-center border-b border-gray-700 p-[22px] text-center text-xl ${question.ID === selectedQuestionId ? "bg-gray1" : "bg-black"}`}>
            <span className="h-full">{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="ml-2 w-screen p-4 text-white">
        {selectedQuestion && (
          <div>
            <span className="text-3xl font-bold text-accent">
              PROBLEM {selectedQuestionIndex + 1}: {selectedQuestion.Title}
            </span>
            <div className="w-[80px] bg-lightcream2 text-center text-sm text-lightcream">
              {selectedQuestion.Points} Points
            </div>
            <div className="my-5">
              <span className="mr-8 text-xl text-accent">Problem</span>
            </div>
            <p>{selectedQuestion.Description}</p>
            <br />
            
              {/* If the the fetched data is string array, why is .map not working??
              And when I use a sample markdown rendering it says for `children` prop, expected `string` */}

            <p>
            <strong>Input Format:</strong>
            <br />
            <ReactMarkdown>
              {selectedQuestion.InputFormat && selectedQuestion.InputFormat.length > 0 
                ? selectedQuestion.InputFormat.map((item: string) => `- ${item}`).join('\n') 
                : ""}
            </ReactMarkdown>
          </p>

          <p>
            <strong>Constraints:</strong>
            <br />
            <ReactMarkdown>
              {selectedQuestion.Constraints && selectedQuestion.Constraints.length > 0 
                ? selectedQuestion.Constraints.map((item: string) => `- ${item}`).join('\n') 
                : ""}
            </ReactMarkdown>
          </p>

          <p>
            <strong>Output Format:</strong>
            <br />
            <ReactMarkdown>
              {selectedQuestion.OutputFormat && selectedQuestion.OutputFormat.length > 0 
                ? selectedQuestion.OutputFormat.map((item: string) => `- ${item}`).join('\n') 
                : ""}
            </ReactMarkdown>
          </p>


          </div>
        )}
      </div>
    </div>
  );
}
