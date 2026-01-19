import { Injectable, OnModuleInit } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class PrismaService implements OnModuleInit {
  public db: any; // Usamos 'any' para evitar o erro de 'construct signatures' no VS Code

  onModuleInit() {
    // Usamos require para evitar o erro de namespace import do TS
    const Database = require('better-sqlite3');
    this.db = new Database(join(process.cwd(), 'dev.db'));

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        name TEXT,
        password TEXT
    );
        
      CREATE TABLE IF NOT EXISTS Expense (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        value REAL,
        date TEXT,
        userId INTEGER,
        FOREIGN KEY(userId) REFERENCES User(id)
      );
      
    `);
    console.log('✅ Banco SQLite conectado e pronto!');
  }
}
