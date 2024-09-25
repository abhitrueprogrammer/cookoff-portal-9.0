export interface ApiResponse {
  message: string;
  data: unknown;
}

export interface User {
  round: number;
  score: number | null;
  username: string;
}

export interface Submission {
  title: string;
  description: string | null;
  score: number;
}
export interface dashboard {
  round: number;
  score: number;
  submissions: Record<string, Submission[]>;
  username: string;
}

export interface APIResponse {
  message: string;
  data: dashboard;
}