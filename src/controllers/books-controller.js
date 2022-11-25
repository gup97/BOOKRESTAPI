import {
  getBooksService,
  postBooksService,
  putBooksService,
  deleteBooksService,
} from '../services/books-services';

class BookController {
  constructor(getBooksService) {
    this.getBooksService = getBooksService;
  }
  async getBooksAll(req, res, next) {
    console.log('first');
    const books = await this.getBooksService.getBooksAll();
    res.status(200).json({ books });
    try {
    } catch (err) {
      next(err);
    }
  }
  async getBooksOne(req, res, next) {
    try {
      const { id } = req.params;
      const book = await getBooksService.getBooksOne(id);
      res.status(200).json({ book });
    } catch (err) {
      next(err);
    }
  }
  async createBooks(req, res, next) {
    try {
      const { body } = req;
      const newBook = await postBooksService.createBooks(body);
      res.status(201).json(newBook);
    } catch (err) {
      next(err);
    }
  }
  async updateBooks(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedBook = await putBooksService.updateBooks(id, body);
      res.status(200).json({ updatedBook });
    } catch (err) {
      next(err);
    }
  }
  async deleteBooks(req, res, next) {
    try {
      const { id } = req.params;
      const { success, deletedBook } = await deleteBooksService.deleteBooks(id);
      res.status(200).json({ success, deletedBook });
    } catch (err) {
      next(err);
    }
  }
}
const bookController = new BookController({ getBooksService });

export { bookController };
