"use client";

import { useState, useEffect } from "react";
import { type Question } from "@/schemas/api";
import { byRound } from "@/api/question";

interface QuestionProps {
  onQuestionSelect: (id: string) => void;
}

export default function Question({ onQuestionSelect }: QuestionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();

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
            className={`flex h-[80px] cursor-pointer items-center justify-center border-b border-gray-700 p-[22px] text-center text-xl ${question.ID === selectedQuestionId ? "bg-gray1" : "bg-black"}`}
          >
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
              <span className="text-xl text-lightcream">My Submissions</span>
            </div>
            <p>{selectedQuestion.Description}</p>
            <br />
            <p>
              <strong>Input Format:</strong>
              <br />
              {selectedQuestion.InputFormat}
            </p>
            <br />
            <p>
              <strong>Constraints:</strong>
              <br />
              {selectedQuestion.Constraints}
            </p>
            <br />
            <p>
              <strong>Output Format:</strong>
              <br />
              {selectedQuestion.OutputFormat}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
