"use client";

import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { fa } from "./languages/fa";

export default function Home() {
  return (
    <main className="mx-auto p-4 md:p-8 h-screen">
      <h1 className="text-base md:text-lg font-semibold mb-8 text-center">
        {fa.DASHBOARD.title}
      </h1>

      <TaskProvider>
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg shadow-md lg:col-span-1">
            <AddTask />
          </div>

          <div className="p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-base font-semibold mb-4">
              {fa.TASK_LIST.title}
            </h2>
            <TaskList />
          </div>
        </div>
      </TaskProvider>
    </main>
  );
}
