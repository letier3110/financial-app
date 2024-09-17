import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BestPracticeEntity } from './entities/best-practice.entity';

@Injectable()
export class BestPracticeService {
  constructor(
    @InjectRepository(BestPracticeEntity)
    private bestPracticeRepo: Repository<BestPracticeEntity>,
  ) {}

  async bulkCreate(transactions: BestPracticeEntity[]): Promise<void> {
    await this.bestPracticeRepo.save(transactions);
  }

  async getAllUniquePLAccounts(): Promise<string[]> {
    return this.bestPracticeRepo
      .createQueryBuilder('transaction')
      .select('DISTINCT transaction.placcount')
      .getRawMany()
      .then((x) => x.map((y) => y.placcount));
  }

  async findAll(): Promise<BestPracticeEntity[]> {
    return this.bestPracticeRepo.find();
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.bestPracticeRepo.delete(id);
    return deleteResult.affected > 0;
  }
}
