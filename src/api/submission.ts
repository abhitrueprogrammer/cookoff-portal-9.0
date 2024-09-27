
import api from ".";
import { handleAPIError } from "@/lib/error";



export async function submission(submission_id: string) {
    try {
        const { data } = await api.get(
          `/result/${submission_id}`
        );
        return data;
      } catch (e) {
        throw handleAPIError(e);
      }
}
