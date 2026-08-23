import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCasesTable20260822000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cases',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'title', type: 'character varying' },
          { name: 'description', type: 'text' },
          { name: 'latitude', type: 'double precision' },
          { name: 'longitude', type: 'double precision' },
          { name: 'created_at', type: 'timestamp with time zone' },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cases');
  }
}
