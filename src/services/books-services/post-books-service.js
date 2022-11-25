import { booksModel } from '../../db';

class PostBooksService {
  constructor(booksModel) {
    this.booksModel = booksModel;
  }
  async createBooks(body) {
    const isBookIdQuery = { id: body.id };
    const isBookId = await this.booksModel.findOne(isBookIdQuery);
    if (isBookId) {
      throw new Error('Book already exists');
    }
    const newBook = await this.booksModel.create(body);
    return newBook;
  }
}

const postBooksService = new PostBooksService(booksModel);

export { postBooksService };
