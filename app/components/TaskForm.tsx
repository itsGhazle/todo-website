"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormValues } from "@/app/schemas/task";
import { addTaskInLocalStorage } from "@/app/utils/utils";
import { fa } from "@/app/languages/fa";

export default function TaskForm({ onTaskAdded }: { onTaskAdded: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "not_started",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    addTaskInLocalStorage(data);
    reset();
    onTaskAdded();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{fa.ADD_TASK}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            {fa.TASK.name}
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 mb-2">
            {fa.TASK.date}
          </label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className="w-full p-2 border rounded-md"
          />
          {errors.date && (
            <p className="text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block text-gray-700 mb-2">
            {fa.TASK.status}
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full p-2 border rounded-md"
          >
            <option value="not_started">{fa.TASK_STATUS.not_started}</option>
            <option value="in_progress">{fa.TASK_STATUS.in_progress}</option>
            <option value="completed">{fa.TASK_STATUS.completed}</option>
          </select>
          {errors.status && (
            <p className="text-red-500 mt-1">{errors.status.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          {fa.ADD_TASK}
        </button>
      </form>
    </div>
  );
}
