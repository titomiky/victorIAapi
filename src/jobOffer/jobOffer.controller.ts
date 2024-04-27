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

import { JobOfferService } from './jobOffer.service';
import { JobOfferDto } from './dtos/jobOffer.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JobOfferResponseDto } from './dtos/jobOffer.response.dto';

@Controller('JobOffers')
@ApiTags('JobOffers')
export class JobOfferController {
  constructor(private jobOfferService: JobOfferService) {}

  @Post()  
  @ApiResponse({ status: 201, description: 'Created jobOffer ok', type: JobOfferResponseDto })
  async create(@Body(new ValidationPipe()) createjobOffer: JobOfferDto) {
    return this.jobOfferService.create(createjobOffer);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updated jobOffer ok', type: JobOfferResponseDto })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatejobOffer: JobOfferDto,
  ) {
    return this.jobOfferService.update(id, updatejobOffer);
  }

  @Get('list')
  @ApiResponse({ status: 200, description: 'Returned jobOffers ok', type: JobOfferResponseDto })
  async findAll() {
    return this.jobOfferService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returned jobOffer ok', type: JobOfferResponseDto })
  async findOne(@Param('id') id: string) {
    return this.jobOfferService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deleted jobOffer ok', type: JobOfferResponseDto })
  async delete(@Param('id') id: string) {
    console.log(id);
    return this.jobOfferService.delete(id);
  }
}
