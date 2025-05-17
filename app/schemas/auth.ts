import { z } from "zod";
import { fa } from "@/app/languages/fa";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: fa.USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS }),
  password: z
    .string()
    .trim()
    .min(6, { message: fa.PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS }),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: fa.USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS }),
    password: z
      .string()
      .trim()
      .min(6, { message: fa.PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            fa.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER_AND_LOWERCASE_LETTER_AND_ONE_NUMBER_AND_ONE_SPECIAL_CHARACTER,
        }
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: fa.CONFIRM_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: fa.CONFIRM_PASSWORD_MUST_BE_THE_SAME,
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
