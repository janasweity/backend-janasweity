import express from 'express';
import { booksRouter } from './routes/books.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';

export const app = express();

app.use(express.json());
app.use('/api/books', booksRouter);
app.use(notFoundHandler);
app.use(errorHandler);
