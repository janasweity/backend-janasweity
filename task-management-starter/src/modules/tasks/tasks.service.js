// Tasks module: in-memory storage, validation, and listing.
import { findUserById } from '../users/users.service.js';

const tasks = [];
let nextId = 1;

export function addTask({ title, userId }) {
  const cleanTitle = typeof title === 'string' ? title.trim() : '';
  if (!cleanTitle) {
    throw new Error('Task title is required.');
  }

  const user = findUserById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist.`);
  }

  const task = { id: nextId++, title: cleanTitle, userId: user.id, done: false };
  tasks.push(task);
  return task;
}

export function listTasks() {
  return [...tasks];
}
