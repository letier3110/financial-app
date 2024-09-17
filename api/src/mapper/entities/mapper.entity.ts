import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// relation between placcount and best practice name
@Entity('mapper_entity')
export class MapperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placcount: string;

  @Column()
  bestPracticeName: string;
}
