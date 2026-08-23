import { Case } from '../../domain/entities/case.entity';
import { Coordinate } from '../../domain/value-objects/coordinate.vo';
import { InMemoryCaseRepository } from './in-memory.case.repository';

describe('InMemoryCaseRepository', () => {
  const makeCase = (id: string) =>
    new Case(
      id,
      `Title ${id}`,
      'Description',
      Coordinate.create(6.2442, -75.5812),
      new Date('2026-01-01T00:00:00Z'),
    );

  it('persists a case retrievable by id', async () => {
    const repository = new InMemoryCaseRepository();
    const entity = makeCase('case-1');

    await repository.save(entity);

    expect(await repository.findById('case-1')).toBe(entity);
    expect(await repository.findById('missing-id')).toBeNull();
  });

  it('lists saved cases with pagination', async () => {
    const repository = new InMemoryCaseRepository();
    await repository.save(makeCase('case-1'));
    await repository.save(makeCase('case-2'));
    await repository.save(makeCase('case-3'));

    expect(await repository.findAll()).toHaveLength(3);
    expect(await repository.findAll(0, 2)).toHaveLength(2);
    expect(await repository.findAll(4, 2)).toHaveLength(0);
  });
});
