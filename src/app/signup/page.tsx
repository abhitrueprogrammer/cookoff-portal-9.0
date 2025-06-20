"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import cookoff from "@/assets/images/cookoff.svg";
import api from "@/api";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .refine((email) => email.endsWith("@vitstudent.ac.in"), {
      message: "Email must be from vitstudent.ac.in domain.",
    }),
  regNumber: z.string().min(1, {
    message: "Registration number is required.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Signup() {
  const [password, setPassword] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      regNumber: "",
      username: "",
    },
  });
  const router = useRouter();

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.success("Password copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy password");
      });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    return toast.promise(
      (async () => {
        const response = await api.post<{
          message: string;
          email: string;
          password: string;
        }>("/user/signup", {
          email: values.email,
          name: values.name,
          reg_no: values.regNumber,
          fuck_you: "soham",
        });
        setPassword(response.data.password);
        return response.data;
      })(),
      {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: "Failed to create account",
      },
    );
  }

  return (
    <div className="min-w-screen relative flex h-screen flex-col items-center justify-center gap-10 bg-[#202020] text-accent">
      <h1 className="s-sling absolute top-2 pt-5 text-3xl font-bold text-accent">
        SENIOR CORE PRESENTS
      </h1>
      <div className="mt-8 flex w-full flex-row items-center">
        <div className="flex w-1/2 flex-col">
          <div className="flex flex-col items-end">
            <Image
              className="ml-20 mr-10 pl-14"
              src={cookoff as HTMLImageElement}
              alt="cookoff text"
              width={580}
              height={400}
            />
            <p className="s-sling text-2xl" style={{ margin: "-50px 50px" }}>
              INTERNAL
            </p>
          </div>
        </div>

        <div className="flex w-1/2">
          <div
            className="mx-auto flex h-fit w-[500px] flex-col items-center justify-center bg-viewSubmission text-white"
            style={{
              clipPath:
                "polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)",
            }}
          >
            <div
              className="flex h-full w-full scale-95 flex-col items-center justify-center bg-black p-6 text-white"
              style={{
                clipPath:
                  "polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)",
              }}
            >
              <h1 className="accent s-sling mb-6 p-5 text-3xl font-bold">
                SIGN UP TO COOK
              </h1>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mb-6 h-auto w-[390px] rounded-sm bg-viewSubmission p-3 !placeholder-white"
                            placeholder="Full Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            className="mb-6 h-auto w-[390px] rounded-sm bg-viewSubmission p-3 !placeholder-white"
                            placeholder="Enter Your VIT Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="regNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mb-6 h-auto w-[390px] rounded-sm bg-viewSubmission p-3 !placeholder-white"
                            placeholder="Registration No."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mb-6 h-auto w-[390px] rounded-sm bg-viewSubmission p-3 !placeholder-white"
                            placeholder="Username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <Button
                      type="submit"
                      className="s-sling h-auto bg-accent py-4 text-white hover:bg-accent"
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      className="s-sling h-auto bg-accent py-4 text-white hover:bg-accent"
                      onClick={() => router.push("/")}
                    >
                      Back to Login
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-300">
                <p className="flex-1">
                  {password ? (
                    <>
                      Your password is:{" "}
                      <span className="text-accent">{password}</span>. Please
                      save it securely.
                    </>
                  ) : (
                    "Your password will be generated after submission."
                  )}
                </p>

                {password && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copy password to clipboard"
                    className="rounded p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="s-sling absolute bottom-3 pt-5 text-3xl font-bold text-white">
        A COOKING COMPETITION
      </h1>
    </div>
  );
}
