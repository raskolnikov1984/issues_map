import { ICaseRepository } from '../../domain/ports/case.repository.port';
import { GetCasesUseCase } from './get-cases.use-case';

describe('GetCasesUseCase', () => {
  it('returns all cases', async () => {
    const findAll = jest.fn().mockResolvedValue([]);
    const repository: ICaseRepository = {
      findAll,
      findById: jest.fn().mockResolvedValue(null),
    };
    const useCase = new GetCasesUseCase(repository);

    await useCase.execute();

    expect(findAll).toHaveBeenCalledWith(0, undefined);
  });

  it('maps page and limit to skip and take', async () => {
    const findAll = jest.fn().mockResolvedValue([]);
    const repository: ICaseRepository = {
      findAll,
      findById: jest.fn().mockResolvedValue(null),
    };
    const useCase = new GetCasesUseCase(repository);

    await useCase.execute(3, 10);

    expect(findAll).toHaveBeenCalledWith(20, 10);
  });
});
