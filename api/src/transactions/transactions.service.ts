import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionsRepository: Repository<TransactionEntity>,
  ) {}

  async bulkCreate(transactions: TransactionEntity[]): Promise<void> {
    await this.transactionsRepository.save(transactions);
  }

  async getAllUniquePLAccounts(): Promise<string[]> {
    return this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('DISTINCT transaction.placcount')
      .getRawMany()
      .then((x) => x.map((y) => y.placcount));
  }

  async findAll(): Promise<TransactionEntity[]> {
    return this.transactionsRepository.find();
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.transactionsRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
