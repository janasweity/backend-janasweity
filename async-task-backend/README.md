# async-task-backend

A small Node.js + TypeScript (ESM) backend exercise for practicing **Promises and `async/await`**.
It manages tasks that belong to users, validates input when a task is created, and handles errors
with `try/catch` and `unknown`. Data is kept **in memory**, so there is no database yet.

## Requirements

- Node.js (developed with v26)
- npm

## Commands

| Command | What it does |
|---|---|
| `npm install` | Installs the dev dependencies (`typescript`, `tsx`, `@types/node`). |
| `npm run dev` | Runs `src/app.ts` directly with `tsx` and restarts on every file save. |
| `npm run typecheck` | Type-checks the project with `tsc --noEmit` and writes no files. |
| `npm run build` | Compiles `src/` to JavaScript in `dist/`. |
| `npm start` | Runs the compiled app with `node dist/app.js`. Run `npm run build` first. |

Typical first run:

```bash
npm install
npm run typecheck
npm run build
npm start
```

> During `npm install`, npm may warn that the `esbuild` install script (a dependency of `tsx`)
> was not run. `tsx` still works. If it ever fails, run `npm install-scripts approve esbuild`.

## Project structure

```
async-task-backend/
├── src/
│   ├── app.ts                  # Entry point: runs the success and failure demo
│   ├── errors.ts               # ValidationError, NotFoundError, describeError(unknown)
│   ├── models/
│   │   ├── id.ts               # Id type shared by all entities (string)
│   │   ├── user.ts             # User interface: id, name
│   │   └── task.ts             # Task interface: id, title, completed, userId
│   └── services/
│       └── taskService.ts      # In-memory store, demo user, createTask, listTasks
├── dist/                       # Build output (generated, git-ignored)
├── package.json                # ESM ("type": "module"), scripts, dev dependencies
├── tsconfig.json               # strict: true, rootDir src, outDir dist, NodeNext modules
└── .gitignore                  # Ignores node_modules, dist, .env files, logs
```

### Models

- **`User`**
  - `id`: unique, read-only identifier.
  - `name`: display name.
- **`Task`**
  - `id`: unique, read-only identifier, generated with `randomUUID()`.
  - `title`: what needs to be done.
  - `completed`: `false` when the task is created.
  - `userId`: the `id` of the user who owns the task.

Types are imported with `import type`, which the `verbatimModuleSyntax` option requires.

### Operations (`src/services/taskService.ts`)

- **`createTask({ title, userId }): Promise<Task>`**
  - Trims the title.
  - Rejects with `ValidationError` if the title is empty.
  - Rejects with `NotFoundError` if the user does not exist.
  - Otherwise stores the new task and returns it.
- **`listTasks(userId?): Promise<Task[]>`**
  - Returns every task, or only the tasks of the given user.

Both functions wait a simulated 10 ms delay, so they behave like a real asynchronous data store.
They return copies of the stored tasks, so callers cannot change the store directly.

A demo user is available from startup: `{ id: "user-1", name: "Demo User" }`.

## Demo scenarios and expected results

`src/app.ts` runs these steps in order. Each operation is awaited inside its own `try/catch`.
A success message is printed only after the awaited operation succeeds. Errors are caught as
`unknown` and read safely with `describeError`.

| # | Scenario | Expected result |
|---|---|---|
| 1 | Create `"Write the README"` for `user-1` | **Success**: the task is printed with `completed: false` |
| 2 | List the tasks of `user-1` | **Success**: 1 task |
| 3 | Create a task with the title `"   "` | **Rejected**: `ValidationError: Task title must not be empty.` |
| 4 | Create a task for `user-404` | **Rejected**: `NotFoundError: User "user-404" does not exist.` |
| 5 | List all tasks | `Total tasks: 1` (the failed attempts stored nothing) |

Any unexpected error that escapes these blocks is caught by `main().catch(...)`. It is printed,
and `process.exitCode` is set to `1`.

### Verification

I ran `npm run typecheck`, `npm run build` and `npm start` and confirmed:

- exactly **one** task was created and listed,
- the **empty title** was rejected with `ValidationError`,
- the **non-existent user** was rejected with `NotFoundError`.

The task `id` is a random UUID, so it is different on every run.

## In-memory storage

Users and tasks are stored in JavaScript `Map`s inside the running process.
**All data is lost when the program exits.** Every `npm start` begins again with only the demo
user and no tasks. A database or file storage can be added later.

## Use of AI tools

- **Claude (Claude Code)** generated the code and the project configuration: `package.json`,
  `tsconfig.json`, `.gitignore`, the models, the task service, `app.ts` and this README.
- **ChatGPT** was used to explain the steps and how `await` works.

I reviewed the results and ran the commands above to verify them.
