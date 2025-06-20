"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import api from "@/api";

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

export function ProfileForm() {
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
        }>("/signup/user", {
          email: values.email,
          name: values.name,
          reg_no: values.regNumber,
          pswd_key: process.env.PSWD_KEY,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Enter your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="yourname@vitstudent.ac.in"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your VIT student email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="regNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="REG123456" {...field} />
              </FormControl>
              <FormDescription>
                Your unique registration number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>

      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
        <p className="flex-1">
          {password
            ? `Your password is: ${password}. Please save it securely.`
            : "Your password will be generated after submission."}
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
    </Form>
  );
}
