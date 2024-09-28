"use client";
import { submit } from "@/api/submit";
import EditorWindow from "@/components/EditorWindow";
import QuesNavbar from "@/components/quesNavBar";
import QuestionComponent from "@/components/question";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type Question } from "@/schemas/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const languageIds = [71, 62, 50, 54, 63, 73, 60];

export default function HomePage() {
  const router = useRouter();
  const [timeOver, setTimeOver] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");

  const handleSelectedQuestionId = (id: string) => {
    setSelectedQuestionId(id);
  };

  useEffect(() => {
    async function autoSubmitCode() {
      for (const i of questions) {
        for (const lang of languageIds) {
          const latestCodeForLanguage = localStorage.getItem(
            `code-${i.ID}-${lang}`,
          );
          if (!latestCodeForLanguage) {
            continue;
          }
          await submit({
            source_code: latestCodeForLanguage,
            language_id: lang,
            question_id: i.ID,
          });
        }
      }
      setTimeOver(false);
      setTimeout(() => {
        router.push("/test-complete");
      });
    }

    if (timeOver) {
      void autoSubmitCode();
    }
  }, [questions, router, timeOver]);

  useEffect(() => {
    function closeTabAlert(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
      window.alert(
        "Are you sure you want to close the tab? Your progress will be lost.",
      );
    }

    addEventListener("beforeunload", closeTabAlert);

    return () => {
      removeEventListener("beforeunload", closeTabAlert);
    };
  }, []);

  return (
    <main className="overflow-y-none">
      <QuesNavbar setTimeOver={setTimeOver} />

      <AlertDialog open={timeOver} onOpenChange={() => setTimeOver(false)}>
        <AlertDialogContent aria-describedby="">
          <AlertDialogTitle>Time Over</AlertDialogTitle>
          <p className="text-lg">
            Please wait while your codes are being submitted.
          </p>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex bg-dark2">
        <QuestionComponent
          questions={questions}
          setQuestions={setQuestions}
          onQuestionSelect={handleSelectedQuestionId}
        />
        <EditorWindow selectedQuestionId={selectedQuestionId} />
      </div>
    </main>
  );
}
