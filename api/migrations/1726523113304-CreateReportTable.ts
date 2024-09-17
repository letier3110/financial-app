import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReportTable1726523113304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "report_date" (
                "id" SERIAL PRIMARY KEY,
                "month" VARCHAR NOT NULL,
                "placcount" VARCHAR NOT NULL,
                "bestPracticeName" VARCHAR NOT NULL,
                "amount" DOUBLE PRECISION NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "report_date";`);
  }
}
