import { Inject, Injectable } from '@nestjs/common';
import * as Nano from 'nano';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('DATABASE_AUTHORS_CONNECTION')
    private db: Nano.DocumentScope<unknown>,
  ) {}

  async findAll(take = 20, skip = 0) {
    const query: Nano.MangoQuery = { skip: skip, limit: take, selector: {} };
    const authors = await (await this.db).find(query);
    return authors.docs;
  }

  async findById(id: string) {
    const author = await (await this.db).get(id);
    return author ? author : null;
  }
}
