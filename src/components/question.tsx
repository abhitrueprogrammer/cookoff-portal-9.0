"use client";

import { byRound } from "@/api/question";
import { type Question } from "@/schemas/api";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import { type TimerResponse } from "./ui/timer";

interface QuestionProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  onQuestionSelect: (id: string) => void;
}

export default function QuestionComponent({
  questions,
  setQuestions,
  onQuestionSelect,
}: QuestionProps) {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<
    Question | undefined
  >();
  const router = useRouter();

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
        const timer = await axios.get<TimerResponse>("/api/countdown");
        if (timer.data.remainingTime <= 0) {
          toast.error("Time is up");
          setTimeout(() => {
            router.push("/kitchen");
          }, 1000);
          return;
        }
      } catch {
        toast.error("Timer not started");
        setTimeout(() => {
          router.push("/kitchen");
        }, 1000);
        return;
      }
      try {
        const response = await byRound();
        const fetchedQuestions = response.map((item) => item.question);
        setQuestions(fetchedQuestions);
        if (fetchedQuestions[0]) {
          setSelectedQuestionId(fetchedQuestions[0].ID);
          onQuestionSelect(fetchedQuestions[0].ID);
          setSelectedQuestionIndex(0);
          setSelectedQuestion(fetchedQuestions[0]);
        }
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 401) {
          router.push("/");
          return;
        }
        toast.error("Failed to fetch questions");
        setTimeout(() => {
          router.push("/kitchen");
        }, 2000);
      }
    };

    void fetchQuestions();
  }, [router]);

  return (
    <div className="flex h-[83vh] w-[45%] flex-row overflow-y-scroll bg-gray1 2xl:h-[86vh]">
      <div className="sticky top-0 flex flex-col text-white">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionChange(question.ID, index)}
            className={`flex h-full items-center justify-center border-b border-gray-700 px-4 text-center text-xl last:border-0 hover:bg-dark ${question.ID === selectedQuestionId ? "bg-gray1" : "bg-black"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="ml-2 w-screen text-white">
        {selectedQuestion && (
          <div className="p-4 pr-5">
            <span className="text-3xl font-bold text-accent">
              PROBLEM {selectedQuestionIndex + 1}: {selectedQuestion.Title}
            </span>
            <div className="w-[80px] bg-lightcream2 text-center text-sm text-lightcream">
              {selectedQuestion.Points} Points
            </div>
            <div className="my-5">
              <span className="mr-8 text-xl text-accent">Problem</span>
            </div>
            {/* <div style={{ whiteSpace: "pre-line" }}></div> */}
            <div className="markdown">
              <Markdown>{selectedQuestion.Description}</Markdown>
            </div>

            {selectedQuestion.InputFormat && (
              <div>
                <span className="mr-8 text-xl text-accent">Input Format:</span>
                <div className="markdown">
                  <Markdown>
                    {selectedQuestion.InputFormat.map(
                      (item) => `- ${item}`,
                    ).join("\n")}
                  </Markdown>
                </div>
              </div>
            )}

            {selectedQuestion.Constraints && (
              <div>
                <div className="mr-8 text-xl text-accent">Constraints:</div>
                <div className="markdown">
                  <Markdown>
                    {selectedQuestion.Constraints.map(
                      (item) => `- ${item}`,
                    ).join("\n")}
                  </Markdown>
                </div>
              </div>
            )}

            {selectedQuestion.OutputFormat && (
              <div>
                <div className="mr-8 text-xl text-accent">Output Format:</div>
                <div className="mt-4">
                  <Markdown>
                    {selectedQuestion.OutputFormat.map(
                      (item) => `- ${item}`,
                    ).join("\n")}
                  </Markdown>
                </div>
              </div>
            )}

            {(() => {
              const sampleCount = Math.max(
                selectedQuestion.SampleTestInput?.length || 0,
                selectedQuestion.SampleTestOutput?.length || 0,
                selectedQuestion.Explanation?.length || 0,
              );

              return Array.from({ length: sampleCount }).map((_, i) => (
                <div key={i}>
                  {selectedQuestion.SampleTestInput?.[i] && (
                    <div className="mt-4">
                      <div className="mb-4 mr-8 text-xl text-accent">
                        Sample Input {i + 1}:
                      </div>
                      <SyntaxHighlighter
                        language="plaintext"
                        style={vscDarkPlus}
                        className="my-4 rounded-md"
                      >
                        {selectedQuestion.SampleTestInput[i]}
                      </SyntaxHighlighter>
                    </div>
                  )}

                  {selectedQuestion.SampleTestOutput?.[i] && (
                    <div className="mt-4">
                      <div className="mb-4 mr-8 text-xl text-accent">
                        Sample Output {i + 1}:
                      </div>

                      <SyntaxHighlighter
                        language="plaintext"
                        style={vscDarkPlus}
                        className="my-2 rounded-md"
                      >
                        {selectedQuestion.SampleTestOutput[i]}
                      </SyntaxHighlighter>
                    </div>
                  )}

                  {selectedQuestion.Explanation?.[i] && (
                    <div className="mt-4">
                      <div className="mb-4 mr-8 text-xl text-accent">
                        Explanation {i + 1}:
                      </div>
                      <Markdown>{selectedQuestion.Explanation[i]}</Markdown>
                    </div>
                  )}
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
