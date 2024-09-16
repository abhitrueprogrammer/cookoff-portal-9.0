"use client";
import { useState } from "react";
import { questions } from "@/app/sampleQuestion";


const Question = () => {
  
  const [selectedQuestionId, setSelectedQuestionId] = useState(questions[0].ID);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const handleQuestionChange = (id, index) => {
    setSelectedQuestionId(id);
    setSelectedQuestionIndex(index);
  };

  const selectedQuestion = questions.find(question => question.ID === selectedQuestionId);

  return (
    <div  className="bg-gray1 flex flex-row h-screen w-[50vw]">
      
      
      <div className="flex flex-col w-[3vw] text-white ">
        {questions.map((question, index) => (
          <div
            key={question.ID}
            onClick={() => handleQuestionChange(question.ID, index)}
            className={`flex justify-center h-[80px] p-[22px] text-xl text-center border-b border-gray-700 cursor-pointer
             ${question.ID === selectedQuestionId ? 'bg-gray1' : 'bg-black'}`}
          >
            <span className="h-full">{index + 1}</span>
          </div>
        ))}
      </div>

      
      <div className="ml-2 w-screen p-4 text-white ">
        {selectedQuestion && (
          <div>
            <span className="text-accent text-3xl font-bold">PROBLEM {selectedQuestionIndex + 1}: {selectedQuestion.Title}</span>
            <div className="bg-lightcream2 text-lightcream w-[80px] text-sm text-center ">{selectedQuestion.Points} Points</div>
            <div className="my-[20px]">
            <span className="text-accent text-xl mr-8">
              Problem
            </span>
            <span className="text-lightcream text-xl">
              My Submissions
            </span>
            </div>
            <p>{selectedQuestion.Description}</p>
            <br /><br />
            <p><strong>Input Format:</strong><br /> {selectedQuestion.InputFormat}</p>
            <br />
            <p><strong>Constraints:</strong><br /> {selectedQuestion.Constraints}</p>
            <br />
            <p><strong>Output Format:</strong> <br />{selectedQuestion.OutputFormat}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
