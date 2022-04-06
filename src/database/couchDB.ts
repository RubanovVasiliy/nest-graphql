import * as Nano from 'nano';

export class CouchDB {
  async connect(
    dbName: string,
    document,
  ): Promise<Nano.DocumentScope<unknown>> {
    const connectionString = this.createConnectionString();

    try {
      const nano = Nano(connectionString);
      const dbList = await nano.db.list();

      if (!dbList.includes(dbName)) {
        await nano.db.create(dbName);
        const db = nano.use(dbName);
        //console.log(`database ${dbName} created successfully`);
        await db.bulk({ docs: document.data });
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
