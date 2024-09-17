import { Module } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { MapperController } from './mapper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapperEntity } from './entities/mapper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MapperEntity])],
  controllers: [MapperController],
  providers: [MapperService],
})
export class MapperModule {}
