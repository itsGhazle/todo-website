"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskList from "@/app/components/TaskList";
import { logoutInLocalStorage, isLoggedIn } from "@/app/utils/utils";
import Spinner from "@/app/ui/Spinner";
import { fa } from "@/app/languages/fa";
import AddTask from "@/app/components/AddTask";
import { useTaskContext } from "@/app/context/TaskContext";
import Button from "@/app/ui/Button";

export default function Dashboard() {
  const router = useRouter();
  const { state } = useTaskContext();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = isLoggedIn();
    if (!user) {
      router.push("/login");
      return;
    }

    setUsername(user);
  }, [router]);

  const handleLogout = () => {
    logoutInLocalStorage();
    router.push("/login");
  };

  if (!username) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 h-screen">
      <div className=" p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-base font-semibold">{fa.DASHBOARD.title}</h1>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded transition"
          >
            {fa.DASHBOARD.logout}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <AddTask />
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-base font-semibold mb-4">
              {fa.STATISTICS.title}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{fa.STATISTICS.username}:</span>
                <span>{username}</span>
              </div>
              <div className="flex justify-between">
                <span>{fa.STATISTICS.totalTasks}:</span>
                <span>{state.tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span>{fa.STATISTICS.completedTasks}:</span>
                <span>
                  {
                    state.tasks.filter((t) => t.status._tag === "completed")
                      .length
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-base font-semibold mb-4">
              {fa.TASK_LIST.title}
            </h2>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}
