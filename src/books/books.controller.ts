import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreateBook } from './models/create-book';
import { UpdateBook } from './models/update-book';
import { ApiTags } from '@nestjs/swagger';
import {
  I_BOOK_SERVICE,
  IBooksService,
} from './services/i-book.service';
import { IBook } from './models/book';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @Inject(I_BOOK_SERVICE) private readonly booksService: IBooksService,
  ) {}

  @Post()
  async create(
    @Body() createBook: CreateBook,
  ): Promise<IBook | BadRequestException> {
    const book = await this.booksService.create(createBook);
    if (book) {
      return book;
    } else {
      return new BadRequestException({
        message: 'Book not save',
      });
    }
  }

  @Get()
  async findAll(): Promise<IBook[]> {
    return await this.booksService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<IBook | NotFoundException> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      return new NotFoundException({
        message: 'book not found',
      });
    }

    return book;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBook: UpdateBook,
  ): Promise<IBook | NotFoundException> {
    const book = await this.booksService.update(id, updateBook);
    if (!book) {
      return new NotFoundException({
        message: 'book not found',
      });
    }
    return book;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string | NotFoundException> {
    const result = await this.booksService.remove(id);
    if (!result) {
      return new NotFoundException({
        message: 'book not found',
      });
    }
    return 'ok';
  }
}