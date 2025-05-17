import { z } from "zod";
import { fa } from "@/app/languages/fa";
export const taskSchema = z.object({
  name: z.string().min(1, { message: fa.TASK_NAME_CANNOT_BE_EMPTY }),
  date: z.string().min(1, { message: fa.TASK_DATE_CANNOT_BE_EMPTY }),
  status: z.enum(["not_started", "in_progress", "completed"], {
    required_error: fa.TASK_STATUS_CANNOT_BE_EMPTY,
  }),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
