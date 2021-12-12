import { PartialType } from '@nestjs/mapped-types';
import { CreateBook } from './create-book';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBook extends PartialType(CreateBook) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  authors: string;

  @ApiProperty()
  favorite: string;

  @ApiProperty()
  fileCover: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  fileBook: string;
}