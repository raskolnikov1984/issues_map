import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserSchema } from './auth/infrastructure/schemas/user.schema';
import { CaseSchema } from './cases/infrastructure/schemas/case.schema';
import { CasesModule } from './cases/cases.module';
import { databaseOptions } from './database/database.options';
import { CreateCasesTable20260822000000 } from './database/migrations/20260822000000-create-cases-table.migration';
import { CreateUsersTable20260822000100 } from './database/migrations/20260822000100-create-users-table.migration';
import { SeedDemoCases20260822000200 } from './database/migrations/20260822000200-seed-demo-cases.migration';
import { SharedModule } from './shared/shared.module';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    const postgres = process.env.REPOSITORY === 'postgres';

    return {
      module: AppModule,
      imports: [
        ...(postgres
          ? [
              TypeOrmModule.forRoot({
                ...databaseOptions(),
                entities: [CaseSchema, UserSchema],
                migrations: [
                  CreateCasesTable20260822000000,
                  CreateUsersTable20260822000100,
                  SeedDemoCases20260822000200,
                ],
                migrationsRun: true,
              }),
            ]
          : []),
        SharedModule,
        AuthModule.register(postgres),
        CasesModule.register(postgres),
      ],
    };
  }
}
