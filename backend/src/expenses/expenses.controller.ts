import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createExpenseDto: any, @Request() req) {
    return this.expensesService.create(createExpenseDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req) {
    return this.expensesService.findAllByUser(req.user.userId);
  }

  // Rota de relatório protegida
  @UseGuards(AuthGuard('jwt'))
  @Get('total')
  async getTotal(@Request() req) {
    return this.expensesService.getTotal(req.user.userId);
  }
}