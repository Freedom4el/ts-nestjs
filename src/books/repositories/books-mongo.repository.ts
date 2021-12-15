import { IBookRepository } from './i-book.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument, IBook } from '../models/book';
import { Model } from 'mongoose';
import { CreateBook } from '../models/create-book';
import { UpdateBook } from '../models/update-book';

export class BooksMongoRepository implements IBookRepository {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBook): Promise<IBook | false> {
    const newBook = new this.bookModel(createBookDto);
    try {
      await newBook.save();
      return newBook;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async findAll(): Promise<IBook[]> {
    return await this.bookModel.find().select('-__v').exec();
  }

  async findOne(id: string): Promise<IBook | false> {
    try {
      const book = this.bookModel.findById(id).select('-__v');
      return book ?? false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.bookModel.deleteOne({ _id: id });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async update(
    id: string,
    updateBookDto: UpdateBook,
  ): Promise<IBook | false> {
    try {
      const book = this.bookModel.findByIdAndUpdate(id, updateBookDto);
      return book ?? false;
    } catch (e) {
      return false;
    }
  }
}