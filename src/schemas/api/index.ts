export interface ApiResponse {
  message: string;
  data: unknown;
}

export interface User {
  round: number;
  score: number | null;
  username: string;
}
