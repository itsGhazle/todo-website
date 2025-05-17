"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { Task } from "@/app/types/types";
import {
  saveTasksInLocalStorage,
  getTasksInLocalStorage,
} from "@/app/utils/utils";
export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | {
      type: "UPDATE_TASK";
      payload: { id: number | string; updates: Partial<Task> };
    }
  | { type: "DELETE_TASK"; payload: number | string }
  | { type: "SET_TASKS"; payload: Task[] };

interface TaskState {
  tasks: Task[];
  totalTask: number;
  completedTask: number;
  loading: boolean;
  error: string;
}

const initialState: TaskState = {
  tasks: [],
  loading: true,
  totalTask: 0,
  completedTask: 0,
  error: "",
};

function reducer(state: TaskState, action: TaskAction): TaskState {
  let updatedTasks: Task[];

  switch (action.type) {
    case "ADD_TASK":
      saveTasksInLocalStorage([...state.tasks, action.payload]);
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        totalTask: state.totalTask + 1,
      };

    case "UPDATE_TASK":
      updatedTasks = state.tasks.map((task) =>
        task.id.toString() === action.payload.id.toString()
          ? { ...task, ...action.payload.updates }
          : task
      );
      saveTasksInLocalStorage(updatedTasks);
      return {
        ...state,
        tasks: updatedTasks,
        totalTask: state.totalTask - 1,
        completedTask: state.completedTask + 1,
      };

    case "DELETE_TASK":
      updatedTasks = state.tasks.filter(
        (task) => task.id.toString() !== action.payload.toString()
      );
      saveTasksInLocalStorage(updatedTasks);
      return {
        ...state,
        tasks: updatedTasks,
      };

    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

interface TaskContextType {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: number | string, updates: Partial<Task>) => void;
  deleteTask: (id: number | string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const tasks = getTasksInLocalStorage();
    dispatch({ type: "SET_TASKS", payload: tasks });
  }, []);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now(),
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const updateTask = (id: number | string, updates: Partial<Task>) => {
    dispatch({ type: "UPDATE_TASK", payload: { id, updates } });
  };

  const deleteTask = (id: number | string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <TaskContext.Provider
      value={{ state, dispatch, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
