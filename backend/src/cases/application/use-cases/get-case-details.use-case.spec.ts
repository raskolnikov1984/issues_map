import { Case } from '../../domain/entities/case.entity';
import { Coordinate } from '../../domain/value-objects/coordinate.vo';
import { ICaseRepository } from '../../domain/ports/case.repository.port';
import { GetCaseDetailsUseCase } from './get-case-details.use-case';

describe('GetCaseDetailsUseCase', () => {
  const existingCase = new Case(
    'case-1',
    'Title',
    'Description',
    Coordinate.create(6.2442, -75.5812),
    new Date('2026-01-01T00:00:00Z'),
  );

  it('returns the case found by id', async () => {
    const findById = jest.fn().mockResolvedValue(existingCase);
    const repository: ICaseRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findById,
      save: jest.fn().mockResolvedValue(undefined),
    };
    const useCase = new GetCaseDetailsUseCase(repository);

    const result = await useCase.execute('case-1');

    expect(findById).toHaveBeenCalledWith('case-1');
    expect(result).toBe(existingCase);
  });

  it('returns null when no case matches the id', async () => {
    const repository: ICaseRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findById: jest.fn().mockResolvedValue(null),
      save: jest.fn().mockResolvedValue(undefined),
    };
    const useCase = new GetCaseDetailsUseCase(repository);

    const result = await useCase.execute('missing-id');

    expect(result).toBeNull();
  });
});
