import { Module } from '@nestjs/common';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { USER_REPOSITORY } from './domain/ports/user.repository.port';
import { InMemoryUserRepository } from './infrastructure/adapters/in-memory.user.repository';
import { AuthController } from './infrastructure/controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
  ],
})
export class AuthModule {}
