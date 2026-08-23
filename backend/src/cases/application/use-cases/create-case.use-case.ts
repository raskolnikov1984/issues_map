import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Case } from '../../domain/entities/case.entity';
import { CASE_REPOSITORY } from '../../domain/ports/case.repository.port';
import type { ICaseRepository } from '../../domain/ports/case.repository.port';
import { Coordinate } from '../../domain/value-objects/coordinate.vo';

@Injectable()
export class CreateCaseUseCase {
  constructor(
    @Inject(CASE_REPOSITORY) private readonly caseRepository: ICaseRepository,
  ) {}

  async execute(
    title: string,
    description: string,
    latitude: number,
    longitude: number,
  ): Promise<Case> {
    let location: Coordinate;
    try {
      location = Coordinate.create(latitude, longitude);
    } catch (error) {
      if (error instanceof RangeError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }

    const entity = new Case(
      crypto.randomUUID(),
      title,
      description,
      location,
      new Date(),
    );
    await this.caseRepository.save(entity);
    return entity;
  }
}
