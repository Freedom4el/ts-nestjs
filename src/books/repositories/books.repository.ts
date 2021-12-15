import { v4 as uuidv4 } from 'uuid';
import { IBook } from '../models/book';
import { CreateBook } from '../models/create-book';
import { UpdateBook } from '../models/update-book';
import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../repositories/i-book.repository';

const books: Array<IBook> = [];

@Injectable()
export class BooksInMemoryRepository implements IBookRepository {
  async create(CreateBook: CreateBook): Promise<IBook> {
    const book = {
      id: uuidv4(),
      ...CreateBook,
    };
    books.push(book);
    return book;
  }

  async findAll(): Promise<IBook[]> {
    return books;
  }

  async findOne(id: string): Promise<IBook | false> {
    const book = books.find((book) => book.id === id);
    if (!book) {
      return false;
    }

    return book;
  }

  async update(
    id: string,
    UpdateBook: UpdateBook,
  ): Promise<IBook | false> {
    const book = books.find((book) => book.id === id);
    if (!book) {
      return false;
    }

    for (const key of Object.keys(UpdateBook)) {
      console.log(key);
      if (key in book) {
        book[key] = UpdateBook[key];
      }
    }
    return book;
  }

  async remove(id: string): Promise<boolean> {
    const index = books.findIndex((book) => book.id === id);
    books.splice(index, 1);
    return true;
  }
}