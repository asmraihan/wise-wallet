import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {


  // delete / drop all table
  // await database.execAsync(`
  //   DROP TABLE IF EXISTS transactions
  //   `);


  // await database.execAsync(`
  //   CREATE TABLE IF NOT EXISTS category (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT NOT NULL,
  //     type TEXT NOT NULL
  //   );
  // `)

  // await database.execAsync(`
  //   CREATE TABLE IF NOT EXISTS account (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT NOT NULL UNIQUE,
  //     balance REAL NOT NULL
  //   );
  //   INSERT INTO account (name, balance) VALUES ('cash', 0)
  //   ON CONFLICT(name) DO UPDATE SET balance=excluded.balance;
  //   INSERT INTO account (name, balance) VALUES ('card', 0)
  //   ON CONFLICT(name) DO UPDATE SET balance=excluded.balance;
  //   INSERT INTO account (name, balance) VALUES ('savings', 0)
  //   ON CONFLICT(name) DO UPDATE SET balance=excluded.balance;
  // `);


  // Create the transaction table

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      account INTEGER NOT NULL,
      category INTEGER,
      type TEXT NOT NULL,
      date TEXT NOT NULL,
      details TEXT NOT NULL
    );
  `);




}