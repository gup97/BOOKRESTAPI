import { model } from 'mongoose';
import { BooksSchema } from '../schemas/books-schema';

const Books = model('books', BooksSchema);

export class BooksModel {
  async create(body) {
    return await Books.create(body);
  }
  async update(filter, body, options = { lean: true, new: true }) {
    return await Books.findOneAndUpdate(filter, body, options).exec();
  }
  async findOne(query, projection, options = { lean: true }) {
    return await Books.findOne(query, projection, options).exec();
  }
  async find(query, projection, sort = { id: 1 }, options = { lean: true }) {
    return await Books.find(query, projection, options).sort(sort).exec();
  }
  async deleteOne(filter) {
    return await Books.findOneAndDelete(filter).exec();
  }
  async deleteAll(filter = {}) {
    return await Books.deleteMany(filter);
  }
}

const booksModel = new BooksModel();

export { booksModel };
