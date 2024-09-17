import { Module } from '@nestjs/common';
import { BestPracticeService } from './best-practice.service';
import { BestPracticeController } from './best-practice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestPracticeEntity } from './entities/best-practice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BestPracticeEntity])],
  controllers: [BestPracticeController],
  providers: [BestPracticeService],
})
export class BestPracticeModule {}
