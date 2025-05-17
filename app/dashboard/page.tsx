import Dashboard from "@/app/components/Dashboard";
import { TaskProvider } from "@/app/context/TaskContext";
export default function DashboardPage() {
  return (
    <div className="rounded-lg shadow overflow-hidden h-screen overflow-y-auto">
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </div>
  );
}
