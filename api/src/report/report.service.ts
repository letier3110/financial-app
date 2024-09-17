import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../transactions/entities/transaction.entity';
import { MapperEntity } from '../mapper/entities/mapper.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(MapperEntity)
    private readonly mapperRepository: Repository<MapperEntity>,
  ) {}

  async findAll() {
    const transactions = await this.transactionRepository.find();
    const mappers = await this.mapperRepository.find();

    const report = transactions.reduce((acc, transaction) => {
      const mapper = mappers.find((m) => m.placcount === transaction.placcount);
      const bestPracticeName = mapper ? mapper.bestPracticeName : 'Unknown';

      const month = new Date(transaction.date).toISOString().slice(0, 7); // YYYY-MM

      if (!acc[bestPracticeName]) {
        acc[bestPracticeName] = {};
      }

      if (!acc[bestPracticeName][month]) {
        acc[bestPracticeName][month] = 0;
      }

      acc[bestPracticeName][month] += transaction.amount;

      return acc;
    }, {});

    return report;
  }

  async findTop5() {
    const report = await this.findAll();

    const top5 = Object.entries(report)
      .map(([bestPracticeName, data]) => {
        const total = Object.values(data).reduce(
          (acc, value) => acc + value,
          0,
        );
        return { bestPracticeName, total };
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return top5;
  }
}
