import { Inject, Injectable } from '@nestjs/common';
import { CreateBook } from './models/create-book';
import { UpdateBook } from './models/update-book';
import { BooksRepository } from './repositories/books.repository';
import { IBook } from './models/book.js';

@Injectable()
export class BooksService {
  constructor(
    @Inject(BooksRepository)
    private readonly bookRepository: BooksRepository,
  ) {}

  findAll(): Array<IBook> {
    return this.bookRepository.findAll();
  }

  update(id: string, updateBook: UpdateBook): IBook | boolean {
    return this.bookRepository.update(id, updateBook);
  }

  create(createBook: CreateBook): IBook {
    return this.bookRepository.create(createBook);
  }

  findOne(id: string): IBook | boolean {
    return this.bookRepository.findOne(id);
  }

  remove(id: string): boolean {
    return this.bookRepository.remove(id);
  }
}