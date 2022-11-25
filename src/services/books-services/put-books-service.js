import { booksModel } from '../../db';

class PutBooksService {
  constructor(booksModel) {
    this.booksModel = booksModel;
  }
  async updateBooks(id, body) {
    const filter = { id: id };
    const updateBody = { ...body };
    const updatedBook = await this.booksModel.update(filter, updateBody);
    return updatedBook;
  }
}

const putBooksService = new PutBooksService(booksModel);

export { putBooksService };
