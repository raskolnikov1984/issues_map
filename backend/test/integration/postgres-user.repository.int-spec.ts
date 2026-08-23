import { DataSource } from 'typeorm';
import { PostgresUserRepository } from '../../src/auth/infrastructure/adapters/postgres.user.repository';
import { UserSchema } from '../../src/auth/infrastructure/schemas/user.schema';
import { databaseOptions } from '../../src/database/database.options';
import { CreateCasesTable20260822000000 } from '../../src/database/migrations/20260822000000-create-cases-table.migration';
import { CreateUsersTable20260822000100 } from '../../src/database/migrations/20260822000100-create-users-table.migration';
import { sha256 } from '../../src/shared/crypto';
import {
  DEMO_USER_EMAIL,
  DEMO_USER_ID,
  DEMO_USER_PASSWORD,
} from '../../src/shared/demo-user';

const runDbTests = process.env.RUN_DB_TESTS === 'true';

(runDbTests ? describe : describe.skip)(
  'PostgresUserRepository (integration)',
  () => {
    let dataSource: DataSource;
    let repository: PostgresUserRepository;

    beforeAll(async () => {
      dataSource = new DataSource({
        ...databaseOptions(),
        entities: [UserSchema],
        migrations: [
          CreateUsersTable20260822000100,
          CreateCasesTable20260822000000,
        ],
        migrationsRun: true,
      });
      await dataSource.initialize();
      repository = new PostgresUserRepository(
        dataSource.getRepository(UserSchema),
      );
    });

    afterAll(async () => {
      await dataSource.destroy();
    });

    it('finds the demo user seeded by migrations', async () => {
      const user = await repository.findByEmail(DEMO_USER_EMAIL);

      expect(user).toMatchObject({
        id: DEMO_USER_ID,
        email: DEMO_USER_EMAIL,
        passwordHash: sha256(DEMO_USER_PASSWORD),
      });
    });

    it('returns null for an unknown email', async () => {
      const user = await repository.findByEmail('ghost@issuesmap.com');

      expect(user).toBeNull();
    });
  },
);
