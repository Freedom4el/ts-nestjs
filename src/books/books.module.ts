import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './repositories/books.repository';

@Module({
  controllers: [BooksController],
  providers: [BooksRepository, BooksService],
})
export class BooksModule {}