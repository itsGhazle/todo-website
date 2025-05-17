"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/app/schemas/auth";
import {
  saveUserInLocalStorage,
  userExistsInLocalStorage,
} from "@/app/utils/utils";
import { useRouter } from "next/navigation";
import { fa } from "@/app/languages/fa";
import Link from "next/link";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";

export default function SignupForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    if (userExistsInLocalStorage(data.username)) {
      setError(fa.SIGNUP.usernameExists);
      return;
    }

    saveUserInLocalStorage({
      username: data.username,
      password: data.password,
    });

    router.push("/login");
  };

  return (
    <div className="w-[327px] mx-auto px-8 py-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{fa.SIGNUP.title}</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={fa.USERNAME}
          id="username"
          type="text"
          {...register("username")}
          error={errors.username}
        />

        <Input
          label={fa.PASSWORD}
          id="password"
          type="password"
          {...register("password")}
          error={errors.password}
        />

        <Input
          label={fa.SIGNUP.confirmPassword}
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <Button type="submit" className="w-full">
          {fa.SIGNUP.title}
        </Button>
      </form>

      <div className="mt-4 text-center">
        {fa.SIGNUP.alreadyHaveAccount}{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          {fa.LOGIN.title}
        </Link>
      </div>
    </div>
  );
}
