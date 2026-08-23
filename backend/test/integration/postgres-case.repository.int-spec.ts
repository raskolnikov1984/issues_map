import { DataSource } from 'typeorm';
import { Case } from '../../src/cases/domain/entities/case.entity';
import { Coordinate } from '../../src/cases/domain/value-objects/coordinate.vo';
import { PostgresCaseRepository } from '../../src/cases/infrastructure/adapters/postgres.case.repository';
import { CaseSchema } from '../../src/cases/infrastructure/schemas/case.schema';
import { databaseOptions } from '../../src/database/database.options';
import { CreateCasesTable20260822000000 } from '../../src/database/migrations/20260822000000-create-cases-table.migration';

const runDbTests = process.env.RUN_DB_TESTS === 'true';

(runDbTests ? describe : describe.skip)(
  'PostgresCaseRepository (integration)',
  () => {
    let dataSource: DataSource;
    let repository: PostgresCaseRepository;

    const makeEntity = (title = 'Flood report') =>
      new Case(
        crypto.randomUUID(),
        title,
        'Description',
        Coordinate.create(6.2442, -75.5812),
        new Date('2026-01-01T00:00:00Z'),
      );

    beforeAll(async () => {
      dataSource = new DataSource({
        ...databaseOptions(),
        entities: [CaseSchema],
        migrations: [CreateCasesTable20260822000000],
        migrationsRun: true,
      });
      await dataSource.initialize();
      repository = new PostgresCaseRepository(
        dataSource.getRepository(CaseSchema),
      );
    });

    beforeEach(async () => {
      await dataSource.query('TRUNCATE TABLE cases');
    });

    afterAll(async () => {
      await dataSource.destroy();
    });

    it('persists and retrieves a case round trip', async () => {
      const entity = makeEntity();

      await repository.save(entity);

      const found = await repository.findById(entity.id);

      expect(found).toBeInstanceOf(Case);
      expect(found?.location).toBeInstanceOf(Coordinate);
      expect(found).toMatchObject({
        id: entity.id,
        title: 'Flood report',
        description: 'Description',
        location: { latitude: 6.2442, longitude: -75.5812 },
      });
      expect(found?.createdAt.toISOString()).toBe('2026-01-01T00:00:00.000Z');
    });

    it('returns null when the id does not exist', async () => {
      await repository.save(makeEntity());

      const found = await repository.findById(crypto.randomUUID());

      expect(found).toBeNull();
    });

    it('lists saved cases with pagination', async () => {
      await repository.save(makeEntity());
      await repository.save(makeEntity());
      await repository.save(makeEntity());

      expect(await repository.findAll()).toHaveLength(3);
      expect(await repository.findAll(0, 2)).toHaveLength(2);
      expect(await repository.findAll(2, 2)).toHaveLength(1);
    });
  },
);
