import { handleAPIError } from "@/lib/error";
import { type ApiResponse } from "@/schemas/api";
import { type loginFormSchema } from "@/schemas/forms/login";
import { type z } from "zod";
import api from ".";

export async function logout() {
  try {
    const { data } = await api.post(`/logout`);
    return true;
  } catch (e) {
    throw handleAPIError(e);
  }
}
