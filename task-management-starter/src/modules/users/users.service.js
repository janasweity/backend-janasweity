// Users module: in-memory storage and lookups.
const users = [
  { id: 1, name: 'Jana' },
  { id: 2, name: 'Omar' },
];

export function listUsers() {
  return [...users];
}

export function findUserById(id) {
  return users.find((user) => user.id === id) ?? null;
}
