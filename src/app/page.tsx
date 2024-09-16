import Question from "@/components/question";
import EditorWindow from "@/components/editorwindow/EditorWindow";
import QuesNavbar from "@/components/quesNavBar";
export default function HomePage() {
  return (
    <main className="overflow-y-none">
      <QuesNavbar/>
      <div className="flex bg-dark2">
      <Question/>
      <EditorWindow/>
      </div>
    </main>
  );
}
