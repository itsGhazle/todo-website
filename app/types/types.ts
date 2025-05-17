export type NonEmptyString = string & { __brand: "NonEmptyString" };
export function ensureNonEmpty(str: string): NonEmptyString {
  if (str.length === 0) {
    throw new Error("String must not be empty");
  }
  return str as NonEmptyString;
}
export type Uuid = number & { __brand: "Uuid" };
export function ensureUuid(): Uuid {
  const uuid = Math.floor(Math.random() * 1000);
  if (uuid < 0) {
    throw new Error("Invalid UUID");
  }
  return uuid as Uuid;
}

export interface TaskStatus {
  _tag: "not_started" | "in_progress" | "completed";
}

export interface User {
  username: string;
  password: string;
}

export interface Task {
  id: number;
  name: string;
  date: string;
  status: TaskStatus;
}
