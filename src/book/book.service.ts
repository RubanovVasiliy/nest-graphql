import { Inject, Injectable } from '@nestjs/common';
import * as Nano from 'nano';

@Injectable()
export class BookService {
  constructor(
    @Inject('DATABASE_BOOKS_CONNECTION')
    private db: Nano.DocumentScope<unknown>,
  ) {}

  async findAll(take = 25, skip = 0) {
    if (take > 25) {
      take = 25;
    }
    const query: Nano.MangoQuery = {
      skip: skip,
      limit: take,
      selector: {},
      execution_stats: true,
    };
    const books = await (await this.db).find(query);
    console.log(books);
    return books.docs;
  }

  async findById(id: string) {
    let book: Nano.DocumentGetResponse = null;
    try {
      book = await (await this.db).get(id);
    } catch (e) {
      console.log(e);
    }
    return book;
  }

  async findByAuthorId(authorId: string) {
    const book = await (
      await this.db
    ).find({
      selector: { author: { $eq: authorId } },
    });
    return book.docs;
  }
}
