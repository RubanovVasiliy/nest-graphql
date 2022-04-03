import { Injectable } from '@nestjs/common';
import authors from 'src/data/authors';
import { CreateAuthorInput } from './dto/create-author.input';
import { Author } from './schema/author.schema';

@Injectable()
export class AuthorService {
  authors: Partial<Author>[];

  constructor() {
    this.authors = authors;
  }

  async create(author: CreateAuthorInput) {
    this.authors = [author, ...this.authors];
    return authors;
  }

  async findAll(take = 20, skip = 0) {
    const authors = this.authors.slice(skip, take + skip);
    return authors;
  }

  async findById(id: number) {
    const result = authors.filter((item) => item.id === id);
    return result.length ? result[0] : null;
  }
}
