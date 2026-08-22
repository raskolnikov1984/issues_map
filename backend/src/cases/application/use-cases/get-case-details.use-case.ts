import { Inject, Injectable } from '@nestjs/common';
import { Case } from '../../domain/entities/case.entity';
import { CASE_REPOSITORY } from '../../domain/ports/case.repository.port';
import type { ICaseRepository } from '../../domain/ports/case.repository.port';

@Injectable()
export class GetCaseDetailsUseCase {
  constructor(
    @Inject(CASE_REPOSITORY) private readonly caseRepository: ICaseRepository,
  ) {}

  async execute(id: string): Promise<Case | null> {
    return this.caseRepository.findById(id);
  }
}
