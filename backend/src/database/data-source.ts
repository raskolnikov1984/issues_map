import { DataSource } from 'typeorm';
import { CaseSchema } from '../cases/infrastructure/schemas/case.schema';
import { CreateCasesTable20260822000000 } from './migrations/20260822000000-create-cases-table.migration';
import { databaseOptions } from './database.options';

export const appDataSource = new DataSource({
  ...databaseOptions(),
  entities: [CaseSchema],
  migrations: [CreateCasesTable20260822000000],
});
