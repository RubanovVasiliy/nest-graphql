import { Inject, Injectable } from '@nestjs/common';
import * as Nano from 'nano';
import { PaginationInputType } from 'src/dtos/pagination.input';

@Injectable()
export class BookService {
  constructor(
    @Inject('DATABASE_BOOKS_CONNECTION')
    private db: Nano.DocumentScope<unknown>,
  ) {}

  async findAll(pagination?: PaginationInputType) {
    const query: Nano.MangoQuery = {
      skip: pagination.skip,
      limit: pagination.take,
      selector: {},
      execution_stats: true,
    };
    const books = await (await this.db).find(query);
    console.log(books.execution_stats);
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
