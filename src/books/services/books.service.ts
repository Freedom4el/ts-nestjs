import { Inject, Injectable } from '@nestjs/common';
import { CreateBook } from '../models/create-book';
import { UpdateBook } from '../models/update-book';
import { IBook } from '../models/book';
import {
  I_BOOK_REPOSITORY,
  IBookRepository,
} from '../repositories/i-book.repository';
import { IBooksService } from '../services/i-book.service';

@Injectable()
export class BooksService implements IBooksService {
  constructor(
    @Inject(I_BOOK_REPOSITORY) private readonly bookRepository: IBookRepository,
  ) {}

  async create(createBook: CreateBook): Promise<false | IBook> {
    return await this.bookRepository.create(createBook);
  }

  async findAll(): Promise<IBook[]> {
    return this.bookRepository.findAll();
  }

  async findOne(id: string): Promise<IBook | false> {
    return this.bookRepository.findOne(id);
  }

  async update(
    id: string,
    updateBook: UpdateBook,
  ): Promise<IBook | false> {
    return this.bookRepository.update(id, updateBook);
  }

  async remove(id: string): Promise<boolean> {
    return this.bookRepository.remove(id);
  }
}