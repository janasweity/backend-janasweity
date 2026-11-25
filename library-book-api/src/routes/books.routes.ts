import { Router } from 'express';
import * as booksController from '../controllers/books.controller.js';

export const booksRouter = Router();

booksRouter.get('/', booksController.listBooks);
booksRouter.get('/:id', booksController.getBook);
booksRouter.post('/', booksController.createBook);
booksRouter.patch('/:id', booksController.updateBook);
booksRouter.delete('/:id', booksController.deleteBook);
