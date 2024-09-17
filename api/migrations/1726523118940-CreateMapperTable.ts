import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMapperTable1726523118940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "mapper_entity" (
                "id" SERIAL PRIMARY KEY,
                "placcount" VARCHAR NOT NULL,
                "bestPracticeName" VARCHAR NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "mapper_entity";`);
  }
}
