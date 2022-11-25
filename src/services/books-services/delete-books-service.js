import { booksModel } from '../../db';

class DeleteBooksService {
  constructor(booksModel) {
    this.booksModel = booksModel;
  }
  async deleteBooks(id) {
    const query = { id: id };
    const deletedBook = await this.booksModel.deleteOne(query);

    let success = true;
    if (!deletedBook) {
      success = false;
    }
    return { success, deletedBook };
  }
}

const deleteBooksService = new DeleteBooksService(booksModel);

export { deleteBooksService };
