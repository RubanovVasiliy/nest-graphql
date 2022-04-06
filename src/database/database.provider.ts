import * as authors from '../utils/authors.json';
import * as books from '../utils/books.json';
import * as Nano from 'nano';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return new CouchDB().connect();
    },
  },
];

export class CouchDB {
  async connect() {
    const dbName = process.env.DB || 'authors';
    const connectionString = this.createConnectionString();

    try {
      const nano = Nano(connectionString);
      const dbList = await nano.db.list();

      if (!dbList.includes(dbName)) {
        await nano.db.create(dbName);
        const db = nano.use(dbName);
        //console.log(`database ${dbName} created successfully`);
        await db.bulk({ docs: [...books.data, ...authors.data] });
        return db;
      } else {
        const db = nano.use(dbName);
        //console.log(`connected to database ${dbName} successfully`);
        return db;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  private createConnectionString(): string {
    const dbPort = process.env.DB_PORT || 5984;
    const dbHost = process.env.DB_HOST || 'couchdb';
    const dbUser = process.env.COUCHDB_USER || 'admin';
    const dbPassword = process.env.COUCHDB_PASSWORD || 'adminpass';
    return `http://${dbUser}:${dbPassword}@${dbHost}:${dbPort}`;
  }
}
