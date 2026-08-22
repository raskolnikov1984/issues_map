import { Case } from '../../domain/entities/case.entity';

export class CaseResponseDto {
  id!: string;
  title!: string;
  description!: string;
  latitude!: number;
  longitude!: number;
  createdAt!: Date;

  static from(caseEntity: Case): CaseResponseDto {
    const dto = new CaseResponseDto();
    dto.id = caseEntity.id;
    dto.title = caseEntity.title;
    dto.description = caseEntity.description;
    dto.latitude = caseEntity.location.latitude;
    dto.longitude = caseEntity.location.longitude;
    dto.createdAt = caseEntity.createdAt;
    return dto;
  }
}
