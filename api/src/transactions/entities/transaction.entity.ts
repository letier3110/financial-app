import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('transaction_entity')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  placcount: string;

  @Column({ type: 'double precision' })
  amount: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  counterparty: string;
}
