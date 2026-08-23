import { Repository } from 'typeorm';
import { Case } from '../../domain/entities/case.entity';
import { Coordinate } from '../../domain/value-objects/coordinate.vo';
import { CaseSchema } from '../schemas/case.schema';
import { PostgresCaseRepository } from './postgres.case.repository';

describe('PostgresCaseRepository', () => {
  const createdAt = new Date('2026-01-01T00:00:00Z');

  const makeSchema = (id: string): CaseSchema => {
    const schema = new CaseSchema();
    schema.id = id;
    schema.title = `Title ${id}`;
    schema.description = 'Description';
    schema.latitude = 6.2442;
    schema.longitude = -75.5812;
    schema.createdAt = createdAt;
    return schema;
  };

  const buildRepository = () => {
    const persisted: CaseSchema[] = [];
    const orm = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn((schema: CaseSchema): Promise<CaseSchema> => {
        persisted.push(schema);
        return Promise.resolve(schema);
      }),
    };
    const repository = new PostgresCaseRepository(
      orm as unknown as Repository<CaseSchema>,
    );
    return { repository, orm, persisted };
  };

  it('lists cases mapped to domain entities', async () => {
    const { repository, orm } = buildRepository();
    orm.find.mockResolvedValue([makeSchema('case-1'), makeSchema('case-2')]);

    const result = await repository.findAll();

    expect(orm.find).toHaveBeenCalledWith({ skip: 0, take: undefined });
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Case);
    expect(result[0].id).toBe('case-1');
    expect(result[0].location).toBeInstanceOf(Coordinate);
    expect(result[0].location.latitude).toBe(6.2442);
  });

  it('passes pagination params through', async () => {
    const { repository, orm } = buildRepository();
    orm.find.mockResolvedValue([]);

    await repository.findAll(20, 10);

    expect(orm.find).toHaveBeenCalledWith({ skip: 20, take: 10 });
  });

  it('returns the case found by id', async () => {
    const { repository, orm } = buildRepository();
    orm.findOneBy.mockResolvedValue(makeSchema('case-1'));

    const result = await repository.findById('case-1');

    expect(orm.findOneBy).toHaveBeenCalledWith({ id: 'case-1' });
    expect(result).toBeInstanceOf(Case);
    expect(result?.title).toBe('Title case-1');
    expect(result?.createdAt).toBe(createdAt);
  });

  it('returns null when the id does not exist', async () => {
    const { repository } = buildRepository();

    const result = await repository.findById('missing-id');

    expect(result).toBeNull();
  });

  it('persists a domain entity mapped to its schema', async () => {
    const { repository, persisted } = buildRepository();
    const entity = new Case(
      'case-1',
      'Flood report',
      'Blocked street',
      Coordinate.create(6.2442, -75.5812),
      createdAt,
    );

    await repository.save(entity);

    expect(persisted).toHaveLength(1);
    const schema = persisted[0];
    expect(schema).toBeInstanceOf(CaseSchema);
    expect(schema).toMatchObject({
      id: 'case-1',
      title: 'Flood report',
      description: 'Blocked street',
      latitude: 6.2442,
      longitude: -75.5812,
      createdAt,
    });
  });
});
