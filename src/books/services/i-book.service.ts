import { CreateBook } from '../models/create-book';
import { IBook } from '../models/book';
import { UpdateBook } from '../models/update-book';

export const I_BOOK_SERVICE = 'I_BOOK_SERVICE';

export interface IBooksService {
  create(createBookDto: CreateBook): Promise<false | IBook>;

  findAll(): Promise<IBook[]>;

  findOne(id: string): Promise<IBook | null | false>;

  update(
    id: string,
    updateBookDto: UpdateBook,
  ): Promise<IBook | null | false>;

  remove(id: string): Promise<boolean>;
}