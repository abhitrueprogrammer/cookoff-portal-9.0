'use client';
import cookoff from "@/assets/images/cookoff.svg";
import mm from "@/assets/images/mm.svg";
import { handleAPIError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    const [isLoading, setIsLoading] = useState(false);
    const [, setError] = useState<string | null>(null);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

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
                                void router.push("/signup/verify?email=" + data.username);
                            }, 1500);
                            return "Email not verified. Redirecting...";
                        case 423:
                            setTimeout(() => {
                                void router.push("/signup/details?email=" + data.username);
                            }, 1500);
                            return "Complete your profile. Redirecting...";
                        case 400:
                            return "Please check your input and try again!";
                        default:
                            return "Something went wrong!";
                    }
                },
            });
            void router.push("/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
        }
    }
    return (
        <div className="bg-[#202020] min-h-screen min-w-screen text-accent flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold pt-5 text-accent s-sling">CODECHEF PRESENTS</h1>
            <div className="flex flex-row w-full mt-8">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <Image
                            className="pl-14 ml-20 mr-10"
                            src={cookoff as HTMLImageElement}
                            alt="cookoff text"
                            width={580}
                            height={400}
                        />
                        <div className="relative">
                            <Image
                                className="absolute translate-x-[95%]"
                                src={mm as HTMLImageElement}
                                alt="muscle mind logo"
                                width={150}
                                height={150}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-viewSubmission text-white h-[510px] w-[450px] flex flex-col justify-center items-center" style={{
                    clipPath: 'polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)'
                }}>
                    <div className="bg-black text-white h-[575px] w-[450px] flex flex-col justify-center items-center scale-95" style={{
                        clipPath: 'polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)'
                    }}>
                        <h1 className="text-3xl font-bold p-5 mb-6 accent s-sling">START COOKING</h1>
                        <input
                            {...register("username")}
                            type="text"
                            className="bg-viewSubmission p-3 w-[390px] rounded-sm mb-6 placeholder-white"
                            placeholder="Enter Username"
                            required
                        />{errors?.username?.message && (
                            <p className="text-viewSubmission mb-4">{errors.username.message}</p>
                        )}
                        <div className="relative">
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                className="bg-viewSubmission p-3 w-[390px] rounded-sm mb-6 placeholder-white"
                                placeholder="Enter Password"
                                required
                            />
                            <span
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} className="text-black mb-5" />
                                ) : (
                                    <Eye size={20} className="text-black mb-5" />
                                )}
                            </span>
                        </div>
                        {errors?.password?.message && (
                            <p className="text-viewSubmission mb-4">{errors.password.message}</p>
                        )}
                        <br />
                        <button className="bg-accent s-sling text-white p-3 rounded-md w-[100px] " disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl text-white font-bold pt-5 s-sling">NOT A COOKING COMPETITION</h1>
        </div>
    );
}