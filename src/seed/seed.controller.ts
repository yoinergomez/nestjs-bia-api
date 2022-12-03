import { Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Seed created',
  })
  async create() {
    await this.seedService.create();
    return { description: 'Seed created' };
  }

  @Get()
  findAll() {
    return this.seedService.findAll();
  }
}
