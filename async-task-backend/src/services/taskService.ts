import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import type { Id } from "../models/id.js";
import type { Task } from "../models/task.js";
import type { User } from "../models/user.js";
import { NotFoundError, ValidationError } from "../errors.js";

/** Demo user available from startup. */
export const demoUser: User = { id: "user-1", name: "Demo User" };

// In-memory storage: lost when the process exits.
const users = new Map<Id, User>([[demoUser.id, demoUser]]);
const tasks = new Map<Id, Task>();

/** Simulated I/O latency so the functions behave like a real async store. */
const LATENCY_MS = 10;

export interface CreateTaskInput {
  title: string;
  userId: Id;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  await delay(LATENCY_MS);

  const title = input.title.trim();
  if (title.length === 0) {
    throw new ValidationError("Task title must not be empty.");
  }
  if (!users.has(input.userId)) {
    throw new NotFoundError(`User "${input.userId}" does not exist.`);
  }

  const task: Task = {
    id: randomUUID(),
    title,
    completed: false,
    userId: input.userId,
  };
  tasks.set(task.id, task);
  return { ...task };
}

/** Lists all tasks, or only those of one user when userId is given. */
export async function listTasks(userId?: Id): Promise<Task[]> {
  await delay(LATENCY_MS);

  const all = [...tasks.values()];
  const result = userId === undefined ? all : all.filter((t) => t.userId === userId);
  return result.map((t) => ({ ...t }));
}
