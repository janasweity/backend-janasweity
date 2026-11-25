import type { Request, Response } from 'express';
import * as booksService from '../services/books.service.js';
import { createBookSchema, updateBookSchema } from '../schemas/book.schema.js';
import { HttpError } from '../errors/http-error.js';

type IdParams = { id: string };

function parseId(raw: string): number {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, 'id must be a positive integer');
  }
  return id;
}

export function listBooks(_req: Request, res: Response): void {
  res.json(booksService.getAllBooks());
}

export function getBook(req: Request<IdParams>, res: Response): void {
  res.json(booksService.getBookById(parseId(req.params.id)));
}

export function createBook(req: Request, res: Response): void {
  const input = createBookSchema.parse(req.body);
  res.status(201).json(booksService.createBook(input));
}

export function updateBook(req: Request<IdParams>, res: Response): void {
  const id = parseId(req.params.id);
  const changes = updateBookSchema.parse(req.body);
  res.json(booksService.updateBook(id, changes));
}

export function deleteBook(req: Request<IdParams>, res: Response): void {
  booksService.deleteBook(parseId(req.params.id));
  res.status(204).send();
}
