import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { Author } from './schema/author.schema';
import authors from 'src/data/authors';

@Injectable()
export class AuthorService {
  authors: Partial<Author>[];

  constructor() {
    this.authors = authors;
  }

  async create(author: CreateAuthorInput) {
    this.authors = [author, ...this.authors];
    return author;
  }

  async findAll(take = 20, skip = 0) {
    // const query: MangoQuery = { skip: skip, limit: take, selector: {} };
    // const authors = await (await dbConnection).find(query);
    // console.log(authors);
    // return authors.docs;
    const authors = this.authors.slice(skip, take + skip);
    return authors;
  }

  async findById(id: number) {
    // const author = await (
    //   await dbConnection
    // ).find({
    //   selector: { id: { $eq: id } },
    // });
    // console.log(author);
    // return author.docs;
    const author = authors.filter((author) => author._id === id);
    return author.length ? author[0] : null;
  }
}
