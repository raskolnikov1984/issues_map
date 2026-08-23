import { Module } from '@nestjs/common';
import { CreateCaseUseCase } from './application/use-cases/create-case.use-case';
import { GetCaseDetailsUseCase } from './application/use-cases/get-case-details.use-case';
import { GetCasesUseCase } from './application/use-cases/get-cases.use-case';
import { CASE_REPOSITORY } from './domain/ports/case.repository.port';
import { InMemoryCaseRepository } from './infrastructure/adapters/in-memory.case.repository';
import { CasesController } from './infrastructure/controllers/cases.controller';

@Module({
  controllers: [CasesController],
  providers: [
    GetCasesUseCase,
    GetCaseDetailsUseCase,
    CreateCaseUseCase,
    { provide: CASE_REPOSITORY, useClass: InMemoryCaseRepository },
  ],
})
export class CasesModule {}
