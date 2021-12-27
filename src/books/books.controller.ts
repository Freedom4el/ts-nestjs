import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  NotFoundException,
  Inject,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { createBookSchema } from '../common/joi/create-book.schema';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { ParseIdPipe } from '../common/pipes/parse-id.pipe';
import { CreateBook } from './models/create-book';
import { UpdateBook } from './models/update-book';
import { ApiTags } from '@nestjs/swagger';
import {
  I_BOOK_SERVICE,
  IBooksService,
} from './services/i-book.service';
import { IBook } from './models/book';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @Inject(I_BOOK_SERVICE) private readonly booksService: IBooksService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(createBookSchema))
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
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<IBook[]> {
    return await this.booksService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id', new ParseIdPipe()) id: string,
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
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseIdPipe()) id: string,
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
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', new ParseIdPipe()) id: string): Promise<string | NotFoundException> {
    const result = await this.booksService.remove(id);
    if (!result) {
      return new NotFoundException({
        message: 'book not found',
      });
    }
    return 'ok';
  }
}