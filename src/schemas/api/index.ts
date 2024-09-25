export interface ApiResponse {
  message: string;
  data: unknown;
}

export interface User {
  round: number;
  score: number | null;
  username: string;
}
export interface CodeSubmission {
  source_code: string;
  language_id: number;
  question_id: string;
}
export interface SubmissionResponse {
  submission_id: string;
}
export interface CodeEditorProps {
  selectedquestionId: string; 
}