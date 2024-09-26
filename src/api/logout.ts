import { handleAPIError } from "@/lib/error";
import api from ".";

export async function logout() {
  try {
    await api.post(`/logout`);
    return true;
  } catch (e) {
    throw handleAPIError(e);
  }
}
