import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { sha256 } from '../../shared/crypto';
import {
  DEMO_USER_EMAIL,
  DEMO_USER_ID,
  DEMO_USER_PASSWORD,
} from '../../shared/demo-user';

export class CreateUsersTable20260822000100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'email', type: 'character varying', isUnique: true },
          { name: 'password_hash', type: 'character varying' },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `INSERT INTO "users" ("id", "email", "password_hash")
       VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`,
      [DEMO_USER_ID, DEMO_USER_EMAIL, sha256(DEMO_USER_PASSWORD)],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
