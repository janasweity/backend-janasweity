import { describeError } from "./errors.js";
import { createTask, demoUser, listTasks } from "./services/taskService.js";

async function main(): Promise<void> {
  console.log("== 1) Create a valid task");
  try {
    const task = await createTask({ title: "Write the README", userId: demoUser.id });
    console.log("Success: task created:", task);
  } catch (error: unknown) {
    console.error("Failed:", describeError(error));
  }

  console.log("\n== 2) List tasks");
  try {
    const tasks = await listTasks(demoUser.id);
    console.log(`Success: ${tasks.length} task(s) for ${demoUser.name}:`, tasks);
  } catch (error: unknown) {
    console.error("Failed:", describeError(error));
  }

  console.log("\n== 3) Create with an empty title (expected to fail)");
  try {
    const task = await createTask({ title: "   ", userId: demoUser.id });
    console.log("Unexpected success:", task);
  } catch (error: unknown) {
    console.log("Rejected as expected:", describeError(error));
  }

  console.log("\n== 4) Create for a missing user (expected to fail)");
  try {
    const task = await createTask({ title: "Ghost task", userId: "user-404" });
    console.log("Unexpected success:", task);
  } catch (error: unknown) {
    console.log("Rejected as expected:", describeError(error));
  }

  console.log("\n== 5) Final list (failed attempts stored nothing)");
  const finalTasks = await listTasks();
  console.log(`Total tasks: ${finalTasks.length}`);
}

main().catch((error: unknown) => {
  console.error("Fatal:", describeError(error));
  process.exitCode = 1;
});
