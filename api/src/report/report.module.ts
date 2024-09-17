import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportDateEntity } from './entities/report.entity';
import { TransactionEntity } from '../transactions/entities/transaction.entity';
import { MapperEntity } from '../mapper/entities/mapper.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MapperEntity,
      ReportDateEntity,
      TransactionEntity,
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
