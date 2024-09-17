import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('report_date')
export class ReportDateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // aggregation by month
  @Column()
  month: string;

  @Column()
  placcount: string;

  @Column()
  bestPracticeName: string;

  @Column({ type: 'double precision' })
  amount: string;
}
