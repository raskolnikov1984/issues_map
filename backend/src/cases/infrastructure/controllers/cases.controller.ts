import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { GetCaseDetailsUseCase } from '../../application/use-cases/get-case-details.use-case';
import { GetCasesUseCase } from '../../application/use-cases/get-cases.use-case';
import { CaseResponseDto } from '../dtos/case-response.dto';
import { QueryParamsDto } from '../dtos/query-params.dto';

@Controller('cases')
export class CasesController {
  constructor(
    private readonly getCasesUseCase: GetCasesUseCase,
    private readonly getCaseDetailsUseCase: GetCaseDetailsUseCase,
  ) {}

  @Get()
  async getCases(@Query() query: QueryParamsDto): Promise<CaseResponseDto[]> {
    const cases = await this.getCasesUseCase.execute(query.page, query.limit);
    return cases.map((item) => CaseResponseDto.from(item));
  }

  @Get(':id')
  async getCaseDetails(@Param('id') id: string): Promise<CaseResponseDto> {
    const found = await this.getCaseDetailsUseCase.execute(id);
    if (!found) throw new NotFoundException(`Case ${id} not found`);
    return CaseResponseDto.from(found);
  }
}
