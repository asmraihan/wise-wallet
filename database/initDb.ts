import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  // delete / drop all table

  // await database.execAsync(`
  //   DROP TABLE IF EXISTS category
  //   `);
  // await database.execAsync(`
  //     DROP TABLE IF EXISTS account
  //     `);
  // await database.execAsync(`
  //     DROP TABLE IF EXISTS transactions
  //     `);

  // Create the category table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL
    );
  `);

  // Create the account table
  await database.execAsync(`
  CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    balance REAL NOT NULL
  );
`);

  // Insert accounts only if they do not already exist
  await database.execAsync(`
  INSERT INTO account (name, balance)
  SELECT 'cash', 0
  WHERE NOT EXISTS (SELECT 1 FROM account WHERE name = 'cash');
  
  INSERT INTO account (name, balance)
  SELECT 'card', 0
  WHERE NOT EXISTS (SELECT 1 FROM account WHERE name = 'card');
  
  INSERT INTO account (name, balance)
  SELECT 'savings', 0
  WHERE NOT EXISTS (SELECT 1 FROM account WHERE name = 'savings');
`);

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


  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS transaction_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      from_account INTEGER NOT NULL,
      to_account INTEGER NOT NULL,
      date TEXT NOT NULL
    );
  `);

}
