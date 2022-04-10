import { CouchDB } from './couchDB';
import * as authors from '../data/authors.json';
import * as books from '../data/books.json';

export const databaseProviders = [
  {
    provide: 'DATABASE_AUTHORS_CONNECTION',
    useFactory: async () => {
      return new CouchDB().connect('authors', authors);
    },
  },
  {
    provide: 'DATABASE_BOOKS_CONNECTION',
    useFactory: async () => {
      return new CouchDB().connect('books', books);
    },
  },
];
