import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCaseUseCase } from '../../application/use-cases/create-case.use-case';
import { GetCaseDetailsUseCase } from '../../application/use-cases/get-case-details.use-case';
import { GetCasesUseCase } from '../../application/use-cases/get-cases.use-case';
import { Case } from '../../domain/entities/case.entity';
import { Coordinate } from '../../domain/value-objects/coordinate.vo';
import { CasesController } from './cases.controller';

describe('CasesController', () => {
  const caseEntity = new Case(
    'case-1',
    'Title',
    'Description',
    Coordinate.create(6.2442, -75.5812),
    new Date('2026-01-01T00:00:00Z'),
  );

  const buildController = () => {
    const getCasesUseCase = { execute: jest.fn().mockResolvedValue([]) };
    const getCaseDetailsUseCase = {
      execute: jest.fn().mockResolvedValue(null),
    };
    const createCaseUseCase = {
      execute: jest.fn().mockResolvedValue(caseEntity),
    };
    const controller = new CasesController(
      getCasesUseCase as unknown as GetCasesUseCase,
      getCaseDetailsUseCase as unknown as GetCaseDetailsUseCase,
      createCaseUseCase as unknown as CreateCaseUseCase,
    );
    return {
      controller,
      getCasesUseCase,
      getCaseDetailsUseCase,
      createCaseUseCase,
    };
  };

  describe('GET /cases', () => {
    it('lists cases mapped to response dtos', async () => {
      const { controller, getCasesUseCase } = buildController();
      getCasesUseCase.execute.mockResolvedValue([caseEntity]);

      const result = await controller.getCases({ page: 1, limit: 10 });

      expect(getCasesUseCase.execute).toHaveBeenCalledWith(1, 10);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'case-1',
        title: 'Title',
        description: 'Description',
        latitude: 6.2442,
        longitude: -75.5812,
      });
    });

    it('defaults to undefined pagination params', async () => {
      const { controller, getCasesUseCase } = buildController();

      await controller.getCases({});

      expect(getCasesUseCase.execute).toHaveBeenCalledWith(
        undefined,
        undefined,
      );
    });
  });

  describe('GET /cases/:id', () => {
    it('returns the requested case as a dto', async () => {
      const { controller, getCaseDetailsUseCase } = buildController();
      getCaseDetailsUseCase.execute.mockResolvedValue(caseEntity);

      const result = await controller.getCaseDetails('case-1');

      expect(getCaseDetailsUseCase.execute).toHaveBeenCalledWith('case-1');
      expect(result).toMatchObject({
        id: 'case-1',
        latitude: 6.2442,
        longitude: -75.5812,
      });
    });

    it('throws NotFoundException when the case does not exist', async () => {
      const { controller } = buildController();

      await expect(controller.getCaseDetails('missing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('POST /cases', () => {
    it('creates a case and returns it as a dto', async () => {
      const { controller, createCaseUseCase } = buildController();
      const dto = {
        title: 'Flood report',
        description: 'Blocked street',
        latitude: 6.2442,
        longitude: -75.5812,
      };

      const result = await controller.create(dto);

      expect(createCaseUseCase.execute).toHaveBeenCalledWith(
        'Flood report',
        'Blocked street',
        6.2442,
        -75.5812,
      );
      expect(result).toMatchObject({
        id: caseEntity.id,
        title: 'Title',
        latitude: 6.2442,
        longitude: -75.5812,
      });
    });

    it('propagates BadRequestException for invalid coordinates', async () => {
      const { controller, createCaseUseCase } = buildController();
      createCaseUseCase.execute.mockRejectedValue(
        new BadRequestException('Invalid latitude: 91'),
      );

      await expect(
        controller.create({
          title: 'Title',
          description: 'Description',
          latitude: 91,
          longitude: 0,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
