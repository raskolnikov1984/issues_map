import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { USER_REPOSITORY } from './domain/ports/user.repository.port';
import { InMemoryUserRepository } from './infrastructure/adapters/in-memory.user.repository';
import { PostgresUserRepository } from './infrastructure/adapters/postgres.user.repository';
import { UserSchema } from './infrastructure/schemas/user.schema';
import { AuthController } from './infrastructure/controllers/auth.controller';

@Module({})
export class AuthModule {
  static register(usePostgres: boolean): DynamicModule {
    return {
      module: AuthModule,
      imports: usePostgres ? [TypeOrmModule.forFeature([UserSchema])] : [],
      controllers: [AuthController],
      providers: [
        LoginUseCase,
        usePostgres
          ? { provide: USER_REPOSITORY, useClass: PostgresUserRepository }
          : { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
      ],
    };
  }
}
