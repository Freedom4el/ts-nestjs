import { IBookRepository } from '../repositories/i-book.repository';
import { Book } from '../models/book';
import { CreateBook } from '../models/create-book';
import { UpdateBook } from '../models/update-book';
import { firebaseDb } from '../../firestore';

export class BooksFirestoreRepository implements IBookRepository {
  async create(CreateBook: CreateBook): Promise<Book | false> {
    const books = firebaseDb.ref('books');
    try {
      const res = await books.push(CreateBook);
      const doc = await books.child(res.key).get();
      if (!doc.val()) {
        return false;
      } else {
        return doc.val() as Book;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async findAll(): Promise<Book[]> {
    const snapshot = await firebaseDb.ref('books').get();
    const allDoc = {};
    snapshot.forEach((doc) => {
      allDoc[doc.key] = doc.val();
    });
    return allDoc as Book[];
  }

  async findOne(id: string): Promise<Book | false> {
    try {
      const book = await firebaseDb.ref('books').child(id).get();
      if (!book.val()) {
        return false;
      } else {
        return book.val() as Book;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async update(
    id: string,
    UpdateBook: UpdateBook,
  ): Promise<Book | false> {
    try {
      await firebaseDb.ref('books').child(id).update(UpdateBook);
      const doc = await firebaseDb.ref('books').child(id).get();
      return doc.val() ?? false;
    } catch (e) {
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await firebaseDb.ref('books').child(id).remove();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}