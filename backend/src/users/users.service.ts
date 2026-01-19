import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {} // Nomeie para prismaService

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const stmt = this.prismaService.db.prepare(
      'INSERT INTO User (email, name, password) VALUES (?, ?, ?)',
    );
    const info = stmt.run(data.email, data.name, hashedPassword);
    return { id: info.lastInsertRowid, ...data };
  }

  async findOneByEmail(email: string) {
    const stmt = this.prismaService.db.prepare(
      'SELECT * FROM User WHERE email = ?',
    );
    return stmt.get(email);
  }
}
