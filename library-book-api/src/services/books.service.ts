import type { Book } from '../models/book.js';
import type { CreateBookInput, UpdateBookInput } from '../schemas/book.schema.js';
import { HttpError } from '../errors/http-error.js';

const books: Book[] = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming', available: true },
  { id: 2, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', available: false },
];
let nextId = 3;

export function getAllBooks(): Book[] {
  return [...books];
}

export function getBookById(id: number): Book {
  const book = books.find((b) => b.id === id);
  if (!book) throw new HttpError(404, `Book with id ${id} not found`);
  return book;
}

export function createBook(input: CreateBookInput): Book {
  const book: Book = { id: nextId++, ...input };
  books.push(book);
  return book;
}

export function updateBook(id: number, changes: UpdateBookInput): Book {
  const book = getBookById(id);
  // Copy only defined fields so `undefined` never overwrites existing data.
  for (const [key, value] of Object.entries(changes)) {
    if (value !== undefined) Object.assign(book, { [key]: value });
  }
  return book;
}

export function deleteBook(id: number): void {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) throw new HttpError(404, `Book with id ${id} not found`);
  books.splice(index, 1);
}
