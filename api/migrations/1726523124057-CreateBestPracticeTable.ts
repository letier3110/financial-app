import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBestPracticeTable1726523124057
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "best_practice_entity" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "best_practice_entity";`);
  }
}
