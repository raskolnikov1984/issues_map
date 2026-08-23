import { MigrationInterface, QueryRunner } from 'typeorm';
import { DEMO_CASES } from '../../shared/demo-cases';

export class SeedDemoCases20260822000200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "cases"`);

    const placeholders = DEMO_CASES.map(
      (_, index) =>
        `($${index * 6 + 1}, $${index * 6 + 2}, $${index * 6 + 3}, $${index * 6 + 4}, $${index * 6 + 5}, $${index * 6 + 6})`,
    ).join(', ');

    const values = DEMO_CASES.flatMap((demoCase) => [
      demoCase.id,
      demoCase.title,
      demoCase.description,
      demoCase.latitude,
      demoCase.longitude,
      demoCase.createdAt,
    ]);

    await queryRunner.query(
      `INSERT INTO "cases" ("id", "title", "description", "latitude", "longitude", "created_at")
       VALUES ${placeholders}
       ON CONFLICT DO NOTHING`,
      values,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const ids = DEMO_CASES.map((demoCase) => demoCase.id);

    await queryRunner.query(`DELETE FROM "cases" WHERE "id" = ANY($1)`, [ids]);
  }
}
