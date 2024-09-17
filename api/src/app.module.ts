import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BestPracticeModule } from './best-practice/best-practice.module';
import { ReportModule } from './report/report.module';
import { MapperModule } from './mapper/mapper.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import typeorm from '../config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const data: any = dotenv.parse(fs.readFileSync(`.env`));
        return {
          type: 'postgres',
          host: data.POSTGRES_HOST,
          port: +data.POSTGRES_PORT,
          username: data.POSTGRES_USER,
          password: data.POSTGRES_PASSWORD,
          database: data.POSTGRES_DATABASE,
          entities: ['dist/**/*.entity.js'],
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    TransactionsModule,
    BestPracticeModule,
    ReportModule,
    MapperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
