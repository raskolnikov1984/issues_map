import { Case } from '../../domain/entities/case.entity';
import { ICaseRepository } from '../../domain/ports/case.repository.port';

export class InMemoryCaseRepository implements ICaseRepository {
  private readonly cases: Case[] = [];

  findAll(skip = 0, take?: number): Promise<Case[]> {
    const page = this.cases.slice(
      skip,
      take === undefined ? undefined : skip + take,
    );
    return Promise.resolve(page);
  }

  findById(id: string): Promise<Case | null> {
    return Promise.resolve(this.cases.find((item) => item.id === id) ?? null);
  }
}
