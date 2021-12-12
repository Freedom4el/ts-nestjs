import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    HttpStatus,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { CreateBook } from './models/create-book';
  import { UpdateBook } from './models/update-book';
  import { ApiResponse, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('books')
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Post()
    create(@Body() createBook: CreateBook) {
      return this.booksService.create(createBook);
    }
  
    @Get()
    findAll() {
      return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      const book = this.booksService.findOne(id);
      if (!book) {
        return new NotFoundException({
          message: 'book not found',
        });
      }
  
      return book;
    }
  
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Update book',
    })

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBook: UpdateBook) {
      const book = this.booksService.update(id, updateBook);
      if (!book) {
        return new NotFoundException({
          message: 'book not found',
        });
      }
      return book;
    }
  
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Delete book',
    })

    @Delete(':id')
    remove(@Param('id') id: string) {
      const result = this.booksService.remove(id);
      if (!result) {
        return new NotFoundException({
          message: 'book not found',
        });
      }
      return 'ok';
    }
  }