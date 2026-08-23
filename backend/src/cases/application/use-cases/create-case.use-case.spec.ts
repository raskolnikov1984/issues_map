import { BadRequestException } from '@nestjs/common';
import { ICaseRepository } from '../../domain/ports/case.repository.port';
import { CreateCaseUseCase } from './create-case.use-case';

describe('CreateCaseUseCase', () => {
  const buildUseCase = () => {
    const save = jest.fn().mockResolvedValue(undefined);
    const repository: ICaseRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findById: jest.fn().mockResolvedValue(null),
      save,
    };
    return { useCase: new CreateCaseUseCase(repository), save };
  };

  it('creates a case with a generated id and saves it', async () => {
    const { useCase, save } = buildUseCase();

    const result = await useCase.execute(
      'Flood report',
      'Blocked street',
      6.2442,
      -75.5812,
    );

    expect(result.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
    expect(result.title).toBe('Flood report');
    expect(result.description).toBe('Blocked street');
    expect(result.location.latitude).toBe(6.2442);
    expect(result.location.longitude).toBe(-75.5812);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(save).toHaveBeenCalledWith(result);
  });

  it('rejects an invalid latitude with BadRequestException', async () => {
    const { useCase } = buildUseCase();

    await expect(
      useCase.execute('Title', 'Description', 91, 0),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects an invalid longitude with BadRequestException', async () => {
    const { useCase } = buildUseCase();

    await expect(
      useCase.execute('Title', 'Description', 0, -181),
    ).rejects.toThrow(BadRequestException);
  });
});
