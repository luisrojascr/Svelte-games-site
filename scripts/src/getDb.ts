import mongodb, { Db, MongoClient } from "mongodb";

let client: MongoClient | undefined;

export default async function getDb(): Promise<Db> {
  const db_name = process.env.MONGO_DB || "flush";
  if (!client) {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL)
      throw new Error("The MONGO_URL environment variable is not set.");
    client = new MongoClient(MONGO_URL);
    client = await client.connect();
  }
  return client!.db(db_name);
}

// used for safe shutdown, presently only used by jest
export async function closeDb(): Promise<void> {
  if (client) {
    await client?.close();
  }
  client = undefined;
}
