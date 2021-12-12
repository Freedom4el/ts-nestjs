import { ApiProperty } from '@nestjs/swagger';

export class CreateBook {
  
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