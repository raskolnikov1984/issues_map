import { DataSource } from 'typeorm';
import { CaseSchema } from '../cases/infrastructure/schemas/case.schema';
import { UserSchema } from '../auth/infrastructure/schemas/user.schema';
import { CreateCasesTable20260822000000 } from './migrations/20260822000000-create-cases-table.migration';
import { CreateUsersTable20260822000100 } from './migrations/20260822000100-create-users-table.migration';
import { databaseOptions } from './database.options';

export const appDataSource = new DataSource({
  ...databaseOptions(),
  entities: [CaseSchema, UserSchema],
  migrations: [CreateCasesTable20260822000000, CreateUsersTable20260822000100],
});
