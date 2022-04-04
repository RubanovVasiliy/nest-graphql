import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { Book } from './schema/book.schema';
import books from 'src/data/books';

@Injectable()
export class BookService {
  books: Partial<Book>[];

  constructor() {
    this.books = books;
  }

  async createBook(book: CreateBookInput) {
    this.books = [book, ...this.books];
    return book;
  }

  async findAll(take = 20, skip = 0) {
    const books = this.books.slice(skip, take + skip);
    return books;
  }

  async findById(id: number) {
    const books = this.books.filter((book) => book._id === id);
    return books.length ? books[0] : null;
  }

  async findByAuthorId(authorId: number) {
    return this.books.filter((book) => book.author === authorId);
  }
}
