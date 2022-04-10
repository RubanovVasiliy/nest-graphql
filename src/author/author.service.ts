import { Inject, Injectable } from '@nestjs/common';
import * as Nano from 'nano';
import { PaginationInputType } from 'src/dtos/pagination.input';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('DATABASE_AUTHORS_CONNECTION')
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
    const authors = await (await this.db).find(query);
    console.log(authors);
    return authors.docs;
  }

  async findById(id: string) {
    let author: Nano.DocumentGetResponse = null;
    try {
      author = await (await this.db).get(id);
    } catch (e) {
      console.log(e);
    }
    return author;
  }
}
