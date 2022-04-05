import * as Nano from 'nano';

export class CouchDB {
  async connect(connectioString: string, dbName: string, document?: object[]) {
    const nano = Nano(connectioString);
    const dbList = await nano.db.list();
    try {
      if (!dbList.includes(dbName)) {
        await nano.db.create(dbName);
        const db = nano.use(dbName);
        //console.log(`database ${dbName} created successfully`);
        if (document) {
          await db.bulk({ docs: document });
        }
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
}
