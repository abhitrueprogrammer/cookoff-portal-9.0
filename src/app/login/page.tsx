'use client';
import { handleAPIError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
const FormSchema = z.object({
    username: z.string().trim(),
    password: z
        .string()
        .min(6, "Password must not be lesser than 6 characters")
        .max(20, "Password must not be greater than 20 characters")
        .trim(),
});
type FormInput = z.infer<typeof FormSchema>;

export default function Login() {
    const [, setIsLoading] = useState(false);
    const [, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>({
        resolver: zodResolver(FormSchema),
    });
    interface LoginResponse {
        message: string
        user: {
            round: number
            score: number | null
            username: string
        }

    }
    async function login(email: string, password: string) {
        try {
            setIsLoading(true);
            setError(null);

            const { data } = await axios.post<LoginResponse>(
                "https://hope.codechefvit.com/login/user",
                { email, password },
                { withCredentials: true }
            );
            return data.message;
        } catch (e) {
            throw handleAPIError(e);
        } finally {
            setIsLoading(false);
        }
    }
    async function onSubmit(data: FormInput) {
        try {
            await toast.promise(login(data.username, data.password), {
                loading: "Cooking...",
                success: "Logged in successfully!",
                error: (err: AxiosError) => {
                    switch (err.response?.status) {
                        case 404:
                            return "Account not found!";
                        case 409:
                            return "Incorrect credentials!";
                        case 403:
                            setTimeout(() => {
                                window.location.href = `/signup/verify?email=${data.username}`;
                            }, 1500);
                            return "Email not verified. Redirecting...";
                        case 423:
                            setTimeout(() => {
                                window.location.href = `/signup/details?email=${data.username}`;
                            }, 1500);
                            return "Complete your profile. Redirecting...";
                        case 400:
                            return "Please check your input and try again!";
                        default:
                            return "Something went wrong!";
                    }
                },
            });
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Login failed:", err);
        }
    }

    return (
        <div className="bg-[#202020] min-h-screen min-w-screen text-accent flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold pt-5">CODECHEF PRESENTS</h1>
            <div className="flex flex-row w-full mt-8">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <Image
                            className="pl-14"
                            src="cookoff.svg"
                            alt="cookoff text"
                            width={700}
                            height={600}
                        />
                    </div>
                </div>
                <div className="bg-viewSubmission text-white h-[510px] w-[420px] flex flex-col justify-center items-center " style={{
                    clipPath: 'polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)'
                }}>
                    <div className="bg-black text-white h-[575px] w-[435px] flex flex-col justify-center items-center scale-95" style={{
                        clipPath: 'polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)'
                    }}>
                        <h1 className="text-3xl font-bold p-5 mb-6 accent">START COOKING</h1>
                        <input
                            {...register("username")}
                            type="text"
                            className="bg-viewSubmission p-3 w-[390px] rounded-sm mb-6 placeholder-white"
                            placeholder="Enter Username"
                            required
                        />{errors?.username?.message && (
                            <p className="text-viewSubmission mb-4">{errors.username.message}</p>
                        )}
                        <input
                            {...register("password")}
                            type="password"
                            className="bg-viewSubmission p-3 w-[390px] rounded-sm mb-6 placeholder-white"
                            placeholder="Enter Password"
                            required
                        />
                        {errors?.password?.message && (
                            <p className="text-viewSubmission mb-4">{errors.password.message}</p>
                        )}
                        <br />
                        <button className="bg-accent text-white p-3 rounded-md w-[100px]" onClick={handleSubmit(onSubmit)}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl text-white font-bold pt-5">NOT A COOKING COMPETITION</h1>
        </div>
    );
}