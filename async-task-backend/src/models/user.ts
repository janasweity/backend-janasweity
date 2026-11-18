import type { Id } from "./id.js";

export interface User {
  /** Unique identifier of the user; never changes after creation. */
  readonly id: Id;
  /** Display name of the user. */
  name: string;
}
