import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReport(): string {
    return this.reportService.generateReport();
  }
  
}