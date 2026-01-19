import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private database: PrismaService) {}

  async create(data: any, userId: number) {
    const stmt = this.database.db.prepare(
      'INSERT INTO Expense (description, value, date, userId) VALUES (?, ?, ?, ?)',
    );
    // O userId vem do token, garantindo que a despesa pertence a quem está logado
    const info = stmt.run(data.description, data.value, data.date, userId);
    return { id: info.lastInsertRowid, ...data, userId };
  }

  async findAllByUser(userId: number) {
    // Busca APENAS as despesas do usuário logado
    const stmt = this.database.db.prepare(
      'SELECT * FROM Expense WHERE userId = ?',
    );
    return stmt.all(userId);
  }

  async getTotal(userId: number) {
    // Soma APENAS o total do usuário logado
    const stmt = this.database.db.prepare(
      'SELECT SUM(value) as total FROM Expense WHERE userId = ?',
    );
    return stmt.get(userId);
  }

  // Adicione esta função para lidar com Receitas no SQLite
  async createIncome(data: any, userId: number) {
    const stmt = this.database.db.prepare(
      'INSERT INTO Expense (description, value, date, userId, type) VALUES (?, ?, ?, ?, ?)',
    );
    // Usamos a mesma tabela, mas com um tipo 'INCOME' para diferenciar
    const info = stmt.run(
      data.description,
      data.value,
      data.date,
      userId,
      'INCOME',
    );
    return { id: info.lastInsertRowid, ...data, userId, type: 'INCOME' };
  }

  async getTotalIncome(userId: number) {
    // Soma apenas o que for do tipo INCOME
    const stmt = this.database.db.prepare(
      "SELECT SUM(value) as total FROM Expense WHERE userId = ? AND type = 'INCOME'",
    );
    return stmt.get(userId);
  }
}
