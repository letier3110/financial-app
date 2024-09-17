import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDb1726516066062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE "transaction_entity" (
                    "id" SERIAL PRIMARY KEY,
                    "date" DATE NOT NULL,
                    "placcount" VARCHAR NOT NULL,
                    "amount" DOUBLE PRECISION NOT NULL,
                    "description" VARCHAR,
                    "counterparty" VARCHAR
                );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transaction";`);
    await queryRunner.query(`DROP TABLE "transaction_entity";`);
  }
}
