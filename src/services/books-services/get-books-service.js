import { booksModel } from '../../db';

class GetBooksService {
  constructor(booksModel) {
    this.booksModel = booksModel;
  }
  async getBooksAll() {
    const books = await this.booksModel.find({});
    return books;
  }
  async getBooksOne(id) {
    const filter = { id: id };
    const book = await this.booksModel.findOne(filter);
    return book;
  }
}

const getBooksService = new GetBooksService(booksModel);

export { getBooksService };
