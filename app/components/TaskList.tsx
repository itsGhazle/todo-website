"use client";

import React from "react";
import { TaskStatus } from "@/app/types/types";
import { useTaskContext } from "@/app/context/TaskContext";
import { fa } from "@/app/languages/fa";
import Spinner from "@/app/ui/Spinner";
import TaskViewTable from "@/app/components/Table";

export default function TaskList() {
  const { state, updateTask, deleteTask } = useTaskContext();
  const { tasks, loading, error } = state;

  const handleDelete = (id: number | string) => {
    deleteTask(id);
  };

  const handleStatusChange = (id: number | string, statusTag: string) => {
    const status: TaskStatus = {
      _tag: statusTag as "not_started" | "in_progress" | "completed",
    };
    updateTask(id, { status });
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status._tag) {
      case "not_started":
        return "bg-gray-200";
      case "in_progress":
        return "bg-blue-200";
      case "completed":
        return "bg-green-200";
      default:
        return "bg-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center p-4 text-red-500">{error}</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center p-4">{fa.THERE_IS_NO_TASK}</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto overflow-y-auto">
      <TaskViewTable
        tasks={tasks}
        getStatusColor={getStatusColor}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}
