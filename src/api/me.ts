import { handleAPIError } from "@/lib/error";
import { dashboard, type ApiResponse } from "@/schemas/api";
import api from ".";

export async function me() {
  try {
    const { data } = await api.get<ApiResponse>(`/me`);
    const payload = data.data as dashboard;
    return payload;
  } catch (e) {
    throw handleAPIError(e);
  }
}
