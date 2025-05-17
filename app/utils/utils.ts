import { User, Task, ensureUuid } from "@/app/types/types";

export const saveUserInLocalStorage = (user: User): void => {
  localStorage.setItem(`user_${user.username}`, JSON.stringify(user));
};

export const userExistsInLocalStorage = (username: string): boolean => {
  return localStorage.getItem(`user_${username}`) !== null;
};

export const validateUserInLocalStorage = (
  username: string,
  password: string
): boolean => {
  const userJson = localStorage.getItem(`user_${username}`);
  if (!userJson) return false;

  const user = JSON.parse(userJson) as User;
  return user.password === password;
};

export const saveLoginStateInLocalStorage = (username: string): void => {
  localStorage.setItem("currentUser", username);
};

export const isLoggedIn = (): string | null => {
  return localStorage.getItem("currentUser");
};

export const logoutInLocalStorage = (): void => {
  localStorage.removeItem("currentUser");
};

export const saveTasksInLocalStorage = (tasks: Task[]): void => {
  const currentUser = isLoggedIn();
  if (!currentUser) return;

  localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
};

export const getTasksInLocalStorage = (): Task[] => {
  const currentUser = isLoggedIn();
  if (!currentUser) return [];

  const tasks = localStorage.getItem(`tasks_${currentUser}`);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTaskInLocalStorage = (task: Task): void => {
  const currentUser = isLoggedIn();
  if (!currentUser) return;

  const tasks = getTasksInLocalStorage();
  const newTask: Task = {
    ...task,
    id: ensureUuid(),
    userId: parseInt(currentUser),
  };

  tasks.push(newTask);
  saveTasksInLocalStorage(tasks);
};

export const deleteTaskInLocalStorage = (taskId: string): void => {
  const tasks = getTasksInLocalStorage();
  const filteredTasks = tasks.filter((task) => task.id !== parseInt(taskId));
  saveTasksInLocalStorage(filteredTasks);
};

export const updateTaskInLocalStorage = (
  taskId: string,
  updatedTask: Partial<Task>
): void => {
  const tasks = getTasksInLocalStorage();
  const updatedTasks = tasks.map((task) =>
    task.id === parseInt(taskId) ? { ...task, ...updatedTask } : task
  );
  saveTasksInLocalStorage(updatedTasks);
};
