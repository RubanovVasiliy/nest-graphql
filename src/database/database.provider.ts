import { CouchDB } from './couchDB';
import * as authors from '../utils/authors.json';
import * as books from '../utils/books.json';

export const databaseProviders = [
  {
    provide: 'DATABASE_AUTHORS_CONNECTION',
    useFactory: async () => {
      return new CouchDB().connect(
        'http://admin:adminpass@localhost:5984',
        'authors',
        authors.data,
      );
    },
  },
  {
    provide: 'DATABASE_BOOKS_CONNECTION',
    useFactory: async () => {
      return new CouchDB().connect(
        'http://admin:adminpass@localhost:5984',
        'books',
        books.data,
      );
    },
  },
];
