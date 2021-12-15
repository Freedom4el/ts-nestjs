import { CreateBook } from '../models/create-book';
import { IBook } from '../models/book';
import { UpdateBook } from '../models/update-book';

export const I_BOOK_REPOSITORY = 'I_BOOK_REPOSITORY';
export interface IBookRepository {
  create(createBookDto: CreateBook): Promise<IBook | false>;
  findAll(): Promise<IBook[]>;
  findOne(id: string): Promise<IBook | false>;
  update(id: string, updateBookDto: UpdateBook): Promise<IBook | false>;
  remove(id: string): Promise<boolean>;
}