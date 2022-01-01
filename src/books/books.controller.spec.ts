import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Book, BookDocument, BookSchema } from './models/book';
import { BooksController } from './books.controller';
import { BooksService } from './services/books.service';
import * as mongoose from 'mongoose';
import { CreateBook } from './models/create-book';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  const book: CreateBook = {
    title: 'string',
    description: 'string',
    authors: 'string',
    favorite: 'string',
    fileCover: 'string',
    fileName: 'string',
    fileBook: 'string',
  };

  const bookModel = mongoose.model<BookDocument>('bookModel', BookSchema);

  const mockBooksService = {
    findAll: () => [new bookModel(book)],
    create: () => true
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBooksService,
        },
      ],
    }).compile();

    booksService = await moduleRef.get<BooksService>(BooksService);
    booksController = await moduleRef.get<BooksController>(BooksController);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = [new bookModel(book)];
      jest.spyOn(booksService, 'findAll').mockResolvedValue(result);
      expect(await booksController.findAll()).toBe(result);
    });
  });
});