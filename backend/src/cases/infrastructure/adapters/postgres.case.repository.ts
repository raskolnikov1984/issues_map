import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Case } from '../../domain/entities/case.entity';
import { ICaseRepository } from '../../domain/ports/case.repository.port';
import { Coordinate } from '../../domain/value-objects/coordinate.vo';
import { CaseSchema } from '../schemas/case.schema';

export class PostgresCaseRepository implements ICaseRepository {
  constructor(
    @InjectRepository(CaseSchema)
    private readonly repository: Repository<CaseSchema>,
  ) {}

  async findAll(skip = 0, take?: number): Promise<Case[]> {
    const schemas = await this.repository.find({ skip, take });
    return schemas.map((schema) => PostgresCaseRepository.toDomain(schema));
  }

  async findById(id: string): Promise<Case | null> {
    const schema = await this.repository.findOneBy({ id });
    return schema ? PostgresCaseRepository.toDomain(schema) : null;
  }

  async save(entity: Case): Promise<void> {
    await this.repository.save(PostgresCaseRepository.toPersistence(entity));
  }

  private static toDomain(schema: CaseSchema): Case {
    return new Case(
      schema.id,
      schema.title,
      schema.description,
      Coordinate.create(schema.latitude, schema.longitude),
      schema.createdAt,
    );
  }

  private static toPersistence(entity: Case): CaseSchema {
    const schema = new CaseSchema();
    schema.id = entity.id;
    schema.title = entity.title;
    schema.description = entity.description;
    schema.latitude = entity.location.latitude;
    schema.longitude = entity.location.longitude;
    schema.createdAt = entity.createdAt;
    return schema;
  }
}
