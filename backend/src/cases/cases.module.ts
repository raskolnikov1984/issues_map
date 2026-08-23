import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCaseUseCase } from './application/use-cases/create-case.use-case';
import { GetCaseDetailsUseCase } from './application/use-cases/get-case-details.use-case';
import { GetCasesUseCase } from './application/use-cases/get-cases.use-case';
import { CASE_REPOSITORY } from './domain/ports/case.repository.port';
import { InMemoryCaseRepository } from './infrastructure/adapters/in-memory.case.repository';
import { PostgresCaseRepository } from './infrastructure/adapters/postgres.case.repository';
import { CaseSchema } from './infrastructure/schemas/case.schema';
import { CasesController } from './infrastructure/controllers/cases.controller';

@Module({})
export class CasesModule {
  static register(usePostgres: boolean): DynamicModule {
    return {
      module: CasesModule,
      imports: usePostgres ? [TypeOrmModule.forFeature([CaseSchema])] : [],
      controllers: [CasesController],
      providers: [
        GetCasesUseCase,
        GetCaseDetailsUseCase,
        CreateCaseUseCase,
        usePostgres
          ? { provide: CASE_REPOSITORY, useClass: PostgresCaseRepository }
          : { provide: CASE_REPOSITORY, useClass: InMemoryCaseRepository },
      ],
    };
  }
}
