import { Case } from '../entities/case.entity';

export const CASE_REPOSITORY = Symbol('CASE_REPOSITORY');

export interface ICaseRepository {
  findAll(skip?: number, take?: number): Promise<Case[]>;
  findById(id: string): Promise<Case | null>;
  save(entity: Case): Promise<void>;
}
