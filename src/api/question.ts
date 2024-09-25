import { handleAPIError } from "@/lib/error";
import { type Question } from "@/schemas/api";
import api from ".";

interface QuestionResponse {
  question: Question;
}

export async function byRound() {
  try {
    const { data } = await api.get<QuestionResponse[]>(`/question/round`);
    return data;
  } catch (e) {
    throw handleAPIError(e);
  }
}
