
import api from ".";
import { handleAPIError } from "@/lib/error";
import { type TaskResult } from "@/schemas/api";


export async function submission(submission_id: string) {
    try {
        const { data } = await api.get<TaskResult>(
          `/result/${submission_id}`
        );
        return data;
      } catch (e) {
        throw handleAPIError(e);
      }
}
