import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BooksService } from './services/books.service';
import { INestApplication } from '@nestjs/common';
import { BooksController } from './books.controller';
import * as mongoose from 'mongoose';
import { CreateBook } from './models/create-book';
import { BookDocument, BookSchema } from './models/book';
import { UpdateBook } from './models/update-book';

describe('Books', () => {
  let app: INestApplication;
  const booksService = {
    findAll: async () => ['test'],
    findOne: async (_id:string) => book,
    create: async (book: CreateBook) => book,
    update: async (id: string,book: UpdateBook) => book,
    remove: async (_id:string) => 'deleted'
  };

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
  const result = new bookModel(book);


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET books`, async () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(await booksService.findAll());
  });

  it('/GET book by id', async () => {
    return request(app.getHttpServer())
      .get(`/books/${result._id}`)
      .expect(200)
      .expect(await booksService.findOne(result._id));
  });

  it('/POST create book', async () => {
    return request(app.getHttpServer())
      .post('/books')
      .send(book)
      .expect(201)
      .expect(await booksService.create(book));
  });

  it('/PUT update book', async () => {
    return request(app.getHttpServer())
      .put(`/books/${result._id}`)
      .send(book)
      .expect(200)
      .expect(await booksService.update(result._id, book));
  });

  it('/DELETE delete book', async () => {
    return request(app.getHttpServer())
      .delete(`/books/${result._id}`)
      .expect(200)
      .expect(await booksService.remove(result._id));
  });

  afterAll(async () => {
    await app.close();
  });
});