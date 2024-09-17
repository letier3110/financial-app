import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseCsvService } from './parse-csv.service'; // Service to parse CSV
import { TransactionsService } from './transactions.service'; // Service to interact with DB
import { TransactionEntity } from './entities/transaction.entity'; // Entity representing the table

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new HttpException('File is missing', HttpStatus.BAD_REQUEST);
    }

    interface ParsedData {
      Date: string;
      'PL Account': string;
      Amount: string;
      Description: string;
      Counterparty: string;
    }

    const transactions: TransactionEntity[] = (
      await ParseCsvService.parse<ParsedData>(file.buffer)
    ).map<TransactionEntity>((x) => ({
      id: undefined,
      date: new Date(x.Date).toISOString(),
      placcount: x['PL Account'],
      amount: x.Amount,
      description: x.Description,
      counterparty: x.Counterparty,
    }));
    await this.transactionsService.bulkCreate(transactions);
    return { message: 'Transactions uploaded successfully' };
  }

  @Get('placcounts')
  async getAllUniquePLAccounts(): Promise<string[]> {
    return this.transactionsService.getAllUniquePLAccounts();
  }

  @Get()
  async getAllTransactions(): Promise<TransactionEntity[]> {
    return this.transactionsService.findAll();
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    const result = await this.transactionsService.delete(id);
    if (!result) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Transaction deleted successfully' };
  }
}
