import { Inject, Injectable } from '@nestjs/common';
import * as Nano from 'nano';

@Injectable()
export class BookService {
  constructor(
    @Inject('DATABASE_BOOKS_CONNECTION')
    private db: Nano.DocumentScope<unknown>,
  ) {}

  async findAll(take = 20, skip = 0) {
    const query: Nano.MangoQuery = { skip: skip, limit: take, selector: {} };
    const books = await (await this.db).find(query);
    return books.docs;
  }

  async findById(id: string) {
    const book = await (await this.db).get(id);
    return book ? book : null;
  }

  async findByAuthorId(authorId: string) {
    const book = await (
      await this.db
    ).find({
      selector: { author: { $eq: authorId } },
    });
    return book.docs.length ? book.docs : null;
  }
}
