import { Inject, Injectable } from '@nestjs/common';
import { Case } from '../../domain/entities/case.entity';
import { CASE_REPOSITORY } from '../../domain/ports/case.repository.port';
import type { ICaseRepository } from '../../domain/ports/case.repository.port';

@Injectable()
export class GetCasesUseCase {
  constructor(
    @Inject(CASE_REPOSITORY) private readonly caseRepository: ICaseRepository,
  ) {}

  async execute(page = 1, limit?: number): Promise<Case[]> {
    const skip = page > 1 ? (page - 1) * (limit ?? 0) : 0;
    return this.caseRepository.findAll(skip, limit);
  }
}
