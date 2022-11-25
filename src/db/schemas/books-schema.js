import { Schema } from 'mongoose';

// id,name,author,country,gender,year,ISBN,price,update_date
const BooksSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    update_date: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'books',
    timestamps: true,
  },
);

export { BooksSchema };
