import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL
    );
  `)
  await database.execAsync(`
      CREATE TABLE IF NOT EXISTS account (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, balance REAL NOT NULL);
      INSERT INTO account (name, balance) VALUES ('cash', 0);
      INSERT INTO account (name, balance) VALUES ('card', 0);
      INSERT INTO account (name, balance) VALUES ('savings', 0);
      `);
}