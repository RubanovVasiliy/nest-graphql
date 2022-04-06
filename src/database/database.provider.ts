import { CouchDB } from './couchDB';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return new CouchDB().connect();
    },
  },
];
