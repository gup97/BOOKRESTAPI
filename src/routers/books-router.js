import { Router } from 'express';
import { bookController } from '../controllers';

const booksRouter = Router();

booksRouter.get('/book', bookController.getBooksAll.bind(bookController));

booksRouter.get('/book/:id', bookController.getBooksOne);

booksRouter.post('/book', bookController.createBooks);

booksRouter.delete('/book/:id', bookController.deleteBooks);

booksRouter.put('/book/:id', bookController.updateBooks);

export { booksRouter };
