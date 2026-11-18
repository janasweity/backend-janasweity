import { listUsers } from './modules/users/users.service.js';
import { addTask, listTasks } from './modules/tasks/tasks.service.js';

function tryAddTask(input) {
  try {
    const task = addTask(input);
    console.log('✔ Added:', task);
  } catch (error) {
    console.log('✘ Rejected:', error.message);
  }
}

console.log('Users:', listUsers());

console.log('\n--- Valid tasks ---');
tryAddTask({ title: 'Write README', userId: 1 });
tryAddTask({ title: 'Review code', userId: 2 });

console.log('\n--- Invalid tasks ---');
tryAddTask({ title: '   ', userId: 1 }); // empty title
tryAddTask({ title: 'Ghost task', userId: 99 }); // unknown user

console.log('\nAll tasks:', listTasks());
