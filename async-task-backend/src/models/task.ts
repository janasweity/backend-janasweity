import type { Id } from "./id.js";

export interface Task {
  /** Unique identifier of the task; never changes after creation. */
  readonly id: Id;
  /** Short description of what needs to be done. */
  title: string;
  /** Whether the task is done (true) or still pending (false). */
  completed: boolean;
  /** Id of the User who owns this task. */
  userId: Id;
}
