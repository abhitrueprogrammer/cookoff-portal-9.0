import { type CodeSubmission, type SubmissionResponse } from "@/schemas/api";
import api from ".";
import { handleAPIError } from "@/lib/error";


export async function submission(codesubmission: CodeSubmission){
    try {
        const { data } = await api.post<SubmissionResponse>(
          `/submit`,
          codesubmission,
        );
        const submissionId = data.submission_id;
        return submissionId;
      } catch (e) {
        throw handleAPIError(e);
      }
}
