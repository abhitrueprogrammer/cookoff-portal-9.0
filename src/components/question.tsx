"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { cookies } from "next/headers";


interface Question {
  ID: string;
  Description: string;
  Title: string;
  InputFormat: string;
  Points: number;
  Round: number;
  Constraints: string;
  OutputFormat: string;
}

const Question = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

  const login = async () => {
    try {
      const response = await axios.post(
        "https://hope.codechefvit.com/login/user",
        { email: "vedant.matanhelia@gmail.com", password: "]%-pmK" },
        { withCredentials: true }
      );
      console.log("Login successful:", response.data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const refresh = async () => {
    try {
      const response = await axios.post(
        "https://hope.codechefvit.com/token/refresh",
        {},
        { withCredentials: true }
      );
      console.log("Token refreshed:", response.data);
    } catch (err) {
      console.error("Token refresh failed:", err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("https://hope.codechefvit.com/question/round", {
        withCredentials: true,
      });
      const fetchedQuestions = response.data.map((item: any) => item.question); 
      setQuestions(fetchedQuestions);
      if (fetchedQuestions.length > 0) {
        setSelectedQuestionId(fetchedQuestions[0].ID); 
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      await login();
      setTimeout(async () => {
        await refresh();
        await fetchQuestions();
      }, 2000);
    };

    authenticateAndFetchData();
  }, []);

  const handleQuestionChange = (id: string, index: number) => {
    setSelectedQuestionId(id);
    setSelectedQuestionIndex(index);
  };

  const selectedQuestion = questions.find(
    (question) => question.ID === selectedQuestionId
  );

  return (
    <div className="bg-gray1 flex flex-row h-[86vh] w-[45%] overflow-y-scroll">
      <div className="flex flex-col w-[3vw] text-white ">
        {questions.map((question) => (
          <div
            key={question.ID}
            onClick={() => handleQuestionChange(question.ID, selectedQuestionIndex)}
            className={`flex justify-center h-[80px] p-[22px] text-xl text-center border-b border-gray-700 cursor-pointer
             ${question.ID === selectedQuestionId ? "bg-gray1" : "bg-black"}`}>
            <span className="h-full">{selectedQuestionIndex + 1}</span>
          </div>
        ))}
      </div>

      <div className="ml-2 w-screen p-4 text-white">
        {selectedQuestion && (
          <div>
            <span className="text-accent text-3xl font-bold">
              PROBLEM {selectedQuestionIndex + 1}: {selectedQuestion.Title}
            </span>
            <div className="bg-lightcream2 text-lightcream w-[80px] text-sm text-center">
              {selectedQuestion.Points} Points
            </div>
            <div className="my-5">
              <span className="text-accent text-xl mr-8">Problem</span>
              <span className="text-lightcream text-xl">My Submissions</span>
            </div>
            <p>{selectedQuestion.Description}</p>
            <br />
            <br />
            <p>
              <strong>Input Format:</strong>
              <br /> {selectedQuestion.InputFormat}
            </p>
            <br />
            <p>
              <strong>Constraints:</strong>
              <br /> {selectedQuestion.Constraints}
            </p>
            <br />
            <p>
              <strong>Output Format:</strong> <br />
              {selectedQuestion.OutputFormat}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;