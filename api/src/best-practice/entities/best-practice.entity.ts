import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('best_practice_entity')
export class BestPracticeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
