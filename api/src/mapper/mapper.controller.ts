import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { AccountItemsDto } from './dto/create-mapper.dto';

@Controller('mapper')
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}

  @Post('upload')
  create(@Body() accounts: AccountItemsDto) {
    this.mapperService.create(accounts);
    return 'Accounts received';
  }

  @Get()
  findAll() {
    return this.mapperService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapperService.delete(id);
  }
}
