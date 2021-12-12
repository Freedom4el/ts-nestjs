import { v4 as uuidv4 } from 'uuid';
import { IBook } from '../models/book';
import { CreateBook } from '../models/create-book';
import { UpdateBook } from '../models/update-book';
import { Injectable } from '@nestjs/common';

const books: Array<IBook> = [];

@Injectable()
export class BooksRepository {

  findAll(): Array<IBook> {
    return books;
  }

  update(id: string, updateBook: UpdateBook): IBook | false {
    const book = books.find((book) => book.id === id);
    if (!book) {
      return false;
    }

    for (const key of Object.keys(updateBook)) {
      if (key in book) {
        book[key] = updateBook[key];
      }
    }
    return book;
  }
  
  create(createBook: CreateBook): IBook {
    const book = {
      id: uuidv4(),
      ...createBook,
    };
    books.push(book);
    return book;
  }

  findOne(id: string): IBook | false {
    const book = books.find((book) => book.id === id);
    if (!book) {
      return false;
    }

    return book;
  }

  remove(id: string): boolean {
    const index = books.findIndex((book) => book.id === id);
    books.splice(index, 1);
    return true;
  }
}