import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './services/books.service';
import { BooksController } from './books.controller';
import { I_BOOK_REPOSITORY } from './repositories/i-book.repository';
import { I_BOOK_SERVICE } from './services/i-book.service';
import { Book, BookSchema } from './models/book';
import { BooksMongoRepository } from './repositories/books-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [
    {
      provide: I_BOOK_REPOSITORY,
      useClass: BooksMongoRepository,
    },
    {
      provide: I_BOOK_SERVICE,
      useClass: BooksService,
    },
  ],
})
export class BooksModule {}