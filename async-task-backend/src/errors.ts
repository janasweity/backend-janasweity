/** Input failed a business rule (e.g. empty title). */
export class ValidationError extends Error {
  override readonly name = "ValidationError";
}

/** A referenced entity does not exist (e.g. unknown user). */
export class NotFoundError extends Error {
  override readonly name = "NotFoundError";
}

/** Turns any thrown value into a readable message. */
export function describeError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  return `Unknown error: ${String(error)}`;
}
