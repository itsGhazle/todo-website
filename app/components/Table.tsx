import { Task, TaskStatus } from "@/app/types/types";
import { fa } from "@/app/languages/fa";
import Button from "@/app/ui/Button";
export default function TaskViewTable({
  tasks,
  handleStatusChange,
  getStatusColor,
  handleDelete,
}: {
  tasks: Task[];
  handleStatusChange: (id: string, status: string) => void;
  getStatusColor: (status: TaskStatus) => string;
  handleDelete: (id: string) => void;
}) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            {fa.TASK.name}
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            {fa.TASK.date}
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            {fa.TASK.status}
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            {fa.TASK.action}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.date}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <select
                value={task.status._tag}
                onChange={(e) =>
                  handleStatusChange(task.id.toString(), e.target.value)
                }
                className={`${getStatusColor(task.status)} rounded py-0.5`}
              >
                <option value="not_started">
                  {fa.TASK_STATUS.not_started}
                </option>
                <option value="in_progress">
                  {fa.TASK_STATUS.in_progress}
                </option>
                <option value="completed">{fa.TASK_STATUS.completed}</option>
              </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Button
                onClick={() => handleDelete(task.id.toString())}
                className="text-red-600 "
              >
                {fa.DELETE}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
