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
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            {fa.USERNAME}
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="w-full p-2 border rounded-md"
          />
          {errors.username && (
            <p className="text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            {fa.PASSWORD}
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full p-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
            {fa.SIGNUP.confirmPassword}
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-full p-2 border rounded-md"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

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
