"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/app/schemas/auth";
import {
  validateUserInLocalStorage,
  saveLoginStateInLocalStorage,
  isLoggedIn,
} from "@/app/utils/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fa } from "@/app/languages/fa";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    }
  }, [router]);

  const onSubmit = (data: LoginFormValues) => {
    if (validateUserInLocalStorage(data.username, data.password)) {
      saveLoginStateInLocalStorage(data.username);
      router.push("/dashboard");
    } else {
      setError(fa.USERNAME_OR_PASSWORD_IS_INCORRECT);
    }
  };

  return (
    <div className="w-[327px] mx-auto px-8 py-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{fa.LOGIN.title}</h2>

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

        <Button type="submit" className="w-full">
          {fa.LOGIN.title}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p>
          {fa.SIGNUP.dontHaveAccount}{" "}
          <Link href="/signup" className="text-blue-500">
            {fa.SIGNUP.title}
          </Link>
        </p>
      </div>
    </div>
  );
}
