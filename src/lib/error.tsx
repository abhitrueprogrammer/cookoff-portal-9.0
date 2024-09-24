import axios, { type AxiosError } from "axios";

export function handleAPIError(err: unknown) {
    if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        const response = error.response;
        const data = response?.data;
        if (data) {
            const msg = (data as { error: string })?.error;
            if (msg) {
                return new Error(msg);
            }
        }
    }
    return new Error("Something went wrong");
}
