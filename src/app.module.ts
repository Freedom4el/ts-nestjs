import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { BooksModule } from './books/books.module';

const User = process.env.MONGO_USER || 'root';
const Password = process.env.MONGO_PASSWORD || 'example';
const DbName = process.env.MONGO_DB_NAME || 'library';
const Host = process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    BooksModule,
    MongooseModule.forRoot(Host, {
      user: User,
      pass: Password,
      dbName: DbName,
    }), 
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
