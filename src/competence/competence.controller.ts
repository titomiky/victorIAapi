import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Get,
  Delete,
  Param,
} from '@nestjs/common';

import { CompetenceService } from './competence.service';
import { CompetenceDto } from './dtos/competence.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CompetenceResponseDto } from './dtos/competence.response.dto';

@Controller('competencies')
@ApiTags('competencies')
export class CompetenceController {
  constructor(private competenceService: CompetenceService) {}

  @Post()  
  @ApiResponse({ status: 201, description: 'Created competence ok', type: CompetenceResponseDto })
  async create(@Body(new ValidationPipe()) createcompetence: CompetenceDto) {
    return this.competenceService.create(createcompetence);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updated competence ok', type: CompetenceResponseDto })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatecompetence: CompetenceDto,
  ) {
    return this.competenceService.update(id, updatecompetence);
  }

  @Get('list')
  @ApiResponse({ status: 200, description: 'Returned competences ok', type: CompetenceResponseDto })
  async findAll() {
    return this.competenceService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returned competence ok', type: CompetenceResponseDto })
  async findOne(@Param('id') id: string) {
    return this.competenceService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deleted competence ok', type: CompetenceResponseDto })
  async delete(@Param('id') id: string) {
    console.log(id);
    return this.competenceService.delete(id);
  }
}
